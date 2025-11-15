import { Repository, MoreThan } from "typeorm"
import { sakilaDataSource, analyticsDataSource } from "../data-sources";
import { Film } from "../sakila/entities/Film"
import { DimFilm } from "../analytics/entities/DimFilm"
import {
    extractLastSyncedAt, changeLastSyncedAt, incrementalWhere
} from "../analytics/SyncStateHelper"

// incremental for Store, Actor, Film, Category, and Customer

export async function incrementalDimFilm() {

    const filmRepo = sakilaDataSource.getRepository(Film);
    const dimFilmRepo = analyticsDataSource.getRepository(DimFilm);

    // Building WHERE clause using IncrementalWhere
    const { where, lastSyncedAt } = await incrementalWhere(
        "dim_film",
        "lastUpdate"
    );

    // Query for ONLY the changed film in sakila repo
    const changed_film = await filmRepo.find({
        where,
        relations: {
            language: true,
        }
    });

    if (changed_film.length === 0) {
        console.log('DimFilm: no changes found since last sync.');
        return;
    }

    for (const cf of changed_film) {
        let dim = await dimFilmRepo.findOne({
            where: { filmId: cf.filmId },
        });

        if (!dim) {
            // it is a new film
            dim = dimFilmRepo.create({ filmId: cf.filmId });
        }

        // some familiar sakila data linking/mapping
        dim.title = cf.title;
        dim.rating = cf.rating;
        dim.length = cf.length;
        dim.language = cf.language.name;
        dim.releaseYear = cf.releaseYear
        dim.lastUpdate = cf.lastUpdate;
        await dimFilmRepo.save(dim);
    }

    let maxLastUpdate = changed_film[0].lastUpdate;
    for (const cf of changed_film) {
        if (cf.lastUpdate > maxLastUpdate) {
            maxLastUpdate = cf.lastUpdate;
        }
    }
    await changeLastSyncedAt("dim_film", maxLastUpdate);


    console.log(
        `DimFilm: processed ${changed_film.length} rows (previously synced at: ${lastSyncedAt ?? "none"
        })`
    );
}
