import { HTMLAttributes, PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export const GridItem = ({ children, ...rest }: IProps) => {
    return (
        <div {...rest} className={styles.gridItem}>
            {children}
        </div>
    );
};
