import { E_Error } from "../Models/E_Error";
import { E_Regional } from "../Models/E_Regional";

export class RegionalBuilder {
    public CodigoRegional: number
    public Nombre: string
    public IdRegional: string
    public Codgereg: string
    public NombreGerente: string
    public Usuario: string
    public error: E_Error
    
    buildFromObject(x: any): RegionalBuilder {
        if (x.CodigoRegional != undefined) { this.CodigoRegional = x.CodigoRegional }        
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.IdRegional != undefined) { this.IdRegional = x.IdRegional }
        if (x.Codgereg != undefined) { this.Codgereg = x.Codgereg }
        if (x.NombreGerente != undefined) { this.NombreGerente = x.NombreGerente }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }      
        if (x.error != undefined) { this.error = x.error }
        
        return this
    }
    Build(): E_Regional {
        var obj: E_Regional = new E_Regional()
        obj.CodigoRegional = this.CodigoRegional
        obj.Nombre = this.Nombre
        obj.IdRegional = this.IdRegional
        obj.Codgereg = this.Codgereg
        obj.NombreGerente = this.NombreGerente
        obj.Usuario = this.Usuario       
        obj.error = this.error
     
        return obj
    }


}
