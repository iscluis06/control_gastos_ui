import {BalanceStore} from "./BalanceStore";

export type BalanceViewProps = {
    store: BalanceStore;
}

export type BalanceResponse = {
    capital: number,
    deuda: number,
    total: number
}
