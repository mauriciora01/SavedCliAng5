import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatTable } from '@angular/material';
import { DetalleClienteComponent } from '../DetalleCliente/detallecliente.component';
import { E_Cliente } from 'app/Models/E_Cliente';
import { ClienteService } from 'app/ApiServices/ClienteService';
import { E_SessionUser } from 'app/Models/E_SessionUser';
import { UserService } from '../../../ApiServices/UserService';
import { CommunicationService } from 'app/ApiServices/CommunicationService';


@Component({
    moduleId: module.id,
    selector: 'misempresarias',
    templateUrl: 'misempresarias.component.html',
    styleUrls: ['misempresarias.component.scss']
})
export class MisEmpresariasComponent implements OnInit {
    displayedColumns = ['imagenEmpresaria', 'NombreCompleto'];
    dataSource: MatTableDataSource<E_Cliente>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('tableEmpresaria') tableEmpresaria: MatTable<E_Cliente>;
    public SessionUser: E_SessionUser = new E_SessionUser()
    public ListClientes: Array<E_Cliente> = new Array<E_Cliente>()

    renderRows
    constructor(public dialog: MatDialog,
        private ClienteService: ClienteService,
        private UserService: UserService,
        private communicationService: CommunicationService) {


    }

    ngOnInit() {
        this.SessionUser = this.UserService.GetCurrentCurrentUserNow()
        var objCliente: E_Cliente = new E_Cliente()
        objCliente.Vendedor = this.SessionUser.IdVendedor;
        objCliente.Lider = this.SessionUser.IdLider;
        objCliente.CodEstado = "'%%'";
        this.communicationService.showLoader.next(true);

        if (this.SessionUser.IdGrupo == "52") {
            this.ClienteService.ListEmpresariasxGerenteSimple(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
           
                        this.communicationService.showLoader.next(false);
          
                })
        }
        else if (this.SessionUser.IdGrupo == "60") {
            this.ClienteService.ListEmpresariasxLider(objCliente)
                .subscribe((x: Array<E_Cliente>) => {
                    this.ListClientes = x

                    // Assign the data to the data source for the table to render
                    this.dataSource = new MatTableDataSource(this.ListClientes);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
           
                        this.communicationService.showLoader.next(false);
            
                })
        }
    }

    openDetalleCliente(row: E_Cliente): void {
        const dialogRef = this.dialog.open(DetalleClienteComponent, {
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