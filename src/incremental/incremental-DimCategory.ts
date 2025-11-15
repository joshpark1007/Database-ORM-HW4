import { Repository, MoreThan } from "typeorm"
import { sakilaDataSource, analyticsDataSource } from "../data-sources";
import { Category } from "../sakila/entities/Category"
import { DimCategory } from "../analytics/entities/DimCategory"
import {
    extractLastSyncedAt, changeLastSyncedAt, incrementalWhere
} from "../analytics/SyncStateHelper"

// incremental for Store, Actor, Film, Category, and Customer

export async function incrementalDimCategory() {

    const catRepo = sakilaDataSource.getRepository(Category);
    const dimCatRepo = analyticsDataSource.getRepository(DimCategory);

    // Building WHERE clause using IncrementalWhere
    const { where, lastSyncedAt } = await incrementalWhere(
        "dim_category",
        "lastUpdate"
    );

    // Query for ONLY the changed category in sakila repo
    const changed_cat = await catRepo.find({ where });

    if (changed_cat.length === 0) {
        console.log('DimCategory: no changes found since last sync.');
        return;
    }

    for (const cc of changed_cat) {
        let dim = await dimCatRepo.findOne({
            where: { categoryID: cc.id },
        });

        if (!dim) {
            // it is a new film
            dim = dimCatRepo.create({ categoryID: cc.id });
        }

        // some familiar sakila data linking/mapping
        dim.name = cc.name
        dim.lastUpdate = cc.lastUpdate;
        await dimCatRepo.save(dim);
    }

    let maxLastUpdate = changed_cat[0].lastUpdate;
    for (const cc of changed_cat) {
        if (cc.lastUpdate > maxLastUpdate) {
            maxLastUpdate = cc.lastUpdate;
        }
    }
    await changeLastSyncedAt("dim_category", maxLastUpdate);


    console.log(
        `DimCategory: processed ${changed_cat.length} rows (previously synced at: ${lastSyncedAt ?? "none"
        })`
    );
}
