import { Component, Inject, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { SelectionModel } from '@angular/cdk/collections';
import { DetallePedidoService } from 'app/ApiServices/DetallePedidoService';
import { E_PLU } from 'app/Models/E_PLU';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ExceptionErrorService } from 'app/ApiServices/ExceptionErrorService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { E_PedidosDetalleCliente } from 'app/Models/E_PedidosDetalleCliente';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription, timer } from 'rxjs';

export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  NumeroPedidoReservado: string;
}

@Component({
  selector: 'detallepedidos',
  templateUrl: 'detallepedidos.component.html',
  styleUrls: ['detallepedidos.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DetallePedidosComponent implements OnInit {

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

  public PrecioEmpresariaTotalConIVA: number = 0;
  public PrecioPuntosTotal: number = 0;
  public PuntosUsar: number = 0; //Lo que retorna del resumen
  public DescuentoPuntosUsar: number = 0;//Lo que retorna del resumen
  public TotalPagarUsar: number = 0;//Lo que retorna del resumen
  public PuntosGanadosUsar: number = 0;//Lo que retorna del resumen
  public ValorPagarPagoPuntosUsar: number = 0;//Lo que retorna del resumen
  public AplicarPuntosGanados: boolean = true;//Lo que retorna del resumen
  public PagarFletePuntos: boolean = false;//Lo que retorna del resumen
  public ValorMinimoParaPuntos: number = 0;
  public ValorFletePuntos: number = 0;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowData: Array<E_PedidosDetalleCliente> = new Array<E_PedidosDetalleCliente>();

  constructor(private formBuilder: FormBuilder,
    private UserService: UserService,
    private ClienteService: ClienteService,
    private DetallePedidoService: DetallePedidoService,
    private bottomSheetRef: MatBottomSheetRef<DetallePedidosComponent>,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    private ExceptionErrorService: ExceptionErrorService,
    private PedidoService: PedidoService,
    private ParameterService: ParameterService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData,
  ) {
    this.columnDefs = [

      { headerName: 'Cod Rapido', width: 80, field: 'IdCodigoCorto' },
      { headerName: 'Nombre', field: 'Descripcion', sortable: true, filter: true },
      { headerName: 'Cant Reser', width: 80, field: 'Cantidad' },
      { headerName: 'Prec Uni', width: 80, field: 'ValorUnitario' },
      { headerName: 'Prec Emp', width: 80, field: 'Valor' },
      { headerName: 'Prec Cat', width: 80, field: 'TotalPrecioCatalogoCantidad' },
      { headerName: '% Descuento', width: 80, field: 'PorcentajeDescuento' },
      { headerName: '% Descuento Puntos', width: 90, field: 'PorcentajeDescuentoPuntos' }

    ];


  }

  private suscription: Subscription;

  onGridReady(params) {

    //MRG: Las dos lineas siguientes realizan la consulta y actualizan el grid por que se queda cargando.
    this.suscription = Observable.interval(500).subscribe((val) => {
       this.suscription.unsubscribe();
      //--------------------------------------

      params.api.setRowData(this.rowData);
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()
      objPedidoRequest.Numero = this.data.NumeroPedidoReservado;

      this.PedidoService.ListDetallePedidoReservaGYG(objPedidoRequest).subscribe((DistData) => {
        var DistDataArray = Object.values(DistData);
        this.rowData = DistDataArray;
      })

    });


    //this.rowData = this.DetallePedidoService.GetCurrentDetallePedido();;
    //this.cargarDatos();
    //this.rowData = this.rowData ;


  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }


  ngOnInit() {

    /* if (this.data.TipoMensaje == 'Error') {
       this.TextColor = 'blue';
     }
     else {
       this.TextColor = 'green';
     }*/


    var objPedidoRequest: E_PedidosCliente = new E_PedidosCliente()
    objPedidoRequest.Numero = this.data.NumeroPedidoReservado;

    this.PedidoService.ListDetallePedidoReservaGYG(objPedidoRequest).subscribe((DistData) => {
      var DistDataArray = Object.values(DistData);
      this.rowData = DistDataArray;
    })



    this.form = this.formBuilder.group({
      Cantidad: [undefined, [Validators.required]],


    });


    //this.gridApi.setRowData(this.gridApi.rowData)
    //this.gridApi.setRowData(this.rowData);
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



}
