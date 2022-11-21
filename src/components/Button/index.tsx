import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

import { useAppDispatch, useAppSelector } from '@hooks';
import { increment } from '@reducers/counter';

interface IProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...rest }: IProps) => {
    const dispatch = useAppDispatch();
    const count = useAppSelector((state) => state.counter.value);

    return (
        <button
            {...rest}
            className={classNames(styles.button)}
            onClick={() => dispatch(increment())}
        >
            {children} {count}
        </button>
    );
};
