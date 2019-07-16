import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_PedidosCliente } from 'app/Models/E_PedidosCliente';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
}

@Component({
  selector: 'detallepfactu',
  templateUrl: 'detallepfactu.component.html',
  styleUrls: ['detallepfactu.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class detallepfactuComponent implements OnInit {
  TextColor: any
  constructor(
    public dialogRef: MatDialogRef<detallepfactuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: E_PedidosCliente) { }

  ngOnInit() {

   /* if (this.data.TipoMensaje == 'Error') {
      this.TextColor = 'blue';
    }
    else {
      this.TextColor = 'green';
    }*/

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
