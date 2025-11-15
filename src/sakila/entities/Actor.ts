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
import { FilmActor } from "././FilmActor";

@Entity({ name: "actor" })
export class Actor {
    @PrimaryColumn({ name: "actor_id", type: "smallint", unsigned: true })
    id: number;

    @Column({ name: "first_name", type: "varchar", length: 45 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 45 })
    lastName: string;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => FilmActor, (filmActor) => filmActor.actor)
    filmActors: FilmActor[];
}