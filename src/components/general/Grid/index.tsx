import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';
import { GridItem } from './GridItem';
import React from 'react';

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export const Grid = ({ children, className, ...rest }: IProps) => {
    const extendedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            return (
                <GridItem key={child.key || index}>
                    {React.cloneElement(child, child.props)}
                </GridItem>
            );
        } else {
            return <GridItem key={index}>{child}</GridItem>;
        }
    });

    return (
        <div
            {...rest}
            className={cx(styles.grid, {
                [className as string]: !!className,
            })}
        >
            {extendedChildren}
        </div>
    );
};
