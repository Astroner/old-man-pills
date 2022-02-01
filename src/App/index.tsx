import React, { memo, FC } from 'react';

import Header from '../Header';
import List from '../List';

import cn from "./App.module.scss";

export interface IApp {}

const App: FC<IApp> = () => {

    return (
        <>
            <Header />
            <main className={cn.main}>
                <List />
            </main>
        </>
    )
}

export default memo(App)
