import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "fact_rental" })
export class FactRental {
    @PrimaryGeneratedColumn({ name: "fact_rental_key" })
    factRentalKey!: number;   // surrogate key in analytics

    @Column({ name: "rental_id" })
    rentalId!: number;        // natural key (getting from Sakila.rental)

    @Column({ name: "date_key_rented" })
    dateKeyRented!: number;   // YYYYMMDD

    @Column({ name: "date_key_returned", nullable: true })
    dateKeyReturned!: number | null;

    @Column({ name: "film_key" })
    filmKey!: number;         // FK to dim_film.film_key

    @Column({ name: "store_key" })
    storeKey!: number;        // FK to dim_store.store_key

    @Column({ name: "customer_key" })
    customerKey!: number;     // FK to dim_customer.customer_key

    @Column({ name: "staff_id" })
    staffId!: number;         // natural key

    @Column({ name: "rental_duration_days" })
    rentalDurationDays!: number;  // computed
}
