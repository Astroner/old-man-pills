import { Injectable } from "@dogonis/react-injectable";
import { Option, none, some } from "fp-ts/Option";

export class StorageService extends Injectable {
    getDefaultState(): void {

    }

    getValue(key: string): Option<string>{
        const value = localStorage.getItem(key);
        if(!value) return none
        return some(value)
    }

    setValue(key: string, value: string){
        localStorage.setItem(key, value)
    }

    remove(key: string) {
        localStorage.removeItem(key)
    }
}