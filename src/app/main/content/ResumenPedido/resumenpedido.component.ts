import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { E_Cliente } from 'app/Models/E_Cliente';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface DialogData {
  Titulo: string;
  Mensaje: string;
  TipoMensaje: string;

  Numero: string;
  Nit: string;
  NombreEmpresaria: string;
  Valor: string;
  TotalPrecioCatalogo: string;
  Portal: string;
  Zona: string;
  Campana: string;
  Catalogo: string;
  FechaCreacion: string;

}

@Component({
  selector: 'resumenpedido',
  templateUrl: 'resumenpedido.component.html',
  styleUrls: ['resumenpedido.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ResumenPedidoComponent implements OnInit {
  TextColor: any
  form: FormGroup;

  
  public Cantidad: number = 1;


  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ResumenPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }



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

  onClose(): void {
    this.dialogRef.close(this.form.value.Direccion);
  }

  CalacularResta(): void {
    if ((this.form.value.Cantidad - 1) > 0) {
      this.Cantidad = this.form.value.Cantidad - 1;
    }
    else {

      this.Cantidad = 1;
    }

  }

  CalcularSuma(): void {
    this.Cantidad = this.form.value.Cantidad + 1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
