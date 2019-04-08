import { E_Error } from "../Models/E_Error";
import { E_SessionEmpresaria } from "../Models/E_SessionEmpresaria";

export class SessionEmpresariaBuilder {
   
    public DocumentoEmpresaria: string
    public NombreEmpresariaCompleto: string
    public TipoPedidoMinimo: string
    public CodCiudadCliente: string
    public PremioBienvenida: string
    public TipoEnvioCliente: string
    public Empresaria_Lider: string
    public ExcentoIVA: string

    public Error: E_Error

    buildFromObject(x: any): SessionEmpresariaBuilder {
        
        if (x.DocumentoEmpresaria != undefined) { this.DocumentoEmpresaria = x.DocumentoEmpresaria }
        if (x.NombreEmpresariaCompleto != undefined) { this.NombreEmpresariaCompleto = x.NombreEmpresariaCompleto }
        if (x.TipoPedidoMinimo != undefined) { this.TipoPedidoMinimo = x.TipoPedidoMinimo }
        if (x.CodCiudadCliente != undefined) { this.CodCiudadCliente = x.CodCiudadCliente }
        if (x.PremioBienvenida != undefined) { this.PremioBienvenida = x.PremioBienvenida }
        if (x.TipoEnvioCliente != undefined) { this.TipoEnvioCliente = x.TipoEnvioCliente }
        if (x.Empresaria_Lider != undefined) { this.Empresaria_Lider = x.Empresaria_Lider }
        if (x.ExcentoIVA != undefined) { this.ExcentoIVA = x.ExcentoIVA }

        if (x.Error != undefined) { this.Error = x.Error }

        return this
    }
    Build(): E_SessionEmpresaria {
        var obj: E_SessionEmpresaria = new E_SessionEmpresaria()     
        
        obj.DocumentoEmpresaria = this.DocumentoEmpresaria
        obj.NombreEmpresariaCompleto = this.NombreEmpresariaCompleto
        obj.TipoPedidoMinimo = this.TipoPedidoMinimo
        obj.CodCiudadCliente = this.CodCiudadCliente
        obj.PremioBienvenida = this.PremioBienvenida
        obj.TipoEnvioCliente = this.TipoEnvioCliente
        obj.Empresaria_Lider = this.Empresaria_Lider
        obj.ExcentoIVA = this.ExcentoIVA

        obj.Error = this.Error

        return obj
    }
}
