import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_CxC } from 'app/Models/E_CxC';
import { CxCBuilder } from 'app/Builders/CxC.model.builder';


@Injectable()
export class CxCService {


    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;






    ListCxCDirector(obj: E_CxC): Observable<Array<E_CxC>> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          })
      };
      var request = JSON.stringify(obj)
      return this.Http.post(this.UrlNow + "CxC/ListCxCDirector"
          , request, httpOptions).map(this.ExtractCarteraList)
  }






  ExtractCarteraList(res: any): Array<E_CxC> {
    var x: Array<E_CxC> = new Array<E_CxC>()
    if (res != null) {
        res.forEach((element) => {
            x.push(new CxCBuilder().buildFromObject(element).Build())
        });

    }
    return x
  }
}
