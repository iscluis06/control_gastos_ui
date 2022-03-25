import {BalanceStore} from "../balance/BalanceStore";
import {CategoriaStore} from "../categoria/CategoriaStore";
import CuentasStore from "../cuentas/CuentasStore";
import DetalleTransaccionStore from "../detalle_transaccion/DetalleTransaccionStore";
import SubcategoriaStore from "../subcategoria/SubcategoriaStore";
import {TransaccionesStore} from "../transacciones/TransaccionesStore";

export class PanelControlStore{
    balanceStore: BalanceStore;
    categoriaStore: CategoriaStore;
    cuentasStore: CuentasStore;
    subcategoriaStore: SubcategoriaStore;
    transaccionesStore: TransaccionesStore;

    constructor() {
        this.balanceStore = new BalanceStore();
        this.categoriaStore = new CategoriaStore();
        this.cuentasStore = new CuentasStore();
        this.subcategoriaStore = new SubcategoriaStore();
        this.transaccionesStore = new TransaccionesStore();

        this.cuentasStore.observador.registrarObservador(this.balanceStore);
    }
}
