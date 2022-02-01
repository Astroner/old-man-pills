import React, { memo, FC, ReactNode } from 'react';

import cn from "./Button.module.scss";

export interface IButton {
    children?: ReactNode;
    onClick?: VoidFunction;
    margin?: string | number;
}

const Button: FC<IButton> = props => {

    return (
        <button style={{ margin: props.margin }} onClick={props.onClick} className={cn.root}>
            {props.children}
        </button>
    )
}

export default memo(Button)
