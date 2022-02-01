import { useInjector } from '@dogonis/react-injectable';
import React, { memo, FC, useState, useCallback } from 'react';

import { DataService } from '../../../services/data.service';
import Button from '../Button';
import Form from '../Form';

import cn from "./AddNew.module.scss";

export interface IAddNew {
    margin?: string | number
}

const AddNew: FC<IAddNew> = props => {
    const { service } = useInjector(DataService);

    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => setIsOpen(p => !p), [])

    const onSubmit = useCallback((label: string, days: number, times: number) => {
        service.addItem({
            label,
            days,
            timesInADay: times
        })
        setIsOpen(false)
    }, [service])

    return (
        <div style={{ margin: props.margin }} className={isOpen ? cn["root--open"] : cn["root--close"]}>
            <Button onClick={toggle}>
                <span style={{ marginRight: 40 }} className={cn.close}>Close</span>
                <span className={cn.open}>Add</span>
            </Button>
            <Form onSubmit={onSubmit} />
        </div>
    )
}

export default memo(AddNew)
