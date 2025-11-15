import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Film } from "././Film";

@Entity({ name: "language" })
export class Language {
    @PrimaryGeneratedColumn({ name: "language_id" })
    languageId: number;

    @Column()
    name: string;

    @Column({ name: "last_update", type: "datetime" })
    lastUpdate: Date;

    @OneToMany(() => Film, (film) => film.language)
    films: Film[];
}
