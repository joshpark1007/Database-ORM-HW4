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

import { Staff } from "././Staff";
import { Address } from "././Address";
import { Customer } from "././Customer";
import { Inventory } from "././Inventory";

@Entity({ name: "store" })
export class Store {
    @PrimaryColumn({ name: "store_id", type: "tinyint", unsigned: true })
    id: number;

    @OneToOne(() => Staff, (staff) => staff.managedStore)
    @JoinColumn({ name: "manager_staff_id" })
    manager: Staff;

    @ManyToOne(() => Address, (address) => address.stores)
    @JoinColumn({ name: "address_id" })
    address: Address;

    @Column({ name: "last_update", type: "timestamp" })
    lastUpdate: Date;

    @OneToMany(() => Staff, (staff) => staff.store)
    staff: Staff[];

    @OneToMany(() => Customer, (customer) => customer.store)
    customers: Customer[];

    @OneToMany(() => Inventory, (inventory) => inventory.store)
    inventories: Inventory[];
}
