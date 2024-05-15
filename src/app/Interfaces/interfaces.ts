export interface CartResponse {
  response: number;
  lineasCarrito: number;
}

export interface IPescado{
  id: number;
  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  categoria: string;
  fechaCompra: Date;
  imagen: string;
  user_id: number;
  proveedor_id: number;
}


export interface IMarisco{
  id: number;
  nombre: string;
  descripcion: string;
  origen: string;
  precioKG: number;
  cantidad: number;
  categoria: string;
  fechaCompra: Date;
  imagen: string;
  cocido:boolean;
  user_id: number;
  proveedor_id: number;
}
