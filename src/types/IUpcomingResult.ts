import { IUpcomingMovie } from "./IUpcomingMovie";

export interface IUpcomingResult {
    page: number;
    results: IUpcomingMovie[];
    dates: {
        maximum: string;
        minimum: string;
    };
    total_pages: number;
    total_results: number;
}