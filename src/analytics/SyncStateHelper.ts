import { analyticsDataSource } from ".././data-sources"
import { SyncState } from "./entities/SyncState"
import { Repository, MoreThan } from "typeorm"

// Creating table object, centralizing so I don't repeat
function repo(): Repository<SyncState> {
    return analyticsDataSource.getRepository(SyncState);
}

// Find when it was last synced at (read the progress from SyncState)
export async function extractLastSyncedAt(
    tableName: string
): Promise<Date | null> {
    const re = repo();
    const state = await re.findOne({ where: { tableName } });
    return state?.lastSyncedAt ?? null;
}

// Change (update) new last_synced timestamp for table
export async function changeLastSyncedAt(
    tableName: string,
    timestamp: Date
): Promise<void> {
    const re = repo();
    let state = await re.findOne({ where: { tableName } });
    if (!state) {
        state = re.create({ tableName, lastSyncedAt: timestamp });
    } else {
        state.lastSyncedAt = timestamp;
    }

    await re.save(state);
}

// Operator (incremental WHERE clause) Query to things added since that time
export async function incrementalWhere(
    tableName: string,
    updatedColumn: string
): Promise<{ where: any; lastSyncedAt: Date | null }> {
    const lastSyncedAt = await extractLastSyncedAt(tableName);

    if (!lastSyncedAt) {
        // no previous sync
        return { where: {}, lastSyncedAt: null };
    }

    const where = {
        [updatedColumn]: MoreThan(lastSyncedAt),
    };

    return { where, lastSyncedAt };

}