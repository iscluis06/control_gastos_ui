import {Component} from "react";
import {BaseViewModel} from "./Types";
import {observer} from "mobx-react";
import {LoginContext} from "../context/LoginContext";
import BaseModel from "./BaseModel";

@observer
export default class BaseView<T extends BaseModel> extends Component<BaseViewModel<T>>{
    static contextType = LoginContext;

    constructor(props: Readonly<BaseViewModel<T>>) {
        super(props);
        console.dir(this.props);
        console.log(this.context);
        this.props.viewModel.store = this.context!;
        console.log(this.context);
    }

    render(){

        return (<>this.props.children</>)
    }
}
