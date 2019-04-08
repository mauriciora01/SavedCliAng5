import { Component, Inject,ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';


export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
}

@Component({
  selector: 'detallecliente',
  templateUrl: 'detallecliente.component.html',
  styleUrls: ['detallecliente.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class DetalleClienteComponent implements OnInit {
  TextColor: any
  constructor(
    public dialogRef: MatDialogRef<DetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: E_Cliente) { }

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
