import { ITransformedGenreResult } from '@types';

export const getGenreNames = (genre_ids: number[], genres: ITransformedGenreResult['genres']) => {
    return genre_ids.map((id, index) => genres[id]?.name).filter(Boolean);
};
