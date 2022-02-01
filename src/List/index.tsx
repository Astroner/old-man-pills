import React, { memo, FC, useCallback } from 'react';
import { useInjector } from '@dogonis/react-injectable';

import { DataService } from '../services/data.service';
import AddNew from './components/AddNew';
import Item from './components/Item';

import cn from "./List.module.scss";

export interface IList {}

const List: FC<IList> = props => {

    const { state, service } = useInjector(DataService);
    const change = useCallback((id: number, value: number) => {
        service.updateItem(id, {
            value
        })
    }, [service])

    const remove = useCallback((id: number) => {
        service.deleteItem(id)
    }, [service])

    const update = useCallback((id: number, label: string, days: number, times: number) => {
        service.updateItem(id, { label, days, timesInADay: times })
    }, [service])

    return (
        <div className={cn.root}>
            {state.items.map(item => (
                <Item key={item.id} {...item} onChange={change} onDelete={remove} onUpdate={update} />
            ))}
            <AddNew margin="50px 0 0" />
        </div>
    )
}

export default memo(List)
