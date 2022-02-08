import {Variant} from "react-bootstrap/types";

export type NotificacionProps = {
    tipoModal: Variant,
    titulo: string,
    mensaje: string,
    cerrarNotificacion: () => void,
    mostrarNotificacion: boolean
}
