import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "fact_payment" })
export class FactPayment {
    @PrimaryGeneratedColumn({ name: "fact_payment_key" })
    factPaymentKey!: number;

    @Column({ name: "payment_id" })
    paymentId!: number;       // natural key (from Sakila.payment)

    @Column({ name: "date_key_paid" })
    dateKeyPaid!: number;     // YYYYMMDD

    @Column({ name: "customer_key" })
    customerKey!: number;     // FK to dim_customer.customer_key

    @Column({ name: "store_key" })
    storeKey!: number;        // FK to dim_store.store_key

    @Column({ name: "staff_id" })
    staffId!: number;         // natural key (from Sakila.staff)

    @Column({ type: "real" })
    amount!: number;          // payment amount
}
