import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "dim_customer" })
export class DimCustomer {
    @PrimaryGeneratedColumn()
    customer_key!: number;

    @Column()
    customer_id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    active!: boolean; // 0 or 1

    @Column()
    city!: string;

    @Column()
    country!: string;

    @Column({ name: "last_update", type: "datetime" })
    lastUpdate!: Date;
}
