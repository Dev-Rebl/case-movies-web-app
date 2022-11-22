export interface IMovie {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: object | null
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }[];
    production_countries: {
        name: string;
        iso_3166_1: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
        name: string;
        iso_639_1: string;
    }[];
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    tagline: string | null;
    title: string;
    video: boolean;
    vore_average: number;
    vote_count: number;
}