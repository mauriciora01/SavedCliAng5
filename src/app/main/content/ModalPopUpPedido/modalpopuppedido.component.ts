import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
  FechaHora: string;
  spinerr:boolean;
}

@Component({
  selector: 'modalpopuppedido',
  templateUrl: 'modalpopuppedido.component.html',
  styleUrls: ['modalpopuppedido.component.scss']
})
export class ModalPopUpPedidoComponent implements OnInit {
  TextColor: any
  constructor(
    public dialogRef: MatDialogRef<ModalPopUpPedidoComponent>,
    private Router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

    if (this.data.TipoMensaje == 'Error') {
      this.data.FechaHora = "";
      this.TextColor = 'red';
    }
    else {
      var today = new Date();
      var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      this.data.FechaHora = "Fecha: " + dateTime;
      this.TextColor = 'green';
    }

  }

  onCloseClick(): void {
    this.Router.navigate(["/principal/"])
    this.dialogRef.close();
  }

}
