import React, { memo, FC, useCallback, useState, useEffect } from 'react';

import { ItemType } from '../../../services/data.service';
import { Plus } from './Plus';

import cn from "./Item.module.scss";
import { Close } from './Close';
import { Edit } from './Edit';
import Form from '../Form';

export interface IItem extends ItemType {
    onChange: (id: number, nextValue: number) => void
    onDelete: (id: number) => void
    onUpdate: (ud: number, label: string, days: number, times: number) => void;
}

const Item: FC<IItem> = ({ onChange, onDelete, onUpdate, ...props }) => {

    const daysCompleted = Math.floor(props.value / props.timesInADay);
    const currentDayValue = props.value % props.timesInADay;

    const isCompleted = daysCompleted >= props.days;

    const [isEdit, setIsEdit] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const formClass = [cn.form, isClosing ? cn.closing : ""].join(" ");

    const change = useCallback(() => onChange(props.id, props.value + 1), [onChange, props.id, props.value]);

    const remove = useCallback(() => onDelete(props.id), [onDelete, props.id]);

    const update = useCallback((label: string, days: number, times: number) => {
        onUpdate(props.id, label, days, times)
        setIsClosing(true)
    }, [onUpdate, props.id])

    useEffect(() => {
        if(!isClosing) return;

        let mounted = true;

        setTimeout(() => {
            if(!mounted) return 
            setIsClosing(false)
            setIsEdit(false)
        }, 300)

        return () => {
            mounted = false
        }
    }, [isClosing])

    return (
        <div className={cn.root}>
            <div className={cn.heading}>
                <div className={cn.info}>
                    <div className={cn.title}>
                        {props.label}
                    </div>
                    <div className={cn.days}>
                        {new Array(props.days).fill(null).map((_, i) => (
                            <div key={i} className={i < daysCompleted ? cn["line--active"] : cn["line--disabled"]} />
                        ))}
                    </div>
                </div>
                <div className={cn.buttons}>
                    <div style={{ marginRight: 10 }} onClick={() => isEdit ? setIsClosing(true) : setIsEdit(true)}>
                        <Edit />
                    </div>
                    <div onClick={remove}>
                        <Close />
                    </div>
                </div>
            </div>
            <div className={cn.plusses}>
                {new Array(props.timesInADay).fill(null).map((_, i) => (
                    <button key={i} onClick={change} disabled={i < currentDayValue || isCompleted} className={cn.plus}>
                        <Plus />
                    </button>
                ))}
            </div>
            {isEdit && (
                <div className={formClass}>
                    <Form initialDays={props.days} initialLabel={props.label} initialTimesInADay={props.timesInADay} onSubmit={update} />
                </div>
            )}
        </div>
    )
}

export default memo(Item)
