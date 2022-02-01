import { Injectable, OnInit } from "@dogonis/react-injectable";
import { chainW, Either, fold, fromOption, getOrElseW, left, map, mapLeft, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { parse, stringify } from "fp-ts/lib/Json";

import { StorageService } from "./storage.service";

export interface ItemType {
    id: number;
    label: string;
    days: number;
    timesInADay: number;
    value: number;
}

interface IDataService {
    ID: number;
    items: ItemType[]
}

export class DataService extends Injectable<IDataService> implements OnInit {
    static KEY = "ASDASDFLLASDAD:K@A:"

    getDefaultState(): IDataService {
        return {
            ID: 0,
            items: [],
        }
    }

    onInit(){
        console.log("INIT")
        const storage = this.getInjection(StorageService);
        this.setState(
            pipe(
                storage.getValue(DataService.KEY),
                fromOption(() => new Error("NOT_INITIALIZED")),
                chainW(parse),
                mapLeft(() => new Error("FAILED_TO_PARSE")),
                chainW((value): Either<Error, IDataService> => {
                    if(typeof value === "object" && value && !(value instanceof Array) && "items" in value && value["items"] instanceof Array) {
                        return right(value as any)
                    }
    
                    return left(new Error("INVALID"))
                }),
                map(record => record as IDataService),
                getOrElseW(e => {
                    if(e.message !== "NOT_INITIALIZED") {
                        storage.remove(DataService.KEY);
                    }
                    return this.getDefaultState();
                })
            )
        )
        this.subscribe(value => pipe(
            stringify(value),
            fold(
                e => console.error(e),
                str => storage.setValue(DataService.KEY, str)),
            )
        )
    }
    addItem(item: Omit<ItemType, "id" | "value">) {
        this.setState(prev => ({
            ...prev,
            ID: prev.ID + 1,
            items: [...prev.items, { ...item, id: prev.ID, value: 0 }]
        }))
    }
    
    updateItem(id: number, updater: Partial<Omit<ItemType, "id">>) {
        this.setState(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if(item.id !== id) return item;
                return Object.assign({}, item, updater);
            })
        }))
    }

    deleteItem(id: number){
        this.setState(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }))
    }
}