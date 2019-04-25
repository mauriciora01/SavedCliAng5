import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;
}

@Component({
  selector: 'detallepedido',
  templateUrl: 'detallepedido.component.html',
  styleUrls: ['detallepedido.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class DetallePedidoComponent implements OnInit {
  TextColor: any
  form: FormGroup;

  

  public Cantidad: number = 1;


  constructor(private formBuilder: FormBuilder,
    
    private bottomSheetRef: MatBottomSheetRef<DetallePedidoComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data1: any,
    ) { }

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

    this.form = this.formBuilder.group({
      Cantidad: [undefined, [Validators.required]],


    });



  }



}
