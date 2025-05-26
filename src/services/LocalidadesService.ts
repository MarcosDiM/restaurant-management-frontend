
import { ILocalidad } from "../types/ILocalidad";
import { BackendClient } from "./BackendClient";
const API_URL:string = import.meta.env.VITE_URL_API

export class LocalidadesService extends BackendClient<ILocalidad> {
	constructor() {
		super(API_URL + "/localidades");
	}

	async getLocalidadesByProvincia(provinciaId: number): Promise<ILocalidad[]> {
		const response = await fetch(
			`${this.baseUrl}/findByProvincia/${provinciaId}`
		);
		const data = await response.json();
		return data as ILocalidad[];
	}

	async getAll(): Promise<ILocalidad[]> {
		const response = await fetch(`${this.baseUrl}`);
		const data = await response.json();
		return data as ILocalidad[];
	}
}
