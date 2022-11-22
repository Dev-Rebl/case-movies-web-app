import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '@services/moviedb';
import { Pill } from '@components/general';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface IProps extends HTMLAttributes<HTMLDivElement> { }

export const Header = ({ className }: IProps) => {
    const { id } = useParams<'id'>();
    const { data, isSuccess } = useGetMovieByIdQuery(id || 0);

    return isSuccess ? (
        <div
            className={cx(styles.header, {
                [className as string]: !!className,
            })}
        >
            <div className={styles.backdropWrapper}>
                {data.backdrop_path && <LazyLoadImage
                    className={styles.coverImage}
                    effect='opacity'
                    src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${data.backdrop_path}`}
                    alt={`${data.title} cover`}
                    delayTime={300}
                />}
            </div>

            <div className={styles.topContent}>
                <h1 className={styles.title}>{data?.title}</h1>
                <span className={styles.releaseDate}>Release: {data?.release_date}</span>
            </div>

            <div className={styles.bottomContent}>
                <div className={styles.generalInfo}>
                    <div className={styles.posterWrapper}>
                        {data.poster_path && <LazyLoadImage
                            className={styles.poster}
                            src={`https://www.themoviedb.org/t/p/w440_and_h660_face${data.poster_path}`}
                            alt={data.title}
                            effect='opacity'
                        />}
                    </div>

                    <div className={styles.infoWrapper}>
                        <p className={styles.overview}>{data.overview}</p>
                        <span className={styles.genres}>
                            {data.genres?.map((genre, index) => (
                                <Pill content={genre.name} key={index} />
                            ))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};
