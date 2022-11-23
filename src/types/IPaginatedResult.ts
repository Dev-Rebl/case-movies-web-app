import { IMovieListResult } from "./IMovieListResult";

export interface IPaginatedResult {
    page: number;
    results: IMovieListResult[];
    dates: {
        maximum: string;
        minimum: string;
    };
    total_pages: number;
    total_results: number;
}