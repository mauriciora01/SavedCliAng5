
import { E_Error } from "../Models/E_Error";
import { E_Provincia } from "../Models/E_Provincia";

export class ProvinciaBuilder {
    public CodEstado: string
    public NombreEstado: string
    public CodPais: string
    public CodigoEstado: string
    public error: E_Error
    
    buildFromObject(x: any): ProvinciaBuilder {
        if (x.CodEstado != undefined) { this.CodEstado = x.CodEstado }        
        if (x.NombreEstado != undefined) { this.NombreEstado = x.NombreEstado }
        if (x.CodPais != undefined) { this.CodPais = x.CodPais }
        if (x.CodigoEstado != undefined) { this.CodigoEstado = x.CodigoEstado }       
        if (x.error != undefined) { this.error = x.error }
        
        return this
    }
    Build(): E_Provincia {
        var obj: E_Provincia = new E_Provincia()
        obj.CodEstado = this.CodEstado
        obj.NombreEstado = this.NombreEstado
        obj.CodPais = this.CodPais
        obj.CodigoEstado = this.CodigoEstado          
        obj.error = this.error
     
        return obj
    }


}
