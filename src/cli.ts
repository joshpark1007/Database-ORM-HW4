import "reflect-metadata";
import { initAnalyticsDb } from "./commands/init";
import { fullLoad } from "./commands/fullLoad";

async function main() {
    const cmd = process.argv[2];

    try {
        if (cmd === "init") {
            await initAnalyticsDb();
            console.log("Init completed.");
        } else if (cmd === "full-load") {
            await fullLoad();
            console.log("Full load completed.");
        } else {
            console.log("Usage: ts-node src/cli.ts [init|full-load]");
        }
    } catch (err) {
        console.error("Command failed:", err);
    }
}

main();