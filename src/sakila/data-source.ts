import "reflect-metadata";
import { DataSource } from "typeorm";
import { Actor } from "./entities/Actor";
import { Address } from "./entities/Address";
import { Category } from "./entities/Category";
import { City } from "./entities/City";
import { Country } from "./entities/Country";
import { Customer } from "./entities/Customer";
import { Film } from "./entities/Film";
import { FilmActor } from "./entities/FilmActor";
import { Inventory } from "./entities/Inventory";
import { Language } from "./entities/Language";
import { Payment } from "./entities/Payment";
import { Rental } from "./entities/Rental";
import { Staff } from "./entities/Staff";
import { Store } from "./entities/Store";

export const sakilaDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "PCHken016332@",
    database: "sakila",
    entities: [Actor, Address, Category, City, Country, Customer, Film,
        FilmActor, Inventory, Language, Payment, Rental, Staff, Store],
    synchronize: false,
});
