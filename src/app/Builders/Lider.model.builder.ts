import { E_Error } from "../Models/E_Error";
import { E_Lider } from "../Models/E_Lider";

export class LiderBuilder {
    public IdLider: string
    public Nombres: string
    public Cedula: string
    public Zona: string
    public IdVendedor: string
    public Codciudad: string
    public error: E_Error
    
    buildFromObject(x: any): LiderBuilder {
        if (x.IdLider != undefined) { this.IdLider = x.IdLider }        
        if (x.Nombres != undefined) { this.Nombres = x.Nombres }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Zona != undefined) { this.Zona = x.Zona }
        if (x.IdVendedor != undefined) { this.IdVendedor = x.IdVendedor }
        if (x.Codciudad != undefined) { this.Codciudad = x.Codciudad }      
        if (x.error != undefined) { this.error = x.error }
        
        return this
    }
    Build(): E_Lider {
        var obj: E_Lider = new E_Lider()
        obj.IdLider = this.IdLider
        obj.Nombres = this.Nombres
        obj.Cedula = this.Cedula
        obj.Zona = this.Zona
        obj.IdVendedor = this.IdVendedor
        obj.Codciudad = this.Codciudad       
        obj.error = this.error
     
        return obj
    }


}
