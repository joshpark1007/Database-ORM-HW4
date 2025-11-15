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
import { Actor } from "././Actor";

@Entity({ name: "film_actor" })
export class FilmActor {
    @PrimaryColumn({ name: "actor_id", type: "smallint", unsigned: true })
    actorId: number;

    @PrimaryColumn({ name: "film_id", type: "smallint", unsigned: true })
    filmId: number;

    @ManyToOne(() => Actor, (actor) => actor.filmActors)
    @JoinColumn({ name: "actor_id" })
    actor: Actor;

    @ManyToOne(() => Film, (film) => film.filmActors)
    @JoinColumn({ name: "film_id" })
    film: Film;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;
}
