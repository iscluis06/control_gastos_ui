import {observer} from "mobx-react";
import {TipoEntrada} from "../../comunes/dialogo/Types";
import {DialogoCreacionView} from "../../comunes/dialogo/DialogoCreacionView";
import {CuentaCreacionView, CuentaGuardarTipo} from "../Types";

export const DialogoCrearCuentaView = observer(({store:{ocultarDialogo, mostrar, guardar}}:CuentaCreacionView) => {
    const tiposEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre",
            nombreEntrada: "nombre",
            valorInicial: '',
            tipoEntrada: 'text'
        },
        {
            etiqueta: "Deuda",
            nombreEntrada: "deuda",
            valorInicial: false,
            tipoEntrada: 'checkbox'
        },
        {
            etiqueta: "Monto",
            nombreEntrada: "monto",
            valorInicial: 0,
            tipoEntrada: 'number'
        }
    ]

    return <DialogoCreacionView<CuentaGuardarTipo> mostrar={mostrar} ocultar={ocultarDialogo} funcionGuardar={guardar} componentes={tiposEntrada} titulo={"Crear cuenta"} />
});
