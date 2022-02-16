import {Table} from "react-bootstrap";
import {TablaViewProps} from "./Types";
import React from "react";

export const TablaView = ({filas,columnas}:TablaViewProps) => {
    return (
        <Table hover bordered responsive>
            <thead>
                <tr>
                    {columnas.map(columna => <th>{columna}</th>)}
                </tr>
            </thead>
            <tbody>
                {filas.map(fila => <tr>{fila.map(columna=><td>{columna}</td>)}</tr>)}
            </tbody>
        </Table>
    );
}
