import { IPais } from "../types/IPais";
import { BackendClient } from "./BackendClient";
const API_URL:string = import.meta.env.VITE_URL_API

export class PaisService extends BackendClient<IPais> {
    constructor() {
        super(API_URL + "/paises");
    }

    
    async getAllPaises(): Promise<IPais[]> {
        const response = await fetch(`${this.baseUrl}`);
        const data = await response.json();
        return data as IPais[];
    }
}