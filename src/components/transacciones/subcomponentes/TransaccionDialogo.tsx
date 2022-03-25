import {Transaccion, TransaccionDialogoProps, TransaccionGuardar} from "../Types";
import SubcategoriaStore from "../../subcategoria/SubcategoriaStore";
import CuentasStore from "../../cuentas/CuentasStore";
import {observer} from "mobx-react";
import {TipoEntrada} from "../../comunes/dialogo/Types";
import {DialogoCreacionView} from "../../comunes/dialogo/DialogoCreacionView";

const subcategoriaModelo = new SubcategoriaStore();
const cuentaModelo = new CuentasStore();

export const TransaccionDialogo = observer(({mostrarDialogo, alternarDialogo, guardar, detalle}: TransaccionDialogoProps) => {
    const {listaResultados: subcategorias} = subcategoriaModelo;
    const {resultadosPanel: cuentas} = cuentaModelo;
    let opcionesSubcategoria: JSX.Element[] = [];
    let opcionesCuenta: JSX.Element[] = [];

    opcionesSubcategoria.push(<option defaultChecked>Seleccione una opción</option>);
    opcionesSubcategoria = opcionesSubcategoria.concat(subcategorias?.map(subcategoria => <option value={subcategoria.subcategoriaId}>{subcategoria.nombreCategoria}-{subcategoria.subcategoriaNombre}</option>));

    opcionesCuenta.push(<option defaultChecked>Seleccione una opción</option>);
    opcionesCuenta = opcionesCuenta.concat(cuentas?.map(cuentas => <option value={cuentas.cuentaId}>{cuentas.cuentaNombre}</option>));

    const tipoEntrada: TipoEntrada[] = [
        {
            etiqueta: "Subcategoria",
            nombreEntrada: "subcategoria",
            tipoEntrada: "select",
            valorInicial: 0,
            options: opcionesSubcategoria
        },
        {
            etiqueta: "Cuenta",
            nombreEntrada: "cuenta",
            tipoEntrada: "select",
            valorInicial: 0,
            options: opcionesCuenta
        },
        {
            etiqueta: "Monto",
            nombreEntrada: "cantidad",
            tipoEntrada: "number",
            valorInicial: 0
        }
    ];

    if ( detalle ){
        tipoEntrada.forEach(entrada => entrada['valor'] = detalle[entrada.nombreEntrada as keyof Transaccion] as typeof entrada['valor'] );
        tipoEntrada.push({
            etiqueta: 'id',
            nombreEntrada: 'id',
            tipoEntrada: 'id',
            valorInicial: 0,
            valor: 0
        });
    }

    return <DialogoCreacionView<TransaccionGuardar> funcionGuardar={guardar} componentes={tipoEntrada} titulo={"Crear transacción"} mostrar={mostrarDialogo} ocultar={alternarDialogo} />
});
