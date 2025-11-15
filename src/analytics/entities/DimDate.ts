import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "dim_date" })
export class DimDate {
    @PrimaryColumn()
    date_key!: number;        // YYYYMMDD

    @Column({ type: "date" })
    date!: string;            // "2025-11-14"

    @Column()
    year!: number;

    @Column()
    quarter!: number;

    @Column()
    month!: number;

    @Column()
    day_of_month!: number;

    @Column()
    day_of_week!: number;     // 1–7

    @Column()
    is_weekend!: number;  // 0 or 1
}
