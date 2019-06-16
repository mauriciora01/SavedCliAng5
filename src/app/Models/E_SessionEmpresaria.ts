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

    public IdZona: string
    public Email: string
    public Vendedor: string
    public Clasificacion: string
    public Telefono1: string
    public Celular1: string
    public CodigoRegional: string
    public Usuario: string
    public Whatsapp: string
    public TipoCliente: string
    public TallaPrendaSuperior: string
    public TallaPrendaInferior: string
    public TallaCalzado: string   
    public Catalogo: string  
    public Campana: string  
    public PuntosEmpresaria: number
    public ValorPuntos: number
    public Error: E_Error

    constructor() { }
}

