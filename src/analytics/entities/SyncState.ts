import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "sync_state" })
export class SyncState {
    @PrimaryColumn({ name: "table_name" })
    tableName: string;

    @Column({ name: "last_synced_at", type: "datetime", nullable: true })
    lastSyncedAt: Date | null;
}