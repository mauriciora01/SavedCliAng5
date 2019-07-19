import { Component, Inject, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { SelectionModel } from '@angular/cdk/collections';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_PLU } from 'app/Models/E_PLU';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ModalPopUpComponent } from '../ModalPopUp/modalpopup.component';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { ErrorLogExcepcion } from 'app/Models/ErrorLogExcepcion';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { PLUBuilder } from 'app/Builders/PLU.model.builder';
import { E_PedidosDetalleCliente } from 'app/Models/E_PedidosDetalleCliente';
import { PedidosDetalleClienteBuilder } from 'app/Builders/PedidosDetalleCliente.model.builder';
import { PedidosClienteBuilder } from 'app/Builders/PedidosCliente.model.builder';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_Error } from 'app/Models/E_Error';
import { RenderDeleteComponent } from './render-delete/render-delete.component';


const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

//const ELEMENT_DATA_PLU: ListElementArticulo[] =  [];
/*[
  { Cantidad: '1', PrecioCatalogoTotalConIVA: '4', CodigoRapido: '7', NombreProducto: '10', PrecioConIVA:'13', PorcentajeDescuento:'16',  PrecioEmpre:'19', PrecioPuntos:'22'},
  { Cantidad: '2', PrecioCatalogoTotalConIVA: '5', CodigoRapido: '8', NombreProducto: '11', PrecioConIVA:'14', PorcentajeDescuento:'17',  PrecioEmpre:'20', PrecioPuntos:'23'},
  { Cantidad: '3', PrecioCatalogoTotalConIVA: '6', CodigoRapido: '9', NombreProducto: '12', PrecioConIVA:'15', PorcentajeDescuento:'18',  PrecioEmpre:'21', PrecioPuntos:'24'},
  
];*/



/*
[
  { Cantidad: '', PrecioCatalogoTotalConIVA: '', CodigoRapido: '', NombreProducto: '', PrecioConIVA:'', PorcentajeDescuento:'',  PrecioEmpre:'', PrecioPuntos:''},
  
];*/

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ListElementArticulo {
  Cantidad: string;
  PrecioCatalogoTotalConIVA: string;
  CodigoRapido: string;
  NombreProducto: string;
  PrecioConIVA: string;
  PorcentajeDescuento: string;
  PrecioEmpre: string;
  PrecioPuntos: string;
}


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  TipoEnvio: string;
  CodCiudadDespacho: string;
}

