import { IPaginatedResult } from "./IPaginatedResult";

export interface ITransformedPaginatedResult extends Pick<IPaginatedResult, 'results' | 'page'> {
    has_more_pages: boolean;
}