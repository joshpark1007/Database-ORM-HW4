import "reflect-metadata";
import { DataSource } from "typeorm";

// Now, FINALLY, we are putting everything together by linking Data Sources

// Sakila Database Entities
import { Actor } from "./sakila/entities/Actor";
import { Address } from "./sakila/entities/Address";
import { Category } from "./sakila/entities/Category";
import { City } from "./sakila/entities/City";
import { Country } from "./sakila/entities/Country";
import { Customer } from "./sakila/entities/Customer";
import { Film } from "./sakila/entities/Film";
import { FilmActor } from "./sakila/entities/FilmActor";
import { Inventory } from "./sakila/entities/Inventory";
import { Language } from "./sakila/entities/Language";
import { Payment } from "./sakila/entities/Payment";
import { Rental } from "./sakila/entities/Rental";
import { Staff } from "./sakila/entities/Staff";
import { Store } from "./sakila/entities/Store";

// Analytics Entities
import { DimDate } from "./analytics/entities/DimDate";
import { DimFilm } from "./analytics/entities/DimFilm";
import { DimActor } from "./analytics/entities/DimActor";
import { DimCategory } from "./analytics/entities/DimCategory";
import { DimStore } from "./analytics/entities/DimStore";
import { DimCustomer } from "./analytics/entities/DimCustomer";
import { BridgeFilmActor } from "./analytics/entities/BridgeFilmActor";
import { BridgeFilmCategory } from "./analytics/entities/BridgeFilmCategory";
import { FactRental } from "./analytics/entities/FactRental";
import { FactPayment } from "./analytics/entities/FactPayment";
import { SyncState } from "./analytics/entities/SyncState";

export const sakilaDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "PCHken016332@",
    database: "sakila",
    entities: [
        Actor,
        Address,
        Category,
        City,
        Country,
        Customer,
        Film,
        FilmActor,
        Inventory,
        Language,
        Payment,
        Rental,
        Staff,
        Store,
    ],
    synchronize: false,
    logging: false,
});

export const analyticsDataSource = new DataSource({
    type: "sqlite",
    database: "analytics.db",
    entities: [
        BridgeFilmActor,
        BridgeFilmCategory,
        DimActor,
        DimCategory,
        DimCustomer,
        DimDate,
        DimFilm,
        DimStore,
        FactPayment,
        FactRental,
        SyncState],
    synchronize: true,
    logging: false,
});
