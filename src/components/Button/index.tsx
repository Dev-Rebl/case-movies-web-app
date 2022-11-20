
import React, { useState } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props {
    children: React.ReactNode;
}

export const Button = ({ children }: Props) => {
    const [count, setCount] = useState(0)

    return (
        <button className={classNames(styles.button)}
            onClick={() => setCount((count) => count + 1)}
        >
            {children} {count}
        </button>
    );
};
