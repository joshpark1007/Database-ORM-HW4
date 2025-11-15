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

import { City } from "././City"
import { Customer } from "././Customer";
import { Staff } from "././Staff";
import { Store } from "././Store";

@Entity({ name: "address" })
export class Address {
    @PrimaryColumn({ name: "address_id", type: "smallint", unsigned: true })
    id: number;

    @Column({ name: "address", type: "varchar", length: 50 })
    address: string;

    @Column({ name: "address2", type: "varchar", length: 50, nullable: true })
    address2: string | null;

    @Column({ name: "district", type: "varchar", length: 20 })
    district: string;

    @ManyToOne(() => City, (city) => city.addresses)
    @JoinColumn({ name: "city_id" })
    city: City;

    @Column({ name: "postal_code", type: "varchar", length: 10, nullable: true })
    postalCode: string | null;

    @Column({ name: "phone", type: "varchar", length: 20 })
    phone: string;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Customer, (customer) => customer.address)
    customers: Customer[];

    @OneToMany(() => Staff, (staff) => staff.address)
    staff: Staff[];

    @OneToMany(() => Store, (store) => store.address)
    stores: Store[];
}