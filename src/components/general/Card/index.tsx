import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { Link, To } from 'react-router-dom';
import React from 'react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface IProps extends HTMLAttributes<HTMLAnchorElement>, React.Attributes {
    title: string;
    subtitle: string;
    image?: string | null;
    alternativeTitle?: string;
    to: To;
}

export const Card = React.forwardRef<HTMLAnchorElement, IProps>(({ title, subtitle, image, alternativeTitle, className, ...rest }, ref) => {
    return (
        <Link
            ref={ref}
            {...rest}
            className={cx(styles.card, {
                [className as string]: !!className,
            })}
        >
            
            {!!image && <LazyLoadImage className={styles.image} src={image} alt={title} effect='opacity' />}

            <div className={styles.content}>
                {!!alternativeTitle && (
                    <span className={styles.alternativeTitle}>{alternativeTitle}</span>
                )}

                <h4 className={styles.title}>{title}</h4>

                <h5 className={styles.subtitle}>{subtitle}</h5>
            </div>
        </Link>
    );
});
