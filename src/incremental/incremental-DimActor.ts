import { Repository, MoreThan } from "typeorm"
import { sakilaDataSource, analyticsDataSource } from "../data-sources";
import { Actor } from "../sakila/entities/Actor"
import { DimActor } from "../analytics/entities/DimActor"
import {
    extractLastSyncedAt, changeLastSyncedAt, incrementalWhere
} from "../analytics/SyncStateHelper"

// incremental for Store, Actor, Film, Category, and Customer

export async function incrementalDimActor() {

    const actorRepo = sakilaDataSource.getRepository(Actor);
    const dimActorRepo = analyticsDataSource.getRepository(DimActor);

    // Building WHERE clause using IncrementalWhere
    const { where, lastSyncedAt } = await incrementalWhere(
        "dim_actor",
        "lastUpdate"
    );

    // Query for ONLY the changed actors in sakila repo
    const changed_actors = await actorRepo.find({ where });

    if (changed_actors.length === 0) {
        console.log('DimActor: no changes found since last sync.');
        return;
    }

    for (const ca of changed_actors) {
        let dim = await dimActorRepo.findOne({
            where: { actor_id: ca.id },
        });

        if (!dim) {
            // it is a new actor
            dim = dimActorRepo.create({ actor_id: ca.id });
        }

        // some familiar sakila data linking/mapping
        dim.first_name = ca.firstName;
        dim.last_name = ca.lastName;
        dim.lastUpdate = ca.lastUpdate;
        await dimActorRepo.save(dim);
    }

    let maxLastUpdate = changed_actors[0].lastUpdate;
    for (const ca of changed_actors) {
        if (ca.lastUpdate > maxLastUpdate) {
            maxLastUpdate = ca.lastUpdate;
        }
    }
    await changeLastSyncedAt("dim_actor", maxLastUpdate);


    console.log(
        `DimActor: processed ${changed_actors.length} rows (previously synced at: ${lastSyncedAt ?? "none"
        })`
    );
}