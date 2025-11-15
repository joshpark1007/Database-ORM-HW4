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
import { City } from "././City"

@Entity({ name: "country" })
export class Country {
    @PrimaryColumn({ name: "country_id", type: "smallint", unsigned: true })
    id: number;

    @Column({ name: "country", type: "varchar", length: 50 })
    name: string;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => City, (city) => city.country)
    cities: City[];
}
