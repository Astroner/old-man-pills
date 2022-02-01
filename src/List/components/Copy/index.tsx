import { useInjector } from '@dogonis/react-injectable';
import React, { memo, FC, useCallback } from 'react';
import { DataService } from '../../../services/data.service';

import Button from '../Button';

export interface ICopy {
    margin: string | number;
}

const Copy: FC<ICopy> = props => {

    const { service } = useInjector(DataService);

    const copy = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(service.getState()));
    }, [service])

    return (
        <Button margin={props.margin} onClick={copy}>
            Export List To Clipboard
        </Button>
    )
}

export default memo(Copy)
