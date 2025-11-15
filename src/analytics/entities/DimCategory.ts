import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "dim_category" })
export class DimCategory {
    @PrimaryGeneratedColumn({ name: "category_key" })
    categoryKey!: number;

    @Column({ name: "category_id" })
    categoryID!: number;

    @Column()
    name!: string;

    @Column({ name: "last_update", type: "datetime" })
    lastUpdate!: Date;
}
