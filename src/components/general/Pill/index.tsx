import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    content: string;
}

export const Pill = ({ content, className, ...rest }: IProps) => {
    return (
        <div
            {...rest}
            className={cx(styles.pill, {
                [className as string]: !!className,
            })}
        >
            {content}
        </div>
    );
};
