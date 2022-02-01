import { useForm } from '@schematic-forms/react';
import React, { memo, FC } from 'react';

import cn from "./Input.module.scss";

export interface IInput {
    name: string;
    title?: string;
    margin?: string | number;
}

const Input: FC<IInput> = props => {

    const [value, setValue, error] = useForm(props.name, "");

    return (
        <label style={{ margin: props.margin }}>
            {props.title && <div className={cn.title}>{props.title}</div>}
            <input value={value} onChange={e => setValue(e.target.value)} className={error ? cn["input--error"] : cn.input} />
        </label>
    )
}

export default memo(Input)
