import { E_Error } from "./E_Error";
import { E_SessionEmpresaria } from './E_SessionEmpresaria';

export class E_PLU {

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
    public PorcentajeDescuento: number
    public PrecioEmpre: number
    public PrecioPuntos: number
    public SessionEmpresaria: E_SessionEmpresaria
    public Error: E_Error
    
    constructor() { }
}
