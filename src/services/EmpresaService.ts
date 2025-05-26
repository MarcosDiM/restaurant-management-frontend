import { ICreateEmpresaDto } from "../types/dtos/empresa/ICreateEmpresaDto";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { IUpdateEmpresaDto } from "../types/dtos/empresa/IUpdateEmpresaDto";
import { BackendClient } from "./BackendClient";
const API_URL: string = import.meta.env.VITE_URL_API;

export class EmpresaService extends BackendClient<IEmpresa> {
	constructor() {
		super(API_URL + "/empresas");
	}

	async getAllEmpresas(): Promise<IEmpresa[]> {
		const response = await fetch(`${this.baseUrl}`);
		if (!response.ok) {
			throw new Error(`Error`);
		}
		const data = await response.json();
		return data as IEmpresa[];
	}

	async createEmpresa(data: ICreateEmpresaDto): Promise<IEmpresa> {
		const response = await fetch(`${this.baseUrl}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const newData = await response.json();

		return newData as IEmpresa;
	}

	async updateEmpresa(
		idEmpresa: number,
		data: IUpdateEmpresaDto
	): Promise<IEmpresa> {
		const response = await fetch(`${this.baseUrl}/${idEmpresa}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const updateData = await response.json();
		return updateData as IEmpresa;
	}
}
