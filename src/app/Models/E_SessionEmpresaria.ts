import { E_Error } from "./E_Error";

export class E_SessionEmpresaria {

    public DocumentoEmpresaria: string
    public NombreEmpresariaCompleto: string    
    public TipoPedidoMinimo: string
    public CodCiudadCliente: string
    public PremioBienvenida: string
    public TipoEnvioCliente: string
    public Empresaria_Lider: string
    public ExcentoIVA: string

    public Error: E_Error

    constructor() { }
}

