export const createImageUrl = {
    poster: (path: string | null) => {
        return path ? `https://www.themoviedb.org/t/p/w440_and_h660_face${path}` : '';
    },
    backdrop: (path: string | null) => {
        return path ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${path}` : '';
    },
};