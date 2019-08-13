import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';

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
  styleUrls: ['modalpopuppedido.component.scss'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [
 
     // the "in" style determines the "resting" state of the element when it is visible.
     state('show', style({
       opacity: 1
     })),
     state('hide', style({
       opacity: 0
     })),
 
     transition('show => hide', animate('1500ms ease-out')),
     transition('hide => show', animate('1500ms ease-in'))
   ])
   ]
})
export class ModalPopUpPedidoComponent implements OnInit {
  TextColor: any
  show=true;
  constructor(
    public dialogRef: MatDialogRef<ModalPopUpPedidoComponent>,
    private Router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  get jey(){
      return this.show ? 'show' : "hide";
  }

  ngOnInit() {
    Observable.interval(1500).subscribe((val) => { 
      this.show = !this.show;
  });
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
