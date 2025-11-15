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

@Entity({ name: "category" })
export class Category {
    @PrimaryColumn({ name: "category_id", type: "tinyint", unsigned: true })
    id: number;

    @Column({ name: "name", type: "varchar", length: 25 })
    name: string;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;
}
