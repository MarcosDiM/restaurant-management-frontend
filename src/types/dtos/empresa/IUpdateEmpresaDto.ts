import { baseDto } from "../baseDto/baseDto";

export interface IUpdateEmpresaDto extends baseDto {
  nombre: string;
  razonSocial: string;
  cuit: string;
  logo: string | null;
}
