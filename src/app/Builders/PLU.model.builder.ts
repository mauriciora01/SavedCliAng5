import { E_Error } from "../Models/E_Error";
import { E_PLU } from "../Models/E_PLU";
import { E_SessionEmpresaria } from 'app/Models/E_SessionEmpresaria';

export class PLUBuilder {
    public PLU: number
    public Referencia: string
    public CodigoColor: string
    public NombreColor: string
    public CodigoTalla: string
    public NombreTalla: string
    public CodigoTotal: string
    public CodigoBarras: string
    public NombreProducto: string
    public PrecioSinIVA: number
    public IVA: number
    public PrecioConIVA: number
    public PorcentajeIVA: number
    public PrecioTotalConIVA: number
    public CodigoRapido: string
    public Cantidad: number
    public FechaCreacion: Date
    public PrecioCatalogoSinIVA: number
    public IVAPrecioCatalogo: number
    public PrecioCatalogoTotalConIVA: number
    public CatalogoReal: string
    public CodigoRapidoSustituto: string
    public PLUSustituto: number
    public Campana: string
    public IdZona: string
    public Usuario: string
    public SessionEmpresaria: E_SessionEmpresaria
    public Error: E_Error
    
    buildFromObject(x: any): PLUBuilder {
        if (x.PLU != undefined) { this.PLU = x.PLU }        
        if (x.Referencia != undefined) { this.Referencia = x.Referencia }
        if (x.CodigoColor != undefined) { this.CodigoColor = x.CodigoColor }
        if (x.NombreColor != undefined) { this.NombreColor = x.NombreColor }
        if (x.CodigoTalla != undefined) { this.CodigoTalla = x.CodigoTalla }
        if (x.NombreTalla != undefined) { this.NombreTalla = x.NombreTalla }
        if (x.CodigoTotal != undefined) { this.CodigoTotal = x.CodigoTotal }
        if (x.CodigoBarras != undefined) { this.CodigoBarras = x.CodigoBarras }
        if (x.NombreProducto != undefined) { this.NombreProducto = x.NombreProducto }
        if (x.PrecioSinIVA != undefined) { this.PrecioSinIVA = x.PrecioSinIVA }
        if (x.IVA != undefined) { this.IVA = x.IVA }
        if (x.PrecioConIVA != undefined) { this.PrecioConIVA = x.PrecioConIVA }
        if (x.PorcentajeIVA != undefined) { this.PorcentajeIVA = x.PorcentajeIVA }
        if (x.PrecioTotalConIVA != undefined) { this.PrecioTotalConIVA = x.PrecioTotalConIVA }
        if (x.CodigoRapido != undefined) { this.CodigoRapido = x.CodigoRapido }
        if (x.Cantidad != undefined) { this.Cantidad = x.Cantidad }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.PrecioCatalogoSinIVA != undefined) { this.PrecioCatalogoSinIVA = x.PrecioCatalogoSinIVA }
        if (x.IVAPrecioCatalogo != undefined) { this.IVAPrecioCatalogo = x.IVAPrecioCatalogo }
        if (x.PrecioCatalogoTotalConIVA != undefined) { this.PrecioCatalogoTotalConIVA = x.PrecioCatalogoTotalConIVA }
        if (x.CatalogoReal != undefined) { this.CatalogoReal = x.CatalogoReal }
        if (x.CodigoRapidoSustituto != undefined) { this.CodigoRapidoSustituto = x.CodigoRapidoSustituto }
        if (x.PLUSustituto != undefined) { this.PLUSustituto = x.PLUSustituto }
        if (x.Campana != undefined) { this.Campana = x.Campana }
        if (x.IdZona != undefined) { this.IdZona = x.IdZona }
        if (x.Usuario != undefined) { this.Usuario = x.Usuario }
        if (x.SessionEmpresaria != undefined) { this.SessionEmpresaria = x.SessionEmpresaria }
        if (x.Error != undefined) { this.Error = x.Error }
        
        return this
    }
    Build(): E_PLU {
        var obj: E_PLU = new E_PLU()
        obj.PLU = this.PLU
        obj.Referencia = this.Referencia
        obj.CodigoColor = this.CodigoColor
        obj.NombreColor = this.NombreColor
        obj.CodigoTalla = this.CodigoTalla
        obj.NombreTalla = this.NombreTalla
        obj.CodigoTotal = this.CodigoTotal
        obj.CodigoBarras = this.CodigoBarras
        obj.NombreProducto = this.NombreProducto
        obj.PrecioSinIVA = this.PrecioSinIVA
        obj.IVA = this.IVA
        obj.PrecioConIVA = this.PrecioConIVA
        obj.PorcentajeIVA = this.PorcentajeIVA
        obj.PrecioTotalConIVA = this.PrecioTotalConIVA
        obj.CodigoRapido = this.CodigoRapido
        obj.Cantidad = this.Cantidad
        obj.FechaCreacion = this.FechaCreacion
        obj.PrecioCatalogoSinIVA = this.PrecioCatalogoSinIVA
        obj.IVAPrecioCatalogo = this.IVAPrecioCatalogo
        obj.PrecioCatalogoTotalConIVA = this.PrecioCatalogoTotalConIVA
        obj.CatalogoReal = this.CatalogoReal
        obj.CodigoRapidoSustituto = this.CodigoRapidoSustituto
        obj.PLUSustituto = this.PLUSustituto
        obj.Campana = this.Campana
        obj.IdZona = this.IdZona
        obj.Usuario = this.Usuario
        obj.SessionEmpresaria = this.SessionEmpresaria
        obj.Error = this.Error
        
        return obj
    } 

}
