import { sakilaDataSource, analyticsDataSource } from "./data-sources";

// written with the help of Stackoverflow and LLM to see if initialiation worked
// https://chatgpt.com/share/6917d050-73bc-8008-b2e5-d7b5dfb913b0


async function main() {
    console.log("Initializing Sakila DataSource...");
    await sakilaDataSource.initialize();
    console.log("✅ Sakila connected");

    console.log("Initializing Analytics DataSource...");
    await analyticsDataSource.initialize();
    console.log("✅ Analytics connected");

    console.log({
        sakilaIsInitialized: sakilaDataSource.isInitialized,
        analyticsIsInitialized: analyticsDataSource.isInitialized,
    });
}

main()
    .then(() => {
        console.log("Sanity Check test finished, shutting down.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Sanity Check test failed:");
        console.error(err);
        process.exit(1);
    });
