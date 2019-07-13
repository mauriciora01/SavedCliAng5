
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_PLU } from 'app/Models/E_PLU';
import { PLUBuilder } from 'app/Builders/PLU.model.builder';


@Injectable()
export class DetallePedidoService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }

    GetCurrentDetallePedido(): Array<E_PLU> {
        var retrievedObject = sessionStorage.getItem('CurrentDetallePedido');
        var x: Array<E_PLU> = JSON.parse(retrievedObject)
        return x
    }

    ClearCurrentDetallePedido() {
        sessionStorage.removeItem("CurrentDetallePedido")
    }

    SetCurrentDetallePedido(res: any): Array<E_PLU> {

        var SessionDetallePedido: Array<E_PLU> = new Array<E_PLU>()

        SessionDetallePedido = this.GetCurrentDetallePedido();

        if (res != null) {
            if (SessionDetallePedido != null) {

                sessionStorage.removeItem("CurrentDetallePedido")

                //*SessionDetallePedido.push(new PLUBuilder().buildFromObject(res).Build())
                SessionDetallePedido.push(new PLUBuilder().buildFromObject(this.getArticuloxAgrupamiento(res, SessionDetallePedido)).Build())

                sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(SessionDetallePedido))



            }
            else {

                var SessionDetallePedidoIniList: Array<E_PLU> = new Array<E_PLU>()
                SessionDetallePedidoIniList.push(res)

                sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(SessionDetallePedidoIniList))
            }
        }

        return this.GetCurrentDetallePedido();
    }

    getArticuloxAgrupamiento(ArticuloAdicionar: E_PLU, SessionDetallePedidoGr: Array<E_PLU>): E_PLU {

        if (SessionDetallePedidoGr != null) {

            var count = 0

            var x: E_PLU = new E_PLU()
            if (ArticuloAdicionar.CodigoRapido != null && ArticuloAdicionar.CodigoRapido != "") {
                SessionDetallePedidoGr.forEach((element) => {
                    count = count + 1;
                    if (ArticuloAdicionar.CodigoRapido == element.CodigoRapido) {

                        x.Cantidad = element.Cantidad + ArticuloAdicionar.Cantidad;
                        x.PrecioCatalogoTotalConIVA = x.Cantidad * ArticuloAdicionar.PrecioConIVA;

                        x.CodigoRapido = ArticuloAdicionar.CodigoRapido;
                        x.NombreProducto = ArticuloAdicionar.NombreProducto;
                        x.PrecioConIVA = ArticuloAdicionar.PrecioConIVA;
                        //x.PorcentajeDescuento = ArticuloAdicionar.PorcentajeDescuento;
                        x.PrecioEmpresaria = ArticuloAdicionar.PrecioEmpresaria;
                        x.PrecioPuntos = ArticuloAdicionar.PrecioPuntos;
                        x.PLU = ArticuloAdicionar.PLU;

                        //SessionDetallePedidoGr.splice(count, 1);
                        return x

                    }
                    else {

                        x = ArticuloAdicionar;
                    }
                });
            }
        }
        return x
    }
}