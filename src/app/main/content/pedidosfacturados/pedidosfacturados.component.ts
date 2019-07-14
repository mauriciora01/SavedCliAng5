import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ResumenPedidoComponent } from '../ResumenPedido/resumenpedido.component';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { PedidoService } from 'app/ApiServices/PedidoService';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';
import { detallepfactuComponent } from '../detallepfactu/detallepfactu.component';

@Component({
    moduleId: module.id,
    selector: 'pedidosfacturados',
    templateUrl: 'pedidosfacturados.component.html',
    styleUrls: ['pedidosfacturados.component.scss']
})
export class pedidosfacturadoscomponent implements OnInit {
    displayedColumns = ['Numero', 'Factura','Fecha', 'Nit','NombreEmpresaria'];
    dataSource: MatTableDataSource<E_PedidosCliente>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListPedidos: Array<E_PedidosCliente> = new Array<E_PedidosCliente>()

    constructor(public dialog: MatDialog,
        private PedidoService: PedidoService,
        private UserService: UserService) {       

    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objPedidos: E_PedidosCliente = new E_PedidosCliente()
        objPedidos.IdVendedor = this.SessionUser.IdVendedor;
        //MRG: Validar los siguientes datos para enviar segun el usuarios.
        objPedidos.IdVendedor = "104";
        objPedidos.Campana = "0519";
        this.PedidoService.ListxGerenteZonaFacturados(objPedidos)
            .subscribe((x: Array<E_PedidosCliente>) => {
                this.ListPedidos = x

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.ListPedidos);
                this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
            })
    }

    openResumenPedido(row: E_PedidosCliente): void {
        const dialogRef = this.dialog.open(detallepfactuComponent, {
            //width: '550px',
            panelClass: 'knowledgebase-article-dialog',
            data: row
        });       

        dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
            //this.Mensaje = result; //AQUI RECIBE LOS DATOS DEL POPUP CERRADO. OJO PARA PEDIDO.
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