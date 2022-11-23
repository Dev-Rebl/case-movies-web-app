import { IGenreResult } from "./IGenreResult";

export interface ITransformedGenreResult {
    genres: {
        [key: number]: IGenreResult['genres'][0]
    };
}