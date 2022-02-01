import React, { memo, FC } from 'react';
import { FormProvider, useController } from '@schematic-forms/react';
import { Num, Str } from '@schematic-forms/core';

import Input from '../Input';
import Button from '../Button';
import NumInput from '../NumInput';

import cn from "./Form.module.scss";

export interface IForm {
    initialLabel?: string;
    initialDays?: number;
    initialTimesInADay?: number;
    onSubmit?: (label: string, days: number, times: number) => void;
    margin?: string | number
}

const Form: FC<IForm> = props => {
    const { controller, submit, clear } = useController({
        fields: {
            label: Str(true, props.initialLabel),
            days: Num(true, props.initialDays ?? 1),
            timesInADay: Num(true, props.initialTimesInADay ?? 1)
        },
        validators: {
            days: value => value < 1 ? new Error("NEGATIVE") : undefined,
            timesInADay: value => value < 1 ? new Error("NEGATIVE") : undefined
        },
        submit: data => {
            props.onSubmit &&  props.onSubmit(data.label, data.days, data.timesInADay)
            clear()
        }
    })
    
    return (
        <FormProvider controller={controller}>
            <div className={cn.root} style={{ margin: props.margin }}>
                <Input name="label" title="Label" />
                <div style={{ marginTop: 20 }}>
                    <div className={cn.line}>
                        <div className={cn.label}>Days:</div> <NumInput name="days" />
                    </div>
                    <div style={{ marginTop: 20 }} className={cn.line}>
                        <div className={cn.label}>Tablets per day:</div> <NumInput name="timesInADay" />
                    </div>
                </div>
                <Button margin="30px 0 0" onClick={submit}>
                    Confirm
                </Button>
            </div>
        </FormProvider>
    )
}

export default memo(Form)
