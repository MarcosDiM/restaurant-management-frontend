import { ICategorias } from "../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../types/dtos/categorias/IUpdateCategoria";
import { BackendClient } from "./BackendClient";
import { BASEURL } from "./BaseUrl";

export class CategoriaService extends BackendClient<ICategorias> {
  constructor() {
    super(BASEURL + "/categorias");
  }
  async getAllCategorias(): Promise<ICategorias[]> {
    const response = await fetch(`${this.baseUrl}`);
    const data = await response.json();
    return data as ICategorias[];
  }

  async getAllCategoriasBySucursal(idSucursal: number): Promise<ICategorias[]> {
    const response = await fetch(
      `${this.baseUrl}/allCategoriasPadrePorSucursal/${idSucursal}`
    );
    const data = await response.json();
    return data as ICategorias[];
  }

  async getAllsubcategoriasByCategoriaPadre(
    idSucursal: number,
    idPadre: number
  ): Promise<ICategorias[]> {
    const response = await fetch(
      `${this.baseUrl}/allSubCategoriasPorCategoriaPadre/${idPadre}/${idSucursal}`
    );
    const data = await response.json();
    return data as ICategorias[];
  }
  async create(newCategoria: ICreateCategoria): Promise<ICategorias> {
    const response = await fetch(`${this.baseUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategoria),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la categoría");
    }

    const data = await response.json();
    return data as ICategorias;
  }
  async update(
    id: number,
    updatedCategoria: IUpdateCategoria
  ): Promise<ICategorias> {
    const payload = {
      denominacion: updatedCategoria.denominacion,
      idEmpresa: updatedCategoria.idEmpresa,
      idCategoriaPadre: updatedCategoria.idCategoriaPadre ?? null,
      idSucursales: updatedCategoria.idSucursales || [],
    };

    const response = await fetch(`${this.baseUrl}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Error:", error);
      throw new Error("Error al actualizar la categoría");
    }

    const updatedData = await response.json();
    return updatedData as ICategorias;
  }

  async addSubCategoria(
    newSubCategoria: ICreateCategoria
  ): Promise<ICategorias> {
    const response = await fetch(`${this.baseUrl}/subcategoria`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSubCategoria),
    });

    if (!response.ok) {
      throw new Error("Error al agregar la subcategoría");
    }

    const data = await response.json();
    return data as ICategorias;
  }
}
