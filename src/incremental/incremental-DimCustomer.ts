import { Repository, MoreThan } from "typeorm"
import { sakilaDataSource, analyticsDataSource } from "../data-sources";
import { Customer } from "../sakila/entities/Customer"
import { DimCustomer } from "../analytics/entities/DimCustomer"
import {
    extractLastSyncedAt, changeLastSyncedAt, incrementalWhere
} from "../analytics/SyncStateHelper"

// incremental for Store, Actor, Film, Category, and Customer

export async function incrementalDimCustomer() {

    const custRepo = sakilaDataSource.getRepository(Customer);
    const dimCustRepo = analyticsDataSource.getRepository(DimCustomer);

    // Building WHERE clause using IncrementalWhere
    const { where, lastSyncedAt } = await incrementalWhere(
        "dim_customer",
        "lastUpdate"
    );

    // Query for ONLY the changed customer in sakila repo
    const changed_cust = await custRepo.find({
        where,
        relations: {
            address: {
                city: {
                    country: true,
                },
            },
        },
    });

    if (changed_cust.length === 0) {
        console.log('DimCustomer: no changes found since last sync.');
        return;
    }

    for (const cc of changed_cust) {
        let dim = await dimCustRepo.findOne({
            where: { customer_id: cc.id },
        });

        if (!dim) {
            // it is a new film
            dim = dimCustRepo.create({ customer_id: cc.id });
        }

        // some familiar sakila data linking/mapping
        dim.first_name = cc.firstName
        dim.last_name = cc.lastName
        dim.active = cc.active
        dim.city = cc.address.city.name
        dim.country = cc.address.city.country.name

        dim.lastUpdate = cc.lastUpdate;
        await dimCustRepo.save(dim);
    }

    let maxLastUpdate = changed_cust[0].lastUpdate;
    for (const cc of changed_cust) {
        if (cc.lastUpdate > maxLastUpdate) {
            maxLastUpdate = cc.lastUpdate;
        }
    }
    await changeLastSyncedAt("dim_customer", maxLastUpdate);


    console.log(
        `DimCustomer: processed ${changed_cust.length} rows (previously synced at: ${lastSyncedAt ?? "none"
        })`
    );
}
