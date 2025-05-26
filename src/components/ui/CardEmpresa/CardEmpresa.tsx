import { FC, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import styles from "./CardEmpresa.module.css";
import { ModalVerEmpresa } from "../../modals/ModalVerEmpresa/ModalVerEmpresa";
import { ModalEditarEmpresa } from "../../modals/ModalEditarEmpresa/ModalEditarEmpresa";

interface CardEmpresaProps {
  empresa: IEmpresa;
  onSelect: () => void;
}

export const CardEmpresa: FC<CardEmpresaProps> = ({ empresa, onSelect }) => {
  const [empresaActual, setEmpresaActual] = useState<IEmpresa>(empresa); // Estado local para la empresa
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleSave = (empresaEditada: IEmpresa) => {
    console.log("Empresa editada:", empresaEditada);
    setEmpresaActual(empresaEditada); // Actualizar el estado local con la empresa editada
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as Element).closest("button")) {
      onSelect();
    }
  };

  const preventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={styles.containerCard}
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <Card.Body className={styles.bodyCard}>
        {empresaActual.logo && (
          <img
            src={empresaActual.logo}
            alt={`${empresaActual.nombre} logo`}
            className={styles.empresaLogo}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        )}

        <Card.Title className="text-black">{empresaActual.nombre}</Card.Title>
        <div className={styles.containerButtons} onClick={preventPropagation}>
          <Button
            className="d-flex align-items-center"
            onClick={(e) => {
              preventPropagation(e);
              setShowModal(true);
            }}
            variant="warning"
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
            onClick={(e) => {
              preventPropagation(e);
              setShowModalEdit(true);
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: "black" }}
            >
              edit
            </span>
          </Button>
        </div>
      </Card.Body>
      <ModalVerEmpresa
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        empresa={empresaActual} // Pasar la empresa actualizada al modal de visualización
      />
      <ModalEditarEmpresa
        show={showModalEdit}
        handleClose={() => setShowModalEdit(false)}
        onSave={handleSave} // Llamar al manejador que actualiza el estado local
        empresaInicial={empresaActual} // Pasar la empresa actual al modal de edición
      />
    </Card>
  );
};
