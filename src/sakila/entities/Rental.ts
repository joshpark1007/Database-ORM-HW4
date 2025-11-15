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

import { Inventory } from "././Inventory";
import { Customer } from "././Customer";
import { Staff } from "././Staff";
import { Payment } from "././Payment";

@Entity({ name: "rental" })
export class Rental {
    @PrimaryColumn({ name: "rental_id", type: "int", unsigned: true })
    id: number;

    @Column({ name: "rental_date", type: "datetime" })
    rentalDate: Date;

    @ManyToOne(() => Inventory, (inventory) => inventory.rentals)
    @JoinColumn({ name: "inventory_id" })
    inventory: Inventory;

    @ManyToOne(() => Customer, (customer) => customer.rentals)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @Column({ name: "return_date", type: "datetime", nullable: true })
    returnDate: Date | null;

    @ManyToOne(() => Staff, (staff) => staff.rentals)
    @JoinColumn({ name: "staff_id" })
    staff: Staff;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Payment, (payment) => payment.rental)
    payments: Payment[];
}