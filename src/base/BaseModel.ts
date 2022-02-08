import {action, makeObservable, observable} from "mobx";
import {LoginStore} from "../stores/LoginStore";


export default class BaseModel {
    @observable
    store!: LoginStore;

    constructor() {
        makeObservable(this);
    }
}
