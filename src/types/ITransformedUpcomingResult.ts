import { IUpcomingResult } from "./IUpcomingResult";

export interface ITransformedUpcomingResult extends Pick<IUpcomingResult, 'results' | 'page'> {
    has_more_pages: boolean;
}