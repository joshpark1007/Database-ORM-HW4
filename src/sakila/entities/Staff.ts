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

import { Address } from "././Address";
import { Store } from "././Store";
import { Rental } from "././Rental";
import { Payment } from "././Payment";

@Entity({ name: "staff" })
export class Staff {
    @PrimaryColumn({ name: "staff_id", type: "tinyint", unsigned: true })
    id: number;

    @Column({ name: "first_name", type: "varchar", length: 45 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 45 })
    lastName: string;

    @ManyToOne(() => Address, (address) => address.staff)
    @JoinColumn({ name: "address_id" })
    address: Address;

    @Column({ name: "email", type: "varchar", length: 50, nullable: true })
    email: string | null;

    @ManyToOne(() => Store, (store) => store.staff)
    @JoinColumn({ name: "store_id" })
    store: Store;

    @Column({ name: "active", type: "tinyint", width: 1 })
    active: boolean;

    @Column({ name: "username", type: "varchar", length: 16 })
    username: string;

    @Column({ name: "password", type: "varchar", length: 40, nullable: true })
    password: string | null;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToOne(() => Store, (store) => store.manager)
    managedStore: Store;

    @OneToMany(() => Rental, (rental) => rental.staff)
    rentals: Rental[];

    @OneToMany(() => Payment, (payment) => payment.staff)
    payments: Payment[];
}