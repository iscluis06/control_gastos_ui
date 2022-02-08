
export default class RequestLogic<T> {
    async obtenerToken(usuario: string, contrasena: string){
        let headers = new Headers();
        headers.set("Content-Type", "application/json");
        const result = await this.realizarPeticion('api-token-auth/', headers, "POST", {"username": usuario, "password": contrasena})
        return await result.json();
    }

    async realizarPeticion(url:string, cabeceras:Headers, metodo:string, cuerpo?:object){
        return await fetch(`${process.env.REACT_APP_HTTP}://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/${url}`, {
            headers: cabeceras,
            method: metodo,
            body: cuerpo != undefined && typeof cuerpo == 'object' ? JSON.stringify(cuerpo):undefined
        });
    }
}
