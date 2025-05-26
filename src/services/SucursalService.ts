import { ICreateSucursal } from "../types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";
const API_URL:string = import.meta.env.VITE_URL_API

export class SucursalService extends BackendClient<ISucursal> {
  constructor() {
    super(API_URL + "/sucursales");
  }
  async getAllSucursales(): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}`);
    if (!response.ok) {
      throw new Error(`Error`);
    }
    const data = await response.json();
    return data as ISucursal[];
  }

  async getAllSucursalesByEmpresa(idEmpresa: number): Promise<ISucursal[]> {
    const response = await fetch(`${this.baseUrl}/porEmpresa/${idEmpresa}`);
    const data = await response.json();
    return data as ISucursal[];
  }

  async existsCasaMatriz(idEmpresa: number): Promise<boolean> {
    const response = await fetch(
      `${this.baseUrl}/existCasaMatriz/${idEmpresa}`
    );
    const data = await response.json();
    return data as boolean;
  }

  async createSucursal(data: ICreateSucursal): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    return newData as ISucursal;
  }

  async updateSucursal(
    idSucursal: number,
    data: IUpdateSucursal
  ): Promise<ISucursal> {
    const response = await fetch(`${this.baseUrl}/update/${idSucursal}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("respuesta del response: ", response.status);
    const updatedData = await response.json();
    return updatedData as ISucursal;
  }
}
