import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { E_PLU } from 'app/Models/E_PLU';
import { E_Bodegas } from 'app/Models/E_Bodegas';


export interface State {
    flag: string;
    name: string;
    population: string;
}

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
    public CodigoRapidoSeleccionado: string = "";
    public TipoEnvioSeleccionado: string = "";
    public CodCiudadDespacho: string = "";
    NumeroDocumento: string;
    public ListCatalogo: Array<E_Catalogo> = new Array<E_Catalogo>();
    //*public ListBodega: Array<E_Catalogo> = new Array<E_Catalogo>();
    formErrors: any;
    CatalogoDisabled: boolean = false;
    BodegaDisabled: boolean = false;
    NombreDisabled: boolean = false;
    Paso1Ok: boolean = false;
    Paso2Ok: boolean = false;
    public NombreEmpresariaCompleto: string;
    public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()

    public CampanaSeleccionado: string = "";

    public ValorFleteCobrar: number = 0;
    /*public ListBodega: Array<Object> = [
        { Codigo: "51", Nombre: 'BODEGA 51' },
        { Codigo: "PKG", Nombre: 'BODEGA PICKING' },
    ];*/

    public ListBodega: Array<E_Bodegas> = new Array<E_Bodegas>()

    CodigoRapido = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    constructor(private _formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        private ExceptionErrorService: ExceptionErrorService,
        private ClienteService: ClienteService,
        private bottomSheet: MatBottomSheet,
        public dialog: MatDialog) {

        this.formErrors = {
            Campana : {},
            Catalogo: {},
            NumeroDocumento: {},
            Bodega: {},
        };

        sessionStorage.removeItem("CurrentEmpresaria")
    }

    //MRG: POR AQUI SIEMPRE ENTRA SIN NECESIDAD DE ADICIONAR ARTICULO TBN CAMBIAR CODIGO DE DETALLE ARTICULO MISMO METODO openBottomSheet().
    openBottomSheet(): void {

        //alert('openbottonsheet:'+this.ValorFleteCobrar)
        //this.bottomSheet.open(DetallePedidoComponent);

        this.bottomSheet.open(DetallePedidoComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho, ValorFleteCobrar: this.ValorFleteCobrar }
        });
    }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required],
            Catalogo: [undefined, [Validators.required]],
            NumeroDocumento: [undefined, [Validators.required]],
            Bodega: [undefined, [Validators.required]],
            DatosEnvio: [undefined, [Validators.required]],
            Campana: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({

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

        this.filteredOptions = this.CodigoRapido.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );

        if (this.SessionUser.IdGrupo == "50") {
            this.NumeroDocumento = this.SessionUser.Cedula;
            this.ValidateDocument2();
        }


        this.CampanaSeleccionado = "CAMPAÑA: "+ this.SessionUser.Campana;


    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    SelectedCatalogo(y) {

    }

    SelectedBodega(y) {

    }

    ValidateDocument2() {
        try {

            this.NombreEmpresariaCompleto = "";
            this.NombreDisabled = false;

            //var okDoc = this.pc_verificar(this.form.value.NumeroDocumento)
            //console.log('okDoc:' + okDoc)
            if (true) {

                var objClienteResquest: E_Cliente = new E_Cliente()
                objClienteResquest.Nit = this.NumeroDocumento;

                this.ClienteService.ValidaExisteEmpresariaNombre(objClienteResquest).subscribe((x: E_SessionEmpresaria) => {

                    if (x.Error == undefined) {
                        this.NombreDisabled = true;
                        this.Paso1Ok = true;
                        this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow()
                        this.NombreEmpresariaCompleto = this.SessionEmpresaria.NombreEmpresariaCompleto;
                        this.ListBodega.push(this.SessionEmpresaria.Bodegas);
                    }
                    else {
                        this.NombreDisabled = false;
                        this.Paso1Ok = false;
                        this.DatosEnvioSeleccionado = "";
                        this.TipoEnvioSeleccionado = "";

                        this.firstFormGroup = this._formBuilder.group({
                            firstCtrl: ['', Validators.required],
                            Catalogo: [undefined, [Validators.required]],
                            NumeroDocumento: [undefined, [Validators.required]],
                            Bodega: [undefined, [Validators.required]],
                            DatosEnvio: [undefined, [Validators.required]],
                            Campana: ['', Validators.required]
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
    //validar documento con formato de Ecuador correcto.
    ValidateDocument() {
        try {

            //Se borra acumulado de pedido.
            sessionStorage.removeItem("CurrentDetallePedido");

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
                            this.ListBodega.push(this.SessionEmpresaria.Bodegas);


                        }
                        else {
                            this.NombreDisabled = false;
                            this.Paso1Ok = false;
                            this.DatosEnvioSeleccionado = "";
                            this.TipoEnvioSeleccionado = "";

                            this.firstFormGroup = this._formBuilder.group({
                                firstCtrl: ['', Validators.required],
                                Catalogo: [undefined, [Validators.required]],
                                NumeroDocumento: [undefined, [Validators.required]],
                                Bodega: [undefined, [Validators.required]],
                                DatosEnvio: [undefined, [Validators.required]],
                                Campana: ['', Validators.required]
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
        this.DatosEnvioSeleccionado = "";
        this.TipoEnvioSeleccionado = "";
        this.CodCiudadDespacho = "";

        //Si se encuentra la empresaria se abre la ventana, sino no se puede abrir.
        if (this.NombreEmpresariaCompleto != undefined && this.NombreEmpresariaCompleto != "") {
            const dialogRef = this.dialog.open(DatosEnvioComponent, {
                panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.

                data: { Nit: this.firstFormGroup.value.NumeroDocumento, Zona: this.SessionUser.IdZona, EmpresariaLider: this.SessionEmpresaria.Empresaria_Lider, TipoMensaje: "Error", Titulo: "Datos Envio", Mensaje: "Seleccione el metodo de envio." }
            });

            dialogRef.afterClosed().subscribe((result) => {

                this.DatosEnvioSeleccionado = result[0].DireccionEnvio;
                this.TipoEnvioSeleccionado = result[0].IdTipoEnvio;
                this.CodCiudadDespacho = result[0].CodCiudadDespacho;
                this.ValorFleteCobrar = result[0].ValorFleteCobrar;
            });

        }
    }

    openAdicionarArticulo(): void {

        if (this.CodigoRapido.value != '' && this.CodigoRapido.value != undefined && this.CodigoRapido.value != null) {
            this.Paso2Ok = true;

            var objPLU: E_PLU = new E_PLU()
            objPLU.CodigoRapido = this.CodigoRapido.value;
            objPLU.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();

            this.ParameterService.ListarxCodigoRapido(objPLU)
                .subscribe((x: E_PLU) => {

                    if (x.Error == undefined) {
                        //Mensaje de OK
                        //console.log(x)
                        var strDisponible = "NO";
                        if (x.Disponible == true) {
                            strDisponible = "SI";
                        }
                        var NombreProductoP = x.NombreProducto + ", " + x.NombreColor + ", " + x.NombreTalla;

                        var rndImg = Math.floor(Math.random() * 11);
                        //var NombreImg = "blusanivi" + rndImg + ".PNG";

                        var NombreImg = x.Imagen;

                        if (NombreImg == undefined || NombreImg == "" || NombreImg == null) {
                            NombreImg = "noimagen.png"
                        }
                        else{
                            NombreImg = x.Imagen.toLowerCase();
                        }

                        const dialogRef = this.dialog.open(DetalleArticuloComponent, {
                            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
                            data: {



                                CodigoRapido: this.CodigoRapido.value, NombreProductoCompleto: NombreProductoP,
                                NombreProd: x.NombreProducto, Color: x.NombreColor, Talla: x.NombreTalla, ValorUnitario: x.PrecioTotalConIVA,
                                NombreImagen: NombreImg, PLU: x.PLU, TipoMensaje: "Error", Titulo: "Detalle Articulo",
                                Mensaje: "Seleccione los detalles del articulo.", PorcentajeDescuento: x.PorcentajeDescuento,
                                PrecioPuntos: x.PrecioPuntos, Disponible: strDisponible, PrecioEmpresaria: x.PrecioEmpresaria,
                                TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho,
                                PrecioCatalogoSinIVA: x.PrecioCatalogoSinIVA, PrecioEmpresariaSinIVA: x.PrecioEmpresariaSinIVA,
                                IVAPrecioCatalogo: x.IVAPrecioCatalogo, IVAPrecioEmpresaria: x.IVAPrecioEmpresaria, PorcentajeIVA: x.PorcentajeIVA,
                                ExcentoIVA: x.ExcentoIVA, PuntosGanados: x.PuntosGanados, ValorFleteCobrar: this.ValorFleteCobrar

                            }
                        });

                        dialogRef.afterClosed().subscribe(result => {

                            //this.DatosEnvioSeleccionado = result; 
                            this.CodigoRapidoSeleccionado="";
                        });


                    }
                    else {
                        //---------------------------------------------------------------------------------------------------------------
                        //Mensaje de Error. 

                        const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            width: '450px',
                            data: { TipoMensaje: "Error", Titulo: "Buscar Articulo", Mensaje: "No se encontro articulo con el codigo rapido seleccionado. Por favor verifique." }
                        });

                        //throw new ErrorLogExcepcion("DetalleArticuloComponent", "constructor()", "No se encontro articulo. Codigo Rapido: " + data.CodigoRapido, this.SessionUser.Cedula, this.ExceptionErrorService)
                        //---------------------------------------------------------------------------------------------------------------
                    }

                    //Para que ponga por defecto el que trae sin poderlo modificar.
                    //this.ProvinciaSeleccionado = x[0].CodEstado;
                })





        }
        else {

            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error. 

            const dialogRef = this.dialog.open(ModalPopUpComponent, {
                width: '450px',
                data: { TipoMensaje: "Error", Titulo: "Buscar Articulo", Mensaje: "Debe ingresar un codigo rapido." }
            });

            //throw new ErrorLogExcepcion("DetalleArticuloComponent", "constructor()", "No se encontro articulo. Codigo Rapido: " + data.CodigoRapido, this.SessionUser.Cedula, this.ExceptionErrorService)
            //---------------------------------------------------------------------------
        }

    }

    openVerDetallePedido(): void {
        const dialogRef = this.dialog.open(DetallePedidoComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", TipoEnvio: this.TipoEnvioSeleccionado, CodCiudadDespacho: this.CodCiudadDespacho }
        });

        dialogRef.afterClosed().subscribe(result => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }

    openVerResumenPedido(): void {
        const dialogRef = this.dialog.open(ResumenPedidoComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Resumen Pedido", Mensaje: "Resumen del Pedido."  }
        });

        dialogRef.afterClosed().subscribe(result => {

            //this.DatosEnvioSeleccionado = result; 
        });

    }


    changeIdCorto(): void {
        alert('sdsd')
        this.Paso2Ok = true;
    }

    buscarDocumento(): void {
        true;
    }
}
