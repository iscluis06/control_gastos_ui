import RequestLogic from "../../utils/RequestLogic";
import {action, makeObservable, observable} from "mobx";
import {LoginStore} from "../../stores/LoginStore";

export default class BalanceModel{
    @observable
    capital: string = '0';

    @observable
    deuda: string = '0';

    @observable
    total: string = '0';

    private store: LoginStore | undefined;

    constructor() {
        makeObservable(this)
    }

    asignarStore(store: LoginStore){
        this.store = store;
    }

    @action.bound
    async obtenerBalance(){
        if(this.store && this.store.token){
            const requestLogic = new RequestLogic();
            let headers = new Headers();
            headers.set("Authorization", `Token ${this.store.token}`);
            const response = await requestLogic.realizarPeticion("control_gastos/balance", headers, "GET");
            const responseBody = await response.json();
            this.capital = Number(responseBody.capital).toFixed(2);
            this.deuda = Number(responseBody.deuda).toFixed(2);
            this.total = Number(responseBody.total).toFixed(2);
        }
    }
}
