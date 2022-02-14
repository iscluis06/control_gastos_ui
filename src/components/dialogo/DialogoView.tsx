import React from "react";
import {observer} from "mobx-react";
import {DialogoViewProps} from "./Types";
import {Modal} from "react-bootstrap";

export const DialogoView = observer( ({ocultar, mostrar, children, titulo}: DialogoViewProps)  => {
    return (<Modal show={mostrar} onHide={() => {
        ocultar();
    }}>
        <Modal.Header closeButton>
            <Modal.Title>
                {titulo}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>);
});
