import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { Link, To } from 'react-router-dom';

interface IProps extends HTMLAttributes<HTMLAnchorElement>, React.Attributes {
    title: string;
    subtitle: string;
    image?: string | null;
    alternativeTitle?: string;
    to: To;
}

export const Card = ({ title, subtitle, image, alternativeTitle, className, ...rest }: IProps) => {
    return (
        <Link
            {...rest}
            className={cx(styles.card, {
                [className as string]: !!className,
            })}
        >
            {!!image && <img className={styles.image} src={image} alt="" />}

            <div className={styles.content}>
                {!!alternativeTitle && (
                    <span className={styles.alternativeTitle}>{alternativeTitle}</span>
                )}

                <h4 className={styles.title}>{title}</h4>

                <h5 className={styles.subtitle}>{subtitle}</h5>
            </div>
        </Link>
    );
};
