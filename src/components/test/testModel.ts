import BaseModel from "../../base/BaseModel";
import {action, observable} from "mobx";

export default class TestModel extends BaseModel{
    @observable
    texto: string = "";

    @action.bound
    actualizarTexto(texto: string){
        this.texto = texto;
    }

    constructor() {
        super();
    }
}
