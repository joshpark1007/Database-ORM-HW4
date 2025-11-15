import { sakilaDataSource, analyticsDataSource } from ".././data-sources";
import { SyncState } from ".././analytics/entities/SyncState";

export async function initAnalyticsDb() {
    await analyticsDataSource.initialize();

    const tables = ["film"];

    const repo = analyticsDataSource.getRepository(SyncState);

    for (const table of tables) {
        const exists = await repo.findOneBy({ tableName: table });
        if (!exists) {
            const row = repo.create({ tableName: table, lastSyncedAt: null });
            await repo.save(row);
        }
    }

    await analyticsDataSource.destroy();
}
