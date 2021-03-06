import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { DetallePedidosComponent } from '../DetallePedidos/detallepedidos.component';

@Component({
    moduleId: module.id,
    selector: 'mispedidos',
    templateUrl: 'mispedidos.component.html',
    styleUrls: ['mispedidos.component.scss']
})
export class MisPedidosComponent implements OnInit {
    displayedColumns = ['Numero', 'Nit', 'NombreEmpresaria'];
    dataSource: MatTableDataSource<E_PedidosCliente>;
    

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPedidos: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()

    constructor(public dialog: MatDialog,
        private PedidoService: PedidoService,
        private bottomSheet: MatBottomSheet,
        private UserService: UserService) {

    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objPedidos: E_PedidosCliente = new E_PedidosCliente()
        objPedidos.IdVendedor = this.SessionUser.IdVendedor;
        objPedidos.Nit = this.SessionUser.Cedula;
        objPedidos.Campana = this.SessionUser.Campana;
        objPedidos.IdLider = this.SessionUser.IdLider ;

        
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        if (this.SessionUser.IdGrupo == "50") {
            this.PedidoService.PedidosListEmpresarias(objPedidos)
            .subscribe((x: Array<E_PedidosCliente>) => {
                this.ListPedidos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPedidos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
        }
        else  if (this.SessionUser.IdGrupo == "52") {
        this.PedidoService.PedidosList(objPedidos)
            .subscribe((x: Array<E_PedidosCliente>) => {
                this.ListPedidos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPedidos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
        }
        else  if (this.SessionUser.IdGrupo == "60") {
            this.PedidoService.PedidosListLider(objPedidos)
            .subscribe((x: Array<E_PedidosCliente>) => {
                this.ListPedidos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPedidos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            })
        }
    }

    
    openResumenPedido(row: E_PedidosCliente): void {
        this.bottomSheet.open(DetallePedidosComponent, {
            panelClass: 'knowledgebase-article-dialog', //MRG: poner este para el style del popup.
            data: { TipoMensaje: "Error", Titulo: "Detalle Pedido", Mensaje: "Detalle del Pedido.", NumeroPedidoReservado:  row.Numero }
          });       

      
    }
  

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}