import { IAlergenos } from "../types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

const API_URL:string = import.meta.env.VITE_URL_API

export class AlergenoService extends BackendClient<IAlergenos>{
    constructor() {
        super(API_URL + "/alergenos")
    }

    async getAllAlergenos(): Promise<IAlergenos[]> {
      const response = await fetch(`${this.baseUrl}`);
      const data = await response.json();
      return data as IAlergenos[];
    }

    async getAlergenoById(id: number): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}/${id}`);
      const data = await response.json();
      return data as IAlergenos;
    }

    async createAlergeno(data: ICreateAlergeno): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const newData = await response.json();
      return newData as IAlergenos;
    }

    async updateAlergeno(id: number, data: IUpdateAlergeno): Promise<IAlergenos> {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const updatedData = await response.json();
      return updatedData as IAlergenos;
    }

    async deleteAlergenoById(id: number): Promise<void> {
      await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
    }

    async deleteImgAlergeno(id: number, publicId: string): Promise<void> {
      await fetch(`${this.baseUrl}/?id=${id}&publicId=${publicId}`, {
        method: "POST",
      });
    }
  
}