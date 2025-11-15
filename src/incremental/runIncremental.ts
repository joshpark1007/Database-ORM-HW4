import { sakilaDataSource, analyticsDataSource } from "../data-sources";

import { incrementalDimStore } from "./incremental-DimStore";
import { incrementalDimActor } from "./incremental-DimActor";
import { incrementalDimFilm } from "./incremental-DimFilm";
import { incrementalDimCategory } from "./incremental-DimCategory";
import { incrementalDimCustomer } from "./incremental-DimCustomer";

async function runIncremental() {
    try {
        console.log("Initializing Datasources");
        await sakilaDataSource.initialize();
        await analyticsDataSource.initialize();

        console.log("\n🔄 Running Incremental Updates...\n");

        await incrementalDimStore();
        await incrementalDimActor();
        await incrementalDimFilm();
        await incrementalDimCategory();
        await incrementalDimCustomer();

        console.log("\n✨ Incremental sync completed.\n");
        process.exit(0);
    } catch (err) {
        console.error("\n❌ Error during incremental sync:", err);
        process.exit(1);
    }
}

runIncremental();
