import RequestLogic, {requestLogic} from "../../RequestLogic";
import {action, makeObservable, observable} from "mobx";
import {BalanceResponse} from "./Types";

export class BalanceStore {
    @observable
    capital: number = 0;

    @observable
    deuda: number = 0;

    @observable
    total: number = 0;


    constructor() {
        makeObservable(this)
    }

    @action.bound
    async obtenerBalance() {
        const response: BalanceResponse = await requestLogic.realizarPeticion<BalanceResponse>("control_gastos/balance", "GET");
        this.capital = response?.capital;
        this.deuda = response?.deuda;
        this.total = response?.total;
    }
}

export const balanceStore = new BalanceStore();
