import React, { memo, FC, useState, useEffect } from 'react';

import cn from "./Header.module.scss";

export interface IHeader {}

const Header: FC<IHeader> = props => {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handler = () => {
            window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
        }

        window.addEventListener("scroll", handler)

        return () => {
            window.removeEventListener("scroll", handler)
        }
    }, [])

    return (
        <header className={isScrolled ? cn["root--shadow"] : cn.root}>
            Old man get ur pills
        </header>
    )
}

export default memo(Header)
