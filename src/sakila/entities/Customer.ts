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

import { Store } from "././Store";
import { Address } from "././Address";
import { Rental } from "././Rental";
import { Payment } from "././Payment";

@Entity({ name: "customer" })
export class Customer {
    @PrimaryColumn({ name: "customer_id", type: "smallint", unsigned: true })
    id: number;

    @ManyToOne(() => Store, (store) => store.customers)
    @JoinColumn({ name: "store_id" })
    store: Store;

    @Column({ name: "first_name", type: "varchar", length: 45 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 45 })
    lastName: string;

    @Column({ name: "email", type: "varchar", length: 50, nullable: true })
    email: string | null;

    @ManyToOne(() => Address, (address) => address.customers)
    @JoinColumn({ name: "address_id" })
    address: Address;

    @Column({ name: "active", type: "tinyint", width: 1 })
    active: boolean;

    @Column({ name: "create_date", type: "datetime" })
    createDate: Date;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Rental, (rental) => rental.customer)
    rentals: Rental[];

    @OneToMany(() => Payment, (payment) => payment.customer)
    payments: Payment[];
}