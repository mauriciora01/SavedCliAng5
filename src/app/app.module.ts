import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';

import { UserService } from './ApiServices/UserService';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { ParameterService } from './ApiServices/ParametersServices';
import { ClienteService } from './ApiServices/ClienteService';
import { CxCService } from './ApiServices/CxCService';
import { UbicacionGeneralModule } from './main/content/Ubicacion/UbicacionGeneral/ubicaciongeneral.module';
import { PrincipalModule } from './main/content/Principal/principal.module';
import { RegistroEmpresariaEcModule } from './main/content/RegistroEmpresariaEc/registroempresariaec.module';
import { MisEmpresariasModule } from './main/content/MisEmpresarias/misempresarias.module';
import { ModalPopUpModule } from './main/content/ModalPopUp/modalpopup.module';
import { DatosEnvioModule } from './main/content/DatosEnvio/datosenvio.module';
import { ExceptionErrorService } from './ApiServices/ExceptionErrorService';

//MRG: Agregar modulos de funcionalidad aqui y en .module de cada componente.
import { CdkTableModule } from '@angular/cdk/table';

//MRG: Google Maps
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction'; // agm-direction

import {
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
    MatSortModule, MatTableModule
} from "@angular/material";
import { MisEmpresariasComponent } from './main/content/MisEmpresarias/misempresarias.component';
import { DetalleClienteModule } from './main/content/DetalleCliente/detallecliente.module';
import { detallepfactuModule } from './main/content/detallepfactu/detallepfactu.module';
import { PedidosPrincipalModule } from './main/content/PedidosPrincipal/pedidosprincipal.module';
import { DetalleArticuloModule } from './main/content/DetalleArticulo/detallearticulo.module';
import { DetallePedidoModule } from './main/content/DetallePedido/detallepedido.module';
import { ResumenPedidoModule } from './main/content/ResumenPedido/resumenpedido.module';

import { DetallePedidoService } from './ApiServices/DetallePedidoService';
import { PedidoService } from './ApiServices/PedidoService';
import { MisPedidosModule } from './main/content/MisPedidos/mispedidos.module';
import { pedidosfacturadosModule } from './main/content/pedidosfacturados/pedidosfacturados.module';
import { PerfilModule } from './main/content/perfil/perfil.module';
import { micarteraModule } from './main/content/micartera/micartera.module';

import { ModalPopUpPedidoModule } from './main/content/ModalPopUpPedido/modalpopuppedido.module';
import { DetallePedidoReservaModule } from './main/content/DetallePedidoReserva/detallepedidoreserva.module';

const appRoutes: Routes = [
    /*{
        path      : '**',
        redirectTo: 'sample'


    }*/

    { path: 'principal', redirectTo: '/principal', pathMatch: 'full' },
    { path: 'ubicaciongeneral', redirectTo: '/ubicaciongeneral', pathMatch: 'full' },
    { path: 'registroempresariaec', redirectTo: '/registroempresariaec', pathMatch: 'full' },
    { path: 'misempresarias', redirectTo: '/misempresarias', pathMatch: 'full' },
    { path: 'pedidosprincipal', redirectTo: '/pedidosprincipal', pathMatch: 'full' },
    { path: 'modalpopup', redirectTo: '/modalpopup', pathMatch: 'full' },
    { path: 'mispedidos', redirectTo: '/mispedidos', pathMatch: 'full' },
    { path: 'pedidosfacturados', redirectTo: '/pedidosfacturados', pathMatch: 'full' },
    { path: 'perfil', redirectTo: '/perfil', pathMatch: 'full'},
    { path: 'micartera', redirectTo: '/micartera', pathMatch: 'full' },
    { path: 'modalpopuppedido', redirectTo: '/modalpopuppedido', pathMatch: 'full' },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },


];

@NgModule({
    declarations: [
        AppComponent,
        //MispedidosFactuComponent
        //MisEmpresariasComponent,
        //MisEmpresariasModule,

    ],
    exports: [RouterModule],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,

        CdkTableModule,


        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
        LoginModule,
        UbicacionGeneralModule,
        PrincipalModule,
        RegistroEmpresariaEcModule,
        MisEmpresariasModule,
        ModalPopUpModule,
        DatosEnvioModule,
        DetalleArticuloModule,
        DetalleClienteModule,
        PedidosPrincipalModule,
        DetallePedidoModule,
        ResumenPedidoModule,
        MisPedidosModule,
        pedidosfacturadosModule,
        PerfilModule,
        detallepfactuModule,
        micarteraModule,
        ModalPopUpPedidoModule,

        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        //MisEmpresariasComponent
        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        AgmCoreModule.forRoot({
            apiKey: ''

          }),
          AgmDirectionModule, //agm-direction

          DetallePedidoReservaModule

    ],
    providers: [
        UserService,
        ParameterService,
        HeaderBuilder,
        ClienteService,
        ExceptionErrorService,
        DetallePedidoService,
        PedidoService,
        CxCService

    ]
    ,
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
