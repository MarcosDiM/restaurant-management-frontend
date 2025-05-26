import { FC, useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import styles from "./CategoriaSucursal.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { CategoriaService } from "../../../services/CategoriaService";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../../../types/dtos/categorias/ICreateCategoria";
import { ModalAgregarCategoria } from "../../modals/ModalAgregarCategoria/ModalAgregarCategoria";
import { ModalEditarCategoria } from "../../modals/ModalEditarCategoria/ModalEditarCategoria";
import { ModalAgregarSubCategoria } from "../../modals/ModalAgregarSubcategoria/ModalAgregarSubcategoria";

interface TablaCategoriasProps {
  sucursal: ISucursal | null;
  onSelect: () => void;
}

export const CategoriasSucursal: FC<TablaCategoriasProps> = ({ sucursal }) => {
  const categoriaService = new CategoriaService();
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] =
    useState<ICategorias | null>(null);
  const [newCategoriaDenominacion, setNewCategoriaDenominacion] = useState("");

  const [showSubCategoriaModal, setShowSubCategoriaModal] = useState(false);
  const [newSubCategoriaDenominacion, setNewSubCategoriaDenominacion] =
    useState("");

  const fetchCategoriasBySucursal = async (idSucursal: number) => {
    try {
      const data = await categoriaService.getAllCategoriasBySucursal(
        idSucursal
      );
      console.log("Datos de categorías recibidos:", data);
      setCategorias(data);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  useEffect(() => {
    if (sucursal) {
      fetchCategoriasBySucursal(sucursal.id);
    }
  }, [sucursal]);

  const handleToggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleEditClick = (categoria: ICategorias) => {
    setSelectedCategoria(categoria);
    setNewCategoriaDenominacion(categoria.denominacion);
    setShowEditModal(true);
  };

  const handleSaveCategoria = async (denominacion: string) => {
    if (selectedCategoria) {
      const updatedCategoria: ICategorias = {
        ...selectedCategoria,
        denominacion,
      };

      try {
        await categoriaService.update(selectedCategoria.id, updatedCategoria);
        fetchCategoriasBySucursal(sucursal?.id || 0);
        setShowEditModal(false);
        setSelectedCategoria(null);
      } catch (error) {
        console.log("Error updating categoria:", error);
      }
    }
  };
  const handleAddCategoria = async () => {
    const newCategoria: ICreateCategoria = {
      denominacion: newCategoriaDenominacion,
      idEmpresa: sucursal?.empresa.id,
      idCategoriaPadre: null,
    };

    try {
      await categoriaService.create(newCategoria);
      setNewCategoriaDenominacion("");
      fetchCategoriasBySucursal(sucursal?.id || 0);
      setShowAddModal(false);
    } catch (error) {
      console.log("Error adding categoria:", error);
    }
  };
  const handleAddSubCategoria = async () => {
    if (selectedCategoria) {
      const newSubCategoria: ICreateCategoria = {
        denominacion: newSubCategoriaDenominacion,
        idEmpresa: sucursal?.empresa.id,
        idCategoriaPadre: selectedCategoria.id,
      };

      console.log("Subcategoría a crear:", newSubCategoria);

      try {
        await categoriaService.create(newSubCategoria);

        setNewSubCategoriaDenominacion("");

        fetchCategoriasBySucursal(sucursal?.id || 0);

        setShowSubCategoriaModal(false);
      } catch (error) {
        console.log("Error adding subcategoria:", error);
      }
    }
  };

  return (
    <div className={styles.homeCategorias}>
      <div>
        <Button
          onClick={() => {
            setNewCategoriaDenominacion("");
            setShowAddModal(true);
          }}
          variant="dark"
          className={styles.buttonCategorias}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1E1E1E",
          }}
        >
          <span className="material-symbols-outlined">add</span>
          Agregar una categoría
        </Button>
      </div>
      <Accordion activeKey={activeKey}>
        {categorias.map((categoria) => (
          <Accordion.Item
            key={`categoria-${categoria.id}`}
            eventKey={String(categoria.id)}
          >
            <Accordion.Header
              className="d-flex justify-content-between"
              onClick={() => handleToggle(String(categoria.id))}
            >
              {categoria.denominacion}
              <div className="d-flex justify-content-end w-100">
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                  variant="primary"
                  className="me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(categoria);
                  }}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                  variant="danger"
                  onClick={async (e) => {
                    e.stopPropagation();
                    try {
                      await categoriaService.delete(categoria.id);
                      fetchCategoriasBySucursal(sucursal?.id || 0);
                    } catch (error) {
                      console.error("Error deleting categoria:", error);
                    }
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </Button>
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                    marginLeft: "0.5rem",
                  }}
                  variant="success"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategoria(categoria);
                    setShowSubCategoriaModal(true);
                  }}
                >
                  <span className="material-symbols-outlined">add_circle</span>
                </Button>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              {categoria.subCategorias && categoria.subCategorias.length > 0 ? (
                <ul>
                  {categoria.subCategorias.map((subCategoria) => (
                    <li key={subCategoria.id}>{subCategoria.denominacion}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay subcategorías disponibles.</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <ModalAgregarCategoria
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={handleAddCategoria}
        denominacion={newCategoriaDenominacion}
        setDenominacion={setNewCategoriaDenominacion}
      />

      <ModalEditarCategoria
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedCategoria(null);
        }}
        categoria={selectedCategoria}
        onSave={handleSaveCategoria}
      />
      <ModalAgregarSubCategoria
        show={showSubCategoriaModal}
        onHide={() => setShowSubCategoriaModal(false)}
        onSave={handleAddSubCategoria}
        denominacion={newSubCategoriaDenominacion}
        setDenominacion={setNewSubCategoriaDenominacion}
      />
    </div>
  );
};
