import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from 'app/ApiServices/UserService';
import { E_Catalogo } from 'app/Models/E_Catalogo';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { DatosEnvioComponent } from '../DatosEnvio/datosenvio.component';
import { DetalleArticuloComponent } from '../DetalleArticulo/detallearticulo.component';
import { DetallePedidoComponent } from '../DetallePedido/detallepedido.component';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'pedidosprincipal',
    templateUrl: 'pedidosprincipal.component.html',
    styleUrls: ['pedidosprincipal.component.css']

})
export class PedidosPrincipalComponent implements OnInit {
    isLinear = true;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirtyFormGroup: FormGroup;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public CatalogoSeleccionado: string = "";
    public BodegaSeleccionado: string = "";
    public DatosEnvioSeleccionado: string = "";
    public CodigoRapidoSeleccionado: string = "BL98765";


    public ListCatalogo: Array<E_Catalogo> = new Array<E_Catalogo>();
    //*public ListBodega: Array<E_Catalogo> = new Array<E_Catalogo>();
    formErrors: any;
    CatalogoDisabled: boolean = false;
    BodegaDisabled: boolean = false;
    NombreDisabled: boolean = false;
    Paso1Ok: boolean = false;
    public NombreEmpresariaCompleto: string;
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()


    public ListBodega: Array<Object> = [
        { Codigo: "51", Nombre: 'BODEGA 51' },
        { Codigo: "PKG", Nombre: 'BODEGA PICKING' },
    ];


    constructor(private _formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        private ExceptionErrorService: ExceptionErrorService,
        private ClienteService: ClienteService,
        private bottomSheet: MatBottomSheet,
        public dialog: MatDialog) {

        this.formErrors = {

            Catalogo: {},
            NumeroDocumento: {},
            Bodega: {},
        };


        sessionStorage.removeItem("CurrentEmpresaria")
    }

    openBottomSheet(): void {
        this.bottomSheet.open(DetallePedidoComponent);
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            Catalogo: [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            Bodega: [undefined, [Validators.required]],
            DatosEnvio: [undefined, [Validators.required]]
        });
        this.secondFormGroup = this._formBuilder.group({
            CodigoRapido: ['', Validators.required]

        });
        this.thirtyFormGroup = this._formBuilder.group({

        });

        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()

        this.ParameterService.listarCatalogo(this.SessionUser)
            .subscribe((x: Array<E_Catalogo>) => {
                this.ListCatalogo = x
                if (x[0].Error != undefined) {

                    this.CatalogoDisabled = true;
                    //---------------------------------------------------------------------------------------------------------------
                    //Mensaje de Error. 
                    const dialogRef = this.dialog.open(ModalPopUpComponent, {
                        width: '450px',
                        data: { TipoMensaje: "Error", Titulo: "Crear Pedido", Mensaje: "No se pueden crear pedidos en este periodo. El catalogo no ha sido habilitado." }
                    });

                    //TODO:MRG: Produce un error  at new ErrorLogExcepcion pero si guarda en la BD. Corregir
                    //TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them at Function.invokeGetter (<anonymous>:2:14)
                    throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ngOnInit()+listarCatalogo()", x[0].Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)

                    //---------------------------------------------------------------------------------------------------------------
                }
            })


    }

    SelectedCatalogo(y) {

    }

    SelectedBodega(y) {

    }


    //validar documento con formato de Ecuador correcto.
    ValidateDocument() {
        try {

            this.NombreEmpresariaCompleto = "";
            this.NombreDisabled = false;

            if (this.firstFormGroup.value.NumeroDocumento != '' && this.firstFormGroup.value.NumeroDocumento != undefined) {
                //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
                //console.log('okDoc:' + okDoc)
                if (true) {

                    var objClienteResquest: E_Cliente = new E_Cliente()
                    objClienteResquest.Nit = this.firstFormGroup.value.NumeroDocumento;

                    this.ClienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {

                        if (x.Error == undefined) {
                            this.NombreDisabled = true;
                            this.Paso1Ok = true;
                            this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow()
                            this.NombreEmpresariaCompleto = this.SessionEmpresaria.NombreEmpresariaCompleto;
                        }
                        else {
                            this.NombreDisabled = false;
                            this.Paso1Ok = false;
                            this.DatosEnvioSeleccionado = "";

                            this.firstFormGroup = this._formBuilder.group({
                                firstCtrl: ['', Validators.required],
                                Catalogo: [undefined, [Validators.required]],
                                NumeroDocumento: [undefined, [Validators.required]],
                                Bodega: [undefined, [Validators.required]],
                                DatosEnvio: [undefined, [Validators.required]]
                            });
                            //---------------------------------------------------------------------------------------------------------------
                            //Mensaje de Error. 
                            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                                width: '450px',
                                data: { TipoMensaje: "Error", Titulo: "Empresaria", Mensaje: "La empresaria no existe. Por favor verifique." }
                            });

                            throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
                            //---------------------------------------------------------------------------------------------------------------

                        }

                    })

                }
            }

        }
        catch (error) {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error.  
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Empresaria", Mensaje: "No se pudo validar la empresaria." }
            });

            throw new ErrorLogExcepcion("PedidosPrincipalComponent", "ValidateDocument()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService)

            //---------------------------------------------------------------------------------------------------------------
        }
    }

    openDatosEnvio(): void {
        this.DatosEnvioSeleccionado="";

        //Si se encuentra la empresaria se abre la ventana, sino no se puede abrir.
        if (this.NombreEmpresariaCompleto!= undefined && this.NombreEmpresariaCompleto != "") {
            const dialogRef = this.dialog.open(DatosEnvioComponent, {
                panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.

                data: { Nit: this.firstFormGroup.value.NumeroDocumento, Zona: this.SessionUser.IdZona, EmpresariaLider: this.SessionEmpresaria.Empresaria_Lider, TipoMensaje: "Error", Titulo: "Datos Envio", Mensaje: "Seleccione el metodo de envio." }
            });

            dialogRef.afterClosed().subscribe(result => {

                this.DatosEnvioSeleccionado = result;
            });
        }
    }

    openAdicionarArticulo(): void {
        const dialogRef = this.dialog.open(DetalleArticuloComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Articulo", Mensaje: "Seleccione los detalles del articulo." }
        });

        dialogRef.afterClosed().subscribe(result => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }

    openVerDetallePedido(): void {
        const dialogRef = this.dialog.open(DetallePedidoComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido." }
        });

        dialogRef.afterClosed().subscribe(result => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }

    openVerResumenPedido(): void {
        const dialogRef = this.dialog.open(ResumenPedidoComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Resumen Pedido", Mensaje: "Resumen del Pedido." }
        });

        dialogRef.afterClosed().subscribe(result => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }
}
