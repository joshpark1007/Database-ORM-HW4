import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "bridge_film_category" })
export class BridgeFilmCategory {
    @PrimaryGeneratedColumn({ name: "bridge_FC_key" })
    bridgeFCKey!: number;

    @Column({ name: "film_key" })
    filmKey!: number;      // FK to dim_film.film_key

    @Column({ name: "category_key" })
    categoryKey!: number;     // FK to dim_category.category_key
}
