import { sakilaDataSource, analyticsDataSource } from "../data-sources"
import { Film } from "../sakila/entities/Film";
import { DimFilm } from "../analytics/entities/DimFilm";
import { SyncState } from "../analytics/entities/SyncState";

export async function fullLoad() {
    // connect both DBs
    await sakilaDataSource.initialize();
    await analyticsDataSource.initialize();

    const filmRepo = sakilaDataSource.getRepository(Film);
    const dimFilmRepo = analyticsDataSource.getRepository(DimFilm);
    const syncRepo = analyticsDataSource.getRepository(SyncState);

    await dimFilmRepo.clear();

    const films = await filmRepo.find({
        relations: ["language"],
    });

    const dimFilms: DimFilm[] = [];

    for (const film of films) {
        const dim = dimFilmRepo.create({
            filmId: film.filmId,
            title: film.title,
            rating: film.rating ?? "",
            length: film.length ?? 0,
            language: film.language?.name ?? "",
            releaseYear: film.releaseYear ?? 0,
            lastUpdate: film.lastUpdate,
        });

        dimFilms.push(dim);
    }

    if (dimFilms.length > 0) {
        await dimFilmRepo.save(dimFilms);

        // update sync_state for "film"
        let state = await syncRepo.findOneBy({ tableName: "film" });
        if (!state) {
            state = syncRepo.create({ tableName: "film", lastSyncedAt: null });
        }

        const maxLastUpdate = dimFilms.reduce(
            (max, f) => (f.lastUpdate > max ? f.lastUpdate : max),
            dimFilms[0].lastUpdate
        );

        state.lastSyncedAt = maxLastUpdate;
        await syncRepo.save(state);
    }
    console.log(`Full load completed. Loaded ${dimFilms.length} films into analytics.`);

    await analyticsDataSource.destroy();
    await sakilaDataSource.destroy();
}

if (require.main === module) {
    fullLoad()
        .then(() => console.log("full-load (script) finished"))
        .catch(err => console.error(err));
}