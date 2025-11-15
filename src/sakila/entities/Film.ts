import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";

import { Language } from "./Language";
import { FilmActor } from "./FilmActor";
import { Inventory } from "./Inventory";

@Entity({ name: "film" })
export class Film {
    @PrimaryGeneratedColumn({ name: "film_id" })
    filmId: number;

    @Column()
    title: string;

    @Column({ nullable: true, type: "text" })
    description: string | null;

    @Column({ name: "release_year", type: "year", nullable: true })
    releaseYear: number | null;

    @ManyToOne(() => Language, (language) => language.films)
    @JoinColumn({ name: "language_id" })
    language: Language;

    @Column({ nullable: true })
    rating: string;

    @Column({ nullable: true })
    length: number;

    @OneToMany(() => FilmActor, (filmActor) => filmActor.film)
    filmActors: FilmActor[];

    @OneToMany(() => Inventory, (inventory) => inventory.film)
    inventories: Inventory[];

    @Column({ name: "last_update", type: "datetime" })
    lastUpdate: Date;
}
