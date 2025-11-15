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

import { Country } from "././Country"
import { Address } from "././Address"

@Entity({ name: "city" })
export class City {
    @PrimaryColumn({ name: "city_id", type: "smallint", unsigned: true })
    id: number;

    @Column({ name: "city", type: "varchar", length: 50 })
    name: string;

    @ManyToOne(() => Country, (country) => country.cities)
    @JoinColumn({ name: "country_id" })
    country: Country;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Address, (address) => address.city)
    addresses: Address[];
}