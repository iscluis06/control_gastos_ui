import {makeObservable, observable} from "mobx";

export default class PanelControlModel{
    @observable
    token: string = '';

    constructor() {
        makeObservable(this);
    }
}
