import { IPais } from "../../IPais";

import { ISucursal } from "../sucursal/ISucursal";
export interface IEmpresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuit: string;
  logo: string | null;
  sucursales: ISucursal[];
  pais: null | IPais;
}
