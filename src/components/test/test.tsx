import BaseView from "../../base/BaseView";
import TestModel from "./testModel";
import {observer} from "mobx-react";
import {BaseViewModel} from "../../base/Types";

export default class Test extends  BaseView<TestModel>{
    constructor(props: Readonly<BaseViewModel<TestModel>>) {
        super(props);
    }

    render(){
        console.log(this.context);
        const {store} = this.props.viewModel;
        return (
            <input onChange={(event) => store.actualizarUsuario(event.currentTarget.value)} value={store.usuario} />
        )
    }
}
