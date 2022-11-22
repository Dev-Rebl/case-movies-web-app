import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '@services/moviedb';
import { Pill } from '@components/general';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { createImageUrl } from '@utils';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue: string;
}

export const Header = ({ handleChange, defaultValue, className }: IProps) => {
    return (
        <div
            className={cx(styles.header, {
                [className as string]: !!className,
            })}
        >
            <div className={styles.inputWrapper}>

            <input className={styles.input} {...{ defaultValue }} placeholder='Search here' type="text" onChange={handleChange} />
            </div>
        </div>
    );
};
