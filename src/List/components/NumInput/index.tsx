import { useForm } from '@schematic-forms/react';

import React, { memo, FC, useCallback } from 'react';

import cn from "./NumInput.module.scss";

export interface INumInput {
    name: string;
    margin?: string | number;
}

const NumInput: FC<INumInput> = props => {

    const [value, setValue] = useForm(props.name, 1);

    const decrease = useCallback(() => {
        setValue(prev => prev ? prev <= 1 ? 1 : prev - 1 : 1)
    }, [setValue])

    const increase = useCallback(() => {
        setValue(prev => prev ? prev + 1 : 1)
    }, [setValue])

    return (
        <div style={{ margin: props.margin }} className={cn.root}>
            <button disabled={value <= 1} className={cn.button} onClick={decrease}>
                -
            </button>
            <div className={cn.value}>
                {value}
            </div>
            <button className={cn.button} onClick={increase}>
                +
            </button>
        </div>
    )
}

export default memo(NumInput)
