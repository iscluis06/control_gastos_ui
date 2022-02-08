import {Component} from "react";
import {LoginContext, TLoginContext} from "./LoginContext";
import {loginStore} from "../stores/LoginStore";

export default class LoginContextProvider extends Component<any, any>{
    state: TLoginContext = {
        store: loginStore
    };
    render(){
        return (<LoginContext.Provider value={this.state}>
            {this.props.children}
        </LoginContext.Provider>);
    }
}
