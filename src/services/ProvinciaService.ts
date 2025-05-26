import { IProvincia } from "../types/IProvincia";
import { BackendClient } from "./BackendClient";
const API_URL:string = import.meta.env.VITE_URL_API

export class ProvinciaService extends BackendClient<IProvincia> {
	constructor() {
		super(API_URL + "/provincias");
	}

	async getProvinciaByPais(paisId: number): Promise<IProvincia[]> {
		const response = await fetch(`${this.baseUrl}/findByPais/${paisId}`);
		const data = await response.json();
		return data as IProvincia[];
	}

	async getAllProvincias(): Promise<IProvincia[]> {
		const response = await fetch(`${this.baseUrl}`);
		const data = await response.json();
		return data as IProvincia[];
	}
}
