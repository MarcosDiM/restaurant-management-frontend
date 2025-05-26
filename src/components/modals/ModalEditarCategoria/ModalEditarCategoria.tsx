import { FC, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ICategorias } from "../../../types/dtos/categorias/ICategorias";

interface ModalEditarCategoriaProps {
  show: boolean;
  onHide: () => void;
  categoria: ICategorias | null;
  onSave: (denominacion: string) => void;
}

export const ModalEditarCategoria: FC<ModalEditarCategoriaProps> = ({
  show,
  onHide,
  categoria,
  onSave,
}) => {
  const [denominacion, setDenominacion] = useState("");

  useEffect(() => {
    if (categoria) {
      setDenominacion(categoria.denominacion);
    }
  }, [categoria]);

  const handleSave = () => {
    onSave(denominacion);
    
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDenominacion">
            <Form.Label>Denominación</Form.Label>
            <Form.Control
              type="text"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
