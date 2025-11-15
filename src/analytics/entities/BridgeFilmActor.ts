import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "bridge_film_actor" })
export class BridgeFilmActor {
    @PrimaryGeneratedColumn({ name: "bridge_FA_key" })
    bridgeFAKey!: number;

    @Column({ name: "film_key" })
    filmKey!: number;      // FK to dim_film.film_key

    @Column({ name: "actor_key" })
    actorKey!: number;     // FK to dim_actor.actor_key
}
