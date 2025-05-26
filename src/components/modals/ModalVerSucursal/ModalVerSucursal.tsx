// src/components/modals/ModalVerSucursal/ModalVerSucursal.tsx
import { Button, Modal } from "react-bootstrap";
import { FC } from "react";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";

interface ModalVerSucursalProps {
  show: boolean;
  handleClose: () => void;
  sucursal: ISucursal | null;
}

export const ModalVerSucursal: FC<ModalVerSucursalProps> = ({
  show,
  handleClose,
  sucursal,
}) => {
  const handleModalClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
  };

  return (
    <Modal show={show} >
      <Modal.Header>
        <Modal.Title>{sucursal ? sucursal.nombre : "Sucursal"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sucursal ? (
          <>
            <p>
              <strong>Horario Apertura:</strong> {sucursal.horarioApertura}
            </p>
            <p>
              <strong>Horario Cierre:</strong> {sucursal.horarioCierre}
            </p>
            <p>
              <strong>Dirección:</strong> {sucursal.domicilio.calle}{" "}
              {sucursal.domicilio.numero}, {sucursal.domicilio.cp}
            </p>
            <p>
              {sucursal.domicilio.piso>0 && (
                <p>
                  <strong>Piso:</strong> {sucursal.domicilio.piso} - 
                  
                  <strong> Departamento:</strong> {sucursal.domicilio.nroDpto}
                </p>
              )}
            </p>
            <div>
            {sucursal.logo && (
              <img
                src={sucursal.logo}
                alt="Logo de Sucursal"
                style={{ width: "100%" }}
              />
            )}
            </div>
            
          </>
        ) : (
          <p>No hay información disponible.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};