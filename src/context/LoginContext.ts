import {loginStore, LoginStore} from "../stores/LoginStore";
import {createContext} from "react";

export type TLoginContext = {
    store: LoginStore;
}

export const defaultContext = { store: loginStore};

export const LoginContext = createContext<TLoginContext>(defaultContext);
