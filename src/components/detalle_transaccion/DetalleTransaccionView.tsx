import {DialogoCreacionView} from "../comunes/dialogo/DialogoCreacionView";
import {TipoEntrada} from "../comunes/dialogo/Types";
import {DetalleTransaccionGuardar, DetalleTransacionProps} from "./Types";
import {observer} from "mobx-react";
import {DialogoDetalleView} from "../comunes/dialogo/DialogoDetalleView";


export const DetalleTransaccionView = observer(({store}:DetalleTransacionProps) =>{
    const {guardar, mostrar, ocultarDialogo, idDetalle, columnas, infoDetalle} = store;
    const tiposEntrada: TipoEntrada[] = [
        {
            etiqueta: 'Nombre',
            nombreEntrada: 'nombre',
            valorInicial: '',
            tipoEntrada: 'text'
        },
        {
            etiqueta: 'Descripción',
            nombreEntrada: 'descripcion',
            valorInicial: '',
            tipoEntrada: 'text'
        }
    ]

    return (
        <>
        { idDetalle !== undefined && idDetalle != null ?
            <DialogoDetalleView titulo={"Detalle transacción"} ocultar={ocultarDialogo} mostrar={mostrar} columnas={columnas} info={infoDetalle()} />
            :<DialogoCreacionView<DetalleTransaccionGuardar> titulo={'Crear transaccion'} funcionGuardar={guardar} mostrar={mostrar} ocultar={ocultarDialogo} componentes={tiposEntrada}/>
        }
        </>
    );
});
