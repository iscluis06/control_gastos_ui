import {Toast, ToastContainer} from "react-bootstrap";
import {NotificacionProps} from "./Types";
import {observer} from "mobx-react";

export const Notificacion = observer(({
                                          tipoModal,
                                          titulo,
                                          mensaje,
                                          cerrarNotificacion,
                                          mostrarNotificacion
                                      }: NotificacionProps) => {
    return (
        <ToastContainer position={"top-end"}>
            <Toast className="d-inline-block m-1" bg={tipoModal} onClose={cerrarNotificacion}
                   show={mostrarNotificacion}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                    <strong className="me-auto">{titulo}</strong>
                </Toast.Header>
                <Toast.Body>
                    {mensaje}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
});
