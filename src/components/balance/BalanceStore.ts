import {requestLogic} from "../../RequestLogic";
import {action, makeObservable, observable} from "mobx";
import {BalanceResponse} from "./Types";
import {IObservadorAccion} from "../../clases/Observador";

export class BalanceStore implements IObservadorAccion {
    capital: number = 0;
    deuda: number = 0;
    total: number = 0;


    constructor() {
        makeObservable(this,{
            capital: observable,
            deuda: observable,
            total: observable,
            obtenerBalance: action.bound
        })
    }

    async obtenerBalance() {
        const response: BalanceResponse = await requestLogic.realizarPeticion<BalanceResponse>("control_gastos/balance", "GET");
        this.capital = response?.capital;
        this.deuda = response?.deuda;
        this.total = response?.total;
    }

    accionEvento(nombreEvento: string): void {
        switch (nombreEvento){
            case "cuentasActualizadas":
                this.obtenerBalance();
        }
    }
}
