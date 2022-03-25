import {CategoriaDialogoProps, CategoriaGuardar} from "../Types";
import {TipoEntrada} from "../../comunes/dialogo/Types";
import {DialogoCreacionView} from "../../comunes/dialogo/DialogoCreacionView";


export const CategoriaDialogo = ({mostrarDialogo, alternarDialogo, guardar}:CategoriaDialogoProps) => {
    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre categoría",
            nombreEntrada: "categoria_nombre",
            valorInicial: "",
            tipoEntrada: "text"
        }
    ]

    return <DialogoCreacionView<CategoriaGuardar> titulo={"Crear categoría"} funcionGuardar={guardar} componentes={tipoEntrada} mostrar={mostrarDialogo} ocultar={alternarDialogo} />
}
