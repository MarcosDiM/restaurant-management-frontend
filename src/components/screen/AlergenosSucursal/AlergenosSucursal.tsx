import { FC, useEffect, useState } from "react";
import { Button, ListGroup, Modal, Form } from "react-bootstrap";
import styles from "./AlergenosSucursal.module.css";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { AlergenoService } from "../../../services/AlergenoService";
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos";


interface TablaAlergenosProps {
  sucursal: ISucursal | null;
  onSelect: () => void;
}

export const AlergenosSucursal: FC<TablaAlergenosProps> = () => {
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedAlergeno, setSelectedAlergeno] = useState<IAlergenos | null>(null);
  const [newAlergenoNombre, setNewAlergenoNombre] = useState("");
  const [editingAlergeno, setEditingAlergeno] = useState<IAlergenos | null>(
    null
  );

  const alergenoService = new AlergenoService();

  // Función para obtener todos los alérgenos
  const fetchAllAlergenos = async () => {
    try {
      const data = await alergenoService.getAllAlergenos();
      setAlergenos(data);
    } catch (error) {
      console.log("Error fetching alergenos:", error);
    }
  };

  // Función para agregar un nuevo alérgeno 
  const handleAddAlergeno = async () => {
    if (newAlergenoNombre.trim() !== "") {
      try {
        const newAlergeno = await alergenoService.createAlergeno({
          denominacion: newAlergenoNombre,
          imagen: null,
        });
        setAlergenos([...alergenos, newAlergeno]);
        setShowModal(false);
        setNewAlergenoNombre("");
      } catch (error) {
        console.log("Error adding alergeno:", error);
      }
    }
    fetchAllAlergenos();
  };

  // Función para editar un alérgeno desde la API
  const handleEditAlergeno = (alergeno: IAlergenos) => {
    setEditingAlergeno(alergeno);
    setNewAlergenoNombre(alergeno.denominacion);
    setShowModal(true);
  };

  // Función para guardar el alérgeno editado
  const handleSaveAlergeno = async (denominacion: string) => {
    if (editingAlergeno) {
      const updatedAlergeno: IAlergenos = {
        ...editingAlergeno,
        denominacion,
      };

      try {
        await alergenoService.updateAlergeno(editingAlergeno.id, updatedAlergeno);
        fetchAllAlergenos(); 
        setShowModal(false);
      } catch (error) {
        console.log("Error updating categoria:", error);
      }
    }
  };

  // Función para eliminar un alérgeno a través de la API
  const handleDeleteAlergeno = async (id: number) => {
    try {
      await alergenoService.deleteAlergenoById(id);
      setAlergenos(alergenos.filter((alergeno) => alergeno.id !== id));
    } catch (error) {
      console.log("Error deleting alergeno:", error);
    }
    fetchAllAlergenos();
  };

  const handleViewAlergeno = (alergeno: IAlergenos) => {
    setSelectedAlergeno(alergeno);
    setShowViewModal(true);
  };


  useEffect(() => {
    fetchAllAlergenos();
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.buttonAgregarAlergeno}>
        <Button
          variant="dark"
          onClick={() => {
            setShowModal(true);
            setEditingAlergeno(null); 
            setNewAlergenoNombre(""); 
          }}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#1E1E1E",
          }}
        >
          <span className="material-symbols-outlined">add</span>
          Agregar Alergeno
        </Button>
      </div>

      <div className={styles.listAlergenos}>
        <div className={styles.categoriasTabla}>
          <h4>Nombre</h4>
          <h4>Acciones</h4>
        </div>
        <ListGroup>
          {alergenos.map((alergeno, index) => (
            <ListGroup.Item key={index} className={styles.alergenoElement}>
              {alergeno.denominacion}
              <div className={styles.alergenoButtons}>
                <Button
                  className="d-flex align-items-center"
                  variant="warning"
                  onClick={() => handleViewAlergeno(alergeno)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "black" }}
                  >
                    visibility
                  </span>
                </Button>
                <Button
                  className="d-flex align-items-center"
                  variant="primary"
                  onClick={() => handleEditAlergeno(alergeno)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "black" }}
                  >
                    edit
                  </span>
                </Button>
                <Button
                  className="d-flex align-items-center"
                  variant="danger"
                  onClick={() => handleDeleteAlergeno(alergeno.id)}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "black" }}
                  >
                    delete
                  </span>
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingAlergeno ? "Editar Alergeno" : "Agregar Alergeno"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAlergenoNombre">
              <Form.Label>Nombre del Alergeno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre del alérgeno"
                value={newAlergenoNombre}
                onChange={(e) => setNewAlergenoNombre(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (editingAlergeno) {
                handleSaveAlergeno(newAlergenoNombre); 
              } else {
                handleAddAlergeno(); 
              }
            }}
          >
            {editingAlergeno ? "Guardar" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Alérgeno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlergeno ? (
            <div>
              <h5>Nombre: {selectedAlergeno.denominacion}</h5>
            </div>
          ) : (
            <p>No se seleccionó ningún alérgeno.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
