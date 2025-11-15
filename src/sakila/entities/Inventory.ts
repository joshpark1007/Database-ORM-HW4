import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    ManyToMany,
    JoinColumn,
    JoinTable,
} from "typeorm";

import { Film } from "././Film";
import { Store } from "././Store";
import { Rental } from "././Rental";

@Entity({ name: "inventory" })
export class Inventory {
    @PrimaryColumn({ name: "inventory_id", type: "mediumint", unsigned: true })
    id: number;

    @ManyToOne(() => Film, (film) => film.inventories)
    @JoinColumn({ name: "film_id" })
    film: Film;

    @ManyToOne(() => Store, (store) => store.inventories)
    @JoinColumn({ name: "store_id" })
    store: Store;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Rental, (rental) => rental.inventory)
    rentals: Rental[];
}