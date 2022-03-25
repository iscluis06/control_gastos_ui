import StoreCatalogo from "./StoreCatalogo";
import {action, makeObservable, observable} from "mobx";

export default abstract class StorePanel<X extends Object, Y extends Object> extends StoreCatalogo<X, Y>{
    resultadosPanel: X[] = [];

    constructor(urlServicio: string) {
        super(urlServicio);
        makeObservable(this, {
            resultadosPanel: observable,
            actualizarResultadosPanel: action.bound
        });
    }

    async actualizarResultadosPanel(){
        this.resultadosPanel = await this.realizarPeticion<X>();
    }
}
