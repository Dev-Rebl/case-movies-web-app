
import React, { HTMLAttributes, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

import { useAppDispatch, useAppSelector } from "@hooks";
import { increment } from "@reducers/movies";

interface IProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children }: IProps) => {
    const dispatch = useAppDispatch()
    const count = useAppSelector((state) => state.counter.value)

    return (
        <button className={classNames(styles.button)}
            onClick={() => dispatch(increment())}
        >
            {children} {count}
        </button>
    );
};