@Component({
  selector: 'detallepedido',
  templateUrl: 'detallepedido.component.html',
  styleUrls: ['detallepedido.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DetallePedidoComponent implements OnInit {
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  // const ELEMENT_DATA_PLU = this.DetallePedidoService.GetCurrentDetallePedido();
  displayedColumns =
    ['select', 'CodigoRapido', 'NombreProducto', 'Cantidad', 'PrecioCatalogoTotalConIVA',
      'PrecioConIVA', 'PorcentajeDescuento', 'PrecioPuntos', 'star'];
  //['select', 'name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
  //dataSource = ELEMENT_DATA;
  dataSource = this.DetallePedidoService.GetCurrentDetallePedido();;



  //*displayedColumns = ['Documento', 'NombreCompleto', 'NombreCompleto1', 'NombreCompleto2', 'NombreCompleto3','Ciudad'];
  //*dataSource: MatTableDataSource<E_Cliente>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  public SessionUser: E_SessionUser = new E_SessionUser()
  public SessionEmpresaria: E_SessionEmpresaria = new E_SessionEmpresaria()
  public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()

  TextColor: any
  form: FormGroup;

  //public data: DialogData[];

  public Cantidad: number = 1;
  public PrecioCatalogoTotalConIVA: number = 0;
  public CantidadArticulos: number = 0;
  public TotalPagar: number = 0;
  public PuntosUsar: number = 0;
  public PrecioEmpresariaTotalConIVA: number = 0;
  public PrecioPuntosTotal: number = 0;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowData: Array<E_PLU> = new Array<E_PLU>();

  constructor(private formBuilder: FormBuilder,
    private UserService: UserService,
    private ClienteService: ClienteService,
    private DetallePedidoService: DetallePedidoService,
    private bottomSheetRef: MatBottomSheetRef<DetallePedidoComponent>,
    private Matdialog: MatDialog,
    public dialog: MatDialog,
    private ExceptionErrorService: ExceptionErrorService,
    private PedidoService: PedidoService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
  ) {
    this.columnDefs = [
      {
        headerName: 'Eliminar', width: 80, field: 'Modificar', cellRendererFramework: RenderDeleteComponent,
        cellRendererParams: { action: this.clickAuction }
      },
      { headerName: 'Cod Rapido', width: 80, field: 'CodigoRapido' },
      { headerName: 'Nombre', field: 'NombreProducto', sortable: true, filter: true },
      { headerName: 'Cantidad', width: 60, field: 'Cantidad' },
      { headerName: 'Prec Emp', width: 80, field: 'PrecioEmpresaria' },
      { headerName: 'Prec Cat', width: 80, field: 'PrecioConIVA' },
      { headerName: '% Descuento', width: 80, field: 'PorcentajeDescuento' },
      { headerName: 'Prec Puntos', width: 90, field: 'PrecioPuntos' }

    ];


  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.DetallePedidoService.GetCurrentDetallePedido();;
    /*params.api.sizeColumnsToFit();

    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });*/
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }






  clickAuction(para) {
  }

  public cargarDatos() {
    this.rowData = this.DetallePedidoService.GetCurrentDetallePedido();;
  }

  ngOnInit() {

    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/
    this.rowData = this.DetallePedidoService.GetCurrentDetallePedido();;
    this.form = this.formBuilder.group({
      Cantidad: [undefined, [Validators.required]],


    });

  }

  //selection = new SelectionModel<PeriodicElement>(true, []);
  selection = new SelectionModel<E_PLU>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.forEach(row => this.selection.select(row));
  }

  onClose(): void {
    this.bottomSheetRef.dismiss();
  }



  openVerResumenPedido(): void {

    this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow();
    this.CalcularTotales();
    const dialogRef = this.dialog.open(ResumenPedidoComponent, {
      panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
      data: {
        TipoMensaje: "Error", Titulo: "Resumen Pedido", Mensaje: "Resumen del Pedido.",
        Nit: this.SessionEmpresaria.DocumentoEmpresaria.trim(), NombreEmpresaria: this.SessionEmpresaria.NombreEmpresariaCompleto.trim(),
        TotalPrecioCatalogo: this.PrecioCatalogoTotalConIVA, CantidadArticulos: this.CantidadArticulos,
        TotalPagar: this.PrecioEmpresariaTotalConIVA, TusPuntos: this.SessionEmpresaria.PuntosEmpresaria, ValorPuntos: this.SessionEmpresaria.ValorPuntos,
        PrecioEmpresariaTotal: this.PrecioEmpresariaTotalConIVA, PrecioPuntosTotal: this.PrecioPuntosTotal

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != -1 && result != undefined) {
        this.PuntosUsar = result;
        console.log('pts:' + this.PuntosUsar)
        this.CrearPedido();
      }
    });

  }

  ConfirmDataEliminar() {
    this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de eliminar los articulos seleccionados?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) { this.EliminarArticulos() }
      this.confirmDialogRef = null;
    });
  }

  EliminarArticulos() {
    this.DetallePedidoService.ClearCurrentDetallePedido();
    this.UserService.ClearCurrentCurrentEmpresariaNow();
  }


  ConfirmData() {
    this.confirmDialogRef = this.Matdialog.open(FuseConfirmDialogComponent, {})
    this.confirmDialogRef.componentInstance.confirmMessage = '¿Estas seguro de enviar el pedido?';
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) { this.CrearPedido() }
      this.confirmDialogRef = null;
    });
  }

  CalcularTotales() {

    //******************************************************** */
    //Calcula los totales del pedido.
    var CantidadArticulosSum = 0;
    var IVA = 0;
    var Valor = 0;
    var IVAPrecioCat = 0;
    var ValorPrecioCat = 0;
    var objDetallePedidoService: Array<E_PLU> = new Array<E_PLU>()
    objDetallePedidoService = this.DetallePedidoService.GetCurrentDetallePedido()
    var ValorPrecioEmp = 0;
    var ValorPuntos = 0;

    if (objDetallePedidoService != null) {
      objDetallePedidoService.forEach((element) => {

        //TODO: OJO arreglar con valores que lleguen bien.
        IVAPrecioCat = IVA + element.PrecioConIVA;
        IVA = IVA + element.PrecioConIVA;

        ValorPrecioCat = Valor + element.PrecioCatalogoTotalConIVA;
        Valor = Valor + element.PrecioCatalogoTotalConIVA;


        ValorPrecioEmp = ValorPrecioEmp + element.PrecioEmpresaria;
        ValorPuntos = ValorPuntos + element.PrecioPuntos;
        CantidadArticulosSum = CantidadArticulosSum + element.Cantidad;

        this.PrecioEmpresariaTotalConIVA = ValorPrecioEmp;
        this.PrecioPuntosTotal = ValorPuntos;


        this.PrecioCatalogoTotalConIVA = Valor;
        this.CantidadArticulos = CantidadArticulosSum;
        this.TotalPagar = Valor;

      });

    }
  }


  CrearPedido() {


    try {

      //******************************************************** */
      //Calcula los totales del pedido.

      var TotalPuntosPedidoSum = 0;
      var CantidadArticulosSum = 0;
      var IVA = 0;
      var Valor = 0;
      var IVAPrecioCat = 0;
      var ValorPrecioCat = 0;
      var objDetallePedidoService: Array<E_PLU> = new Array<E_PLU>()
      objDetallePedidoService = this.DetallePedidoService.GetCurrentDetallePedido()

      if (objDetallePedidoService != null) {
        objDetallePedidoService.forEach((element) => {
          CantidadArticulosSum++;
          //TODO: OJO arreglar con valores que lleguen bien.
          IVAPrecioCat = IVA + element.PrecioConIVA;
          IVA = IVA + element.PrecioConIVA;

          ValorPrecioCat = Valor + element.PrecioCatalogoTotalConIVA;
          Valor = Valor + element.PrecioCatalogoTotalConIVA;


          this.PrecioCatalogoTotalConIVA = Valor;
          this.CantidadArticulos = CantidadArticulosSum;
          this.TotalPagar = Valor;

          TotalPuntosPedidoSum = Valor / this.SessionEmpresaria.ValorPuntos;

        });

      }

      //******************************************************** */
      //INSERTA ENCABEZADO DEL PEDIDO
      this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
      this.SessionEmpresaria = this.UserService.GetCurrentCurrentEmpresariaNow()
      var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()


      objPedidoRequest.Nit = this.SessionEmpresaria.DocumentoEmpresaria.trim();
      objPedidoRequest.IdVendedor = this.SessionUser.IdVendedor.trim();
      objPedidoRequest.IVA = IVA; //valor del pedido * iva (16%). Solo para encabezado de pedido.
      objPedidoRequest.Valor = Valor; //valor total con iva incuido. Solo para encabezado de pedido.
      objPedidoRequest.ClaveUsuario = this.SessionUser.ClaveUsuario.trim();
      objPedidoRequest.Campana = this.SessionUser.Campana.trim();
      objPedidoRequest.IVAPrecioCat = IVAPrecioCat; //valor precio catalogo del pedido * iva (16%). Solo para encabezado de pedido.
      objPedidoRequest.ValorPrecioCat = ValorPrecioCat; //valor precio catalogo total con iva incuido. Solo para encabezado de pedido.
      objPedidoRequest.Codigo = this.SessionUser.Catalogo.trim();//rcb_catalogo.SelectedValue;
      objPedidoRequest.Zona = this.SessionEmpresaria.IdZona.trim();
      objPedidoRequest.IdLider = this.SessionEmpresaria.Empresaria_Lider.trim();
      objPedidoRequest.TipoEnvio = Number(this.data.TipoEnvio);
      objPedidoRequest.CiudadDespacho = this.data.CodCiudadDespacho;
      objPedidoRequest.Asistente = this.SessionUser.Asistente;
      objPedidoRequest.ExcentoIVA = this.SessionEmpresaria.ExcentoIVA
      objPedidoRequest.CodCiudadCliente = this.SessionEmpresaria.CodCiudadCliente.trim();

      var objPedidoResponse: E_PedidosCliente = new E_PedidosCliente()
      this.PedidoService.GuardarEncabezadoPedido(objPedidoRequest)
        .subscribe((x: E_PedidosCliente) => {
          objPedidoResponse = x

          if (x.Error == undefined) {

            if (x.Numero != null && x.Numero != "") {

              ///######################################################################################
              //INSERTA DETALLE DEL PEDIDO

              var objPedidoDetalleRequestArray: Array<E_PedidosDetalleCliente> = new Array<E_PedidosDetalleCliente>()
              var objPedidoDetalle: E_PedidosDetalleCliente = new E_PedidosDetalleCliente()

              if (objDetallePedidoService != null) {



                objDetallePedidoService.forEach((element) => {

                  //TODO: OJO arreglar con valores que lleguen bien.
                  IVAPrecioCat = IVA + element.PrecioConIVA;
                  IVA = IVA + element.PrecioConIVA;

                  ValorPrecioCat = Valor + element.PrecioCatalogoTotalConIVA;
                  Valor = Valor + element.PrecioCatalogoTotalConIVA;

                  objPedidoDetalle.PLU = element.PLU;
                  objPedidoDetalle.Cantidad = element.Cantidad;
                  objPedidoDetalle.IdCodigoCorto = element.CodigoRapido;
                  objPedidoDetalle.CatalogoReal = element.CatalogoReal;

                  //---------------------------------------------------
                  /* var maxDate = new Date(2000, 11, 31);
                   x.Fecha= maxDate;
                   x.FechaAnulacion= maxDate;
                   x.FechaCierreBorrador= maxDate;
                   x.FechaCierreReserva= maxDate;
                   x.FechaCierreReservaReal= maxDate;
                   x.FechaCreacion= maxDate;
                   x.FechaIngresoCliente= maxDate;
                   x.FechaUltimaModificacion= maxDate;
                   x.UltimaModificacionEmpresaria= maxDate;*/
                  //---------------------------------------------------
                  /*var objPedidosCliente: E_PedidosCliente = new E_PedidosCliente()
                  objPedidosCliente.okTransEncabezadoPedido = true;
                  objPedidosCliente.okTransDetallePedido = true;
                  objPedidosCliente.PuntosUsar = this.PuntosUsar;
                  objPedidosCliente.TotalPuntosPedido = TotalPuntosPedidoSum;
                  objPedidosCliente.Numero="mraosq23";
                  objPedidoDetalle.PedidosClienteInfo = new E_PedidosCliente()
                  objPedidoDetalle.PedidosClienteInfo = new PedidosClienteBuilder().buildFromObject(objPedidosCliente).Build();
*/
                  objPedidoDetalle.PorcentajeDescuento = element.PorcentajeDescuento;

                  objPedidoDetalle.PedidosClienteInfo = new E_PedidosCliente()
                  x.okTransEncabezadoPedido = true;
                  x.okTransDetallePedido = true;
                  x.PuntosUsar = this.PuntosUsar;
                  x.TotalPuntosPedido = TotalPuntosPedidoSum;
                  objPedidoDetalle.PedidosClienteInfo = new PedidosClienteBuilder().buildFromObject(x).Build();

                  objPedidoDetalleRequestArray.push(new PedidosDetalleClienteBuilder().buildFromObject(objPedidoDetalle).Build());

                });

              }

              this.PedidoService.GuardarDetallePedido(objPedidoDetalleRequestArray)
                .subscribe((x: E_PedidosCliente) => {
                  objPedidoResponse = x

                  if (x.Error == undefined) {

                    ///[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][][]
                    //REALIZAR RESERVA EN LINEA

                    this.PedidoService.GuardarReservaEnLinea(objPedidoDetalleRequestArray)
                      .subscribe((x: E_PedidosCliente) => {
                        objPedidoResponse = x

                        if (x.Error == undefined) {


                          //Mensaje de OK
                          const dialogRef = this.dialog.open(ModalPopUpComponent, {
                            width: '450px',
                            data: { TipoMensaje: "Ok", Titulo: "Creación Pedido", Mensaje: "Se almacenó el pedido exitosamente! Numero Pedido: " + x.Numero }
                          });

                          this.bottomSheetRef.dismiss();
                          this.EliminarArticulos();

                        }
                      })

                    ///[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]][][]
                  }
                })
              ///######################################################################################
            }
          }
          else {
            //---------------------------------------------------------------------------------------------------------------
            //Mensaje de Error. 
            const dialogRef = this.dialog.open(ModalPopUpComponent, {
              width: '450px',
              data: { TipoMensaje: "Error", Titulo: "Crear Pedido", Mensaje: "No se pudo crear Pedido. Error: 202." }
            });

            throw new ErrorLogExcepcion("DetallePedidoComponent", "CrearPedido()", x.Error.Descripcion, this.SessionUser.Cedula, this.ExceptionErrorService)
            //---------------------------------------------------------------------------------------------------------------
          }
        })

    }
    catch (error) {
      //---------------------------------------------------------------------------------------------------------------
      //Mensaje de Error.   
      throw new ErrorLogExcepcion("DetallePedidoComponent", "CrearPedido()", error.message, this.SessionUser.Cedula, this.ExceptionErrorService)
      //---------------------------------------------------------------------------------------------------------------
    }


  }


}
