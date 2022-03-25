import {SubcategoriaDialogoProps, SubcategoriaGuardar} from "../Types";
import {TipoEntrada} from "../../comunes/dialogo/Types";
import {DialogoCreacionView} from "../../comunes/dialogo/DialogoCreacionView";
import {observer} from "mobx-react";

export const SubcategoriaDialogo = observer(({mostrarDialogo, alternarDialogo, guardar, categoriaStore}:SubcategoriaDialogoProps) => {
    let opciones: JSX.Element[] = [];
    const {listaResultados:categorias} = categoriaStore;

    opciones.push(<option defaultChecked>Seleccione una opción</option>);
    const opcionesCategoria = categorias?.map(categoria => <option value={categoria.categoriaId}>{categoria.categoriaNombre}</option>);
    opciones = opciones.concat(opcionesCategoria);

    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Nombre subcategoría",
            tipoEntrada: "text",
            valorInicial: "",
            nombreEntrada: "subcategoriaNombre"
        },
        {
            etiqueta: "Categoría",
            tipoEntrada: 'selector',
            valorInicial: "",
            nombreEntrada: "subcategoriaCategoria",
            options: opciones,
            servicio: categoriaStore
        }
    ];


    return <DialogoCreacionView<SubcategoriaGuardar> ocultar={alternarDialogo} mostrar={mostrarDialogo} componentes={tipoEntrada} funcionGuardar={guardar} titulo={"Crear subcategoria"}/>
});
