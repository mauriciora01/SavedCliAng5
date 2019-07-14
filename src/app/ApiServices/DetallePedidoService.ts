
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

    EliminarItemPedido(item:E_PLU):boolean{
        var retrievedObject = sessionStorage.getItem('CurrentDetallePedido');
        var x: Array<E_PLU> = JSON.parse(retrievedObject)
        x.splice(x.indexOf(item), 1);
        this.ClearCurrentDetallePedido();
        sessionStorage.setItem("CurrentDetallePedido", JSON.stringify(x))
        return true;
    }

    SetCurrentDetallePedido(res: any): Array<E_PLU> {
        debugger;
        var SessionDetallePedido: Array<E_PLU> = new Array<E_PLU>()

        SessionDetallePedido = this.GetCurrentDetallePedido();

        if (res != null) {
            if (SessionDetallePedido != null) {

                sessionStorage.removeItem("CurrentDetallePedido")
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

    getArticuloxAgrupamiento(ArticuloAdicionar: E_PLU, SessionDetallePedidoGr: Array<E_PLU>): Array<E_PLU> {
        debugger;
        if (SessionDetallePedidoGr != null) {

            var count = 0

            var nuevo: E_PLU = new E_PLU()
            var viejo: E_PLU = new E_PLU()
            if (ArticuloAdicionar.CodigoRapido != null && ArticuloAdicionar.CodigoRapido != "") {
                var objeto =  SessionDetallePedidoGr.find(x => x.CodigoRapido == ArticuloAdicionar.CodigoRapido);
                if(objeto==null){
                    SessionDetallePedidoGr.push(ArticuloAdicionar);
                }else{
                    SessionDetallePedidoGr.forEach((element) => {
                        debugger;
                        count = count + 1;
                        if (ArticuloAdicionar.CodigoRapido == element.CodigoRapido) {
    
                            nuevo.Cantidad = element.Cantidad + ArticuloAdicionar.Cantidad;
                            nuevo.PrecioCatalogoTotalConIVA = nuevo.Cantidad * ArticuloAdicionar.PrecioConIVA;
    
                            nuevo.CodigoRapido = ArticuloAdicionar.CodigoRapido;
                            nuevo.NombreProducto = ArticuloAdicionar.NombreProducto;
                            nuevo.PrecioConIVA = ArticuloAdicionar.PrecioConIVA;
                            nuevo.PorcentajeDescuento = ArticuloAdicionar.PorcentajeDescuento;
                            nuevo.PrecioEmpresaria = ArticuloAdicionar.PrecioEmpresaria;
                            nuevo.PrecioPuntos = ArticuloAdicionar.PrecioPuntos;
                            nuevo.PLU = ArticuloAdicionar.PLU;


                            viejo.Cantidad = element.Cantidad;
                            viejo.PrecioCatalogoTotalConIVA = element.Cantidad;    
                            viejo.CodigoRapido = element.CodigoRapido;
                            viejo.NombreProducto = element.NombreProducto;
                            viejo.PrecioConIVA = element.PrecioConIVA;
                            viejo.PorcentajeDescuento = element.PorcentajeDescuento;
                            viejo.PrecioEmpresaria = element.PrecioEmpresaria;
                            viejo.PrecioPuntos = element.PrecioPuntos;
                            viejo.PLU = element.PLU;
                            return false;
                        }                        
                    });
                    SessionDetallePedidoGr.splice(SessionDetallePedidoGr.indexOf(viejo), 1);
                    SessionDetallePedidoGr.push(nuevo);
                }
              
                return SessionDetallePedidoGr;
            }
        }
        return SessionDetallePedidoGr;
    }
}