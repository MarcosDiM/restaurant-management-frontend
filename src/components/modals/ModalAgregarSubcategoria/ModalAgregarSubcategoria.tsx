import { FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface ModalAgregarSubCategoriaProps {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  denominacion: string;
  setDenominacion: (denominacion: string) => void;
}

export const ModalAgregarSubCategoria: FC<ModalAgregarSubCategoriaProps> = ({
  show,
  onHide,
  onSave,
  denominacion,
  setDenominacion,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Subcategoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formDenominacion">
          <Form.Label>Denominación</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre de la subcategoría"
            value={denominacion}
            onChange={(e) => setDenominacion(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSave}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
