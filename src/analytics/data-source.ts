import "reflect-metadata";
import { DataSource } from "typeorm";
import { DimDate } from "./entities/DimDate";
import { DimFilm } from "./entities/DimFilm";
import { DimActor } from "./entities/DimActor";
import { DimCategory } from "./entities/DimCategory";
import { DimStore } from "./entities/DimStore";
import { DimCustomer } from "./entities/DimCustomer";
import { BridgeFilmActor } from "./entities/BridgeFilmActor";
import { BridgeFilmCategory } from "./entities/BridgeFilmCategory";
import { FactRental } from "./entities/FactRental";
import { FactPayment } from "./entities/FactPayment";
import { SyncState } from "./entities/SyncState";

export const analyticsDataSource = new DataSource({
    type: "sqlite",
    database: "analytics.sqlite",
    synchronize: true,
    entities: [DimDate, DimFilm, DimActor, DimCategory, DimStore,
        DimCustomer, BridgeFilmActor, BridgeFilmCategory,
        FactRental, FactPayment, SyncState],
});
