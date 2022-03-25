import {IServicioConsulta} from "../formulario/Selector";

export type DialogoViewProps = {
    titulo: string,
    mostrar: boolean,
    ocultar: () => void,
    children?: React.ReactNode
}

export type DialogoCreacionViewProps<T> = DialogoViewProps & {
    componentes: TipoEntrada[],
    funcionGuardar: (guardar: T) => void;
}

export type DialogoDetalleViewProps = DialogoViewProps & {
    columnas: string[],
    info: string[][]
}

export type TipoEntrada = {
    etiqueta: string,
    nombreEntrada: string,
    valorInicial: 0 | '' | false ,
    valor?: number | string | boolean,
    tipoEntrada: TiposComponente,
    options?: JSX.Element[],
    servicio?: IServicioConsulta
}


export type TiposComponente = 'select' | 'text' | 'number' | 'checkbox' | 'id' | 'selector';
