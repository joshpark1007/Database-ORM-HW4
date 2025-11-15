import { Repository, MoreThan } from "typeorm"
import { sakilaDataSource, analyticsDataSource } from "../data-sources";
import { Store } from "../sakila/entities/Store"
import { DimStore } from "../analytics/entities/DimStore"
import {
    extractLastSyncedAt, changeLastSyncedAt, incrementalWhere
} from "../analytics/SyncStateHelper"

// incremental for Store, Actor, Film, Category, and Customer

export async function incrementalDimStore() {

    const storeRepo = sakilaDataSource.getRepository(Store);
    const dimStoreRepo = analyticsDataSource.getRepository(DimStore);

    // Building WHERE clause using IncrementalWhere
    const { where, lastSyncedAt } = await incrementalWhere(
        "dim_store",
        "lastUpdate"
    );

    // Query for ONLY the changed stores in sakila repo
    const changed_stores = await storeRepo.find({
        where,
        relations: {
            address: {
                city: {
                    country: true,
                }
            }
        }
    });

    if (changed_stores.length === 0) {
        console.log('DimStore: no changes found since last sync.');
        return;
    }

    for (const cs of changed_stores) {
        let dim = await dimStoreRepo.findOne({
            where: { storeID: cs.id },
        });

        if (!dim) {
            // it is a new store
            dim = dimStoreRepo.create({ storeID: cs.id });
        }

        // some familiar sakila data linking/mapping
        dim.city = cs.address.city.name;
        dim.country = cs.address.city.country.name;
        dim.lastUpdate = cs.lastUpdate;
        await dimStoreRepo.save(dim);
    }

    let maxLastUpdate = changed_stores[0].lastUpdate;
    for (const cs of changed_stores) {
        if (cs.lastUpdate > maxLastUpdate) {
            maxLastUpdate = cs.lastUpdate;
        }
    }
    await changeLastSyncedAt("dim_store", maxLastUpdate);


    console.log(
        `DimStore: processed ${changed_stores.length} rows (previously synced at: ${lastSyncedAt ?? "none"
        })`
    );
}