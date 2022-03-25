import {DialogoDetalleViewProps} from "./Types";
import {DialogoView} from "./DialogoView";
import {Table} from "react-bootstrap";

export const DialogoDetalleView = ({info, columnas, titulo, mostrar, ocultar}: DialogoDetalleViewProps) => {
    return (<DialogoView titulo={titulo} mostrar={mostrar} ocultar={ocultar}>
        <Table responsive>
            <thead>
                <tr>
                    {columnas.map(columna => (<th>{columna}</th>))}
                </tr>
            </thead>
            <tbody>
                {info.map(fila => (<tr>{fila.map(columna => (<td>{columna}</td>))}</tr>))}
            </tbody>
        </Table>
    </DialogoView>)
}
