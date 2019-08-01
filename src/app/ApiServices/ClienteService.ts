
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { E_Cliente } from '../Models/E_Cliente';
import { ClienteBuilder } from '../Builders/Cliente.model.builder';

import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { SessionEmpresariaBuilder } from 'app/Builders/SessionEmpresaria.model.builder';


@Injectable()
export class ClienteService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;

    /** Copy the text value to the clipboard. */
    ListClienteSVDNxNit(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/ListClienteSVDNxNit"
            , request, httpOptions).map(this.ExtractCliente)
    }

    ListEstadoxNit(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/ListEstadoxNit"
            , request, httpOptions).map(this.ExtractCliente)
    }

    CrearUsuarioyClave(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/CrearUsuarioyClave"
            , request, httpOptions).map(this.ExtractCliente)
    }


    ListEmpresariasxGerenteSimple(obj: E_Cliente): Observable<Array<E_Cliente>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/ListEmpresariasxGerenteSimple"
            , request, httpOptions).map(this.ExtractClienteList)
    }


    RegistrarEmpresaria(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/RegistrarEmpresaria"
            , request, httpOptions).map(this.ExtractCliente)
    }

    //MRG: Carga la empresaria buscada en session con los parametros para hacer pedidos.
    ValidaExisteEmpresariaNombre(obj: E_Cliente): Observable<E_SessionEmpresaria> {
        
        const httpOptions = this.HeaderBuilder.HeadNow()
         var request = JSON.stringify(obj)
         return this.Http.post(this.UrlNow + "Cliente/ValidaExisteEmpresariaNombre"
             , request, httpOptions).map(this.ExtractDataSessionEmpresariaValid)
            
     }


     CargarDireccionTelefono(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/CargarDireccionTelefono"
            , request, httpOptions).map(this.ExtractCliente)
    }

    ValidarTipoEnvioPedido(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/ValidarTipoEnvioPedido"
            , request, httpOptions).map(this.ExtractCliente)
    }


    ActualizarDireccionTelefono(obj: E_Cliente): Observable<E_Cliente> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Cliente/ActualizarDireccionTelefono"
            , request, httpOptions).map(this.ExtractCliente)
    }
 

    ExtractCliente(res: Response): E_Cliente {
        var x: E_Cliente = new E_Cliente()
        if (res != null) { x = new ClienteBuilder().buildFromObject(res).Build() }
        return x
    }

    ExtractClienteList(res: any): Array<E_Cliente> {
        var x: Array<E_Cliente> = new Array<E_Cliente>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ClienteBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

    ExtractDataSessionEmpresariaValid(res: object): E_SessionEmpresaria {
        
        var x: E_SessionEmpresaria = new E_SessionEmpresaria()

        if (res != null) { x = new SessionEmpresariaBuilder().buildFromObject(res).Build() }
        if (x.Error != undefined) {
            if (x.Error.Id == 1) {
                sessionStorage.removeItem("CurrentEmpresaria")
                return x
            }
        }
        sessionStorage.setItem("CurrentEmpresaria", JSON.stringify(x))
      
        return x
    }
}