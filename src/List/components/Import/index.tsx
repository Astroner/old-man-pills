import { useInjector } from '@dogonis/react-injectable';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import React, { memo, FC, useCallback } from 'react';
import { DataService } from '../../../services/data.service';
import Button from '../Button';

export interface IImport {
    margin?: string | number
}

const Import: FC<IImport> = props => {

    const { service } = useInjector(DataService);

    const read = useCallback(() => {
        navigator.clipboard.readText()
            .then(text => {
                pipe(
                    service.parseString(text),
                    fold(
                        e => alert(e),
                        value => service.setData(value)
                    )
                )
            })
    }, [service])

    return (
        <Button onClick={read} margin={props.margin}>
            Import From Clipboard
        </Button>
    )
}

export default memo(Import)
