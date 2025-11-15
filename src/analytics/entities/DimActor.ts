import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "dim_actor" })
export class DimActor {
    @PrimaryGeneratedColumn()
    actor_key!: number;

    @Column()
    actor_id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column({ name: "last_update", type: "datetime" })
    lastUpdate!: Date;
}
