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

import { Customer } from "././Customer";
import { Staff } from "././Staff";
import { Rental } from "././Rental";

@Entity({ name: "payment" })
export class Payment {
    @PrimaryColumn({ name: "payment_id", type: "smallint", unsigned: true })
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.payments)
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @ManyToOne(() => Staff, (staff) => staff.payments)
    @JoinColumn({ name: "staff_id" })
    staff: Staff;

    @ManyToOne(() => Rental, (rental) => rental.payments)
    @JoinColumn({ name: "rental_id" })
    rental: Rental;

    @Column({ name: "amount", type: "decimal", precision: 5, scale: 2 })
    amount: number;

    @Column({ name: "payment_date", type: "datetime" })
    paymentDate: Date;

    @Column({ name: "last_update", type: "timestamp", nullable: true })
    lastUpdate: Date | null;
}