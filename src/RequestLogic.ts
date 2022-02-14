import {action, makeObservable, observable, toJS} from "mobx";

type TokenResponse = {
    token: string
}

export default class RequestLogic {

    @observable
    token: string = '';
    @observable
    usuario: string = '';
    @observable
    cabeceras: string[][] = [];

    constructor() {
        makeObservable(this);
        this.cabeceras.push(["Content-Type", "application/json"]);
    }

    @action.bound
    actualizarCredenciales(token:string, usuario:string) {
        this.token = token;
        this.usuario = usuario;
        this.anadirCabecera("Authorization", `Token ${this.token}`);
    }


    @action.bound
    anadirCabecera(cabecera: string, valor: string){
        const fila = this.cabeceras.findIndex(fila => fila[0]=="Authorization");
        if(fila!=-1) {
            this.cabeceras[fila][1] = valor;
        }else{
            this.cabeceras.push([cabecera,valor]);
        }
        console.dir(toJS(this.cabeceras));
    }

    @action.bound
    async obtenerToken(usuario: string, contrasena: string): Promise<boolean> {
        const result: TokenResponse = await this.realizarPeticion<TokenResponse>('api-token-auth/', "POST", {
            "username": usuario,
            "password": contrasena
        })
        if (result === undefined) {
            return false;
        }
        this.token = result.token;
        this.usuario = usuario;
        localStorage.setItem("token",this.token);
        localStorage.setItem("usuario",this.usuario);
        this.cabeceras.push(["Authorization", `Token ${this.token}`]);
        return true;
    }

    @action.bound
    async realizarPeticion<T>(url: string, metodo: string, cuerpo?: object, cabeceras?: string[][]): Promise<T> {
        let cabecerasPeticion: string[][] = [...this.cabeceras];
        if (cabeceras) {
            cabecerasPeticion = [...cabecerasPeticion, ...cabeceras];
        }
        const peticion = await fetch(`${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${url}`, {
            headers: cabecerasPeticion,
            method: metodo,
            body: cuerpo != undefined && typeof cuerpo == 'object' ? JSON.stringify(cuerpo) : undefined
        });
        if (peticion.status != 200) {
            return undefined as unknown as T;
        }
        const respuestaJson = await peticion.json();
        const json: T = respuestaJson as unknown as T;
        return new Promise((resolve, reject) => {
            resolve(json);
        });
    }
}


export const requestLogic = new RequestLogic();
