import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import styles from "./CardSucursal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSucursalActivo } from "../../../redux/slices/SucursalReducer";
import { ModalVerSucursal } from "../../modals/ModalVerSucursal/ModalVerSucursal";

interface CardSucursalProps {
  sucursal: ISucursal;
  onSelect?: () => void;
}

export const CardSucursal: React.FC<CardSucursalProps> = ({
  sucursal,
  onSelect,
}) => {
  const [showModalSucursal, setShowModalSucursal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSucursalActivo({ sucursalActivo: sucursal }));
    if (onSelect) {
      onSelect();
    }
    navigate('/sucursal');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModalSucursal(true); 
  };

  const handleCloseModalSucursal = () => {
    setShowModalSucursal(false);
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card className={styles.sucursalCard}>
        <Card.Body>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitle}>
              <Card.Title>{sucursal.nombre}</Card.Title>
            </div>
            <div className={styles.casaMatrizBadge}>
              {sucursal.esCasaMatriz && <span>Casa Matriz</span>}
            </div>
          </div>
          <Card.Text className={styles.cardBody}>
            <strong>Dirección:</strong> {sucursal.domicilio.calle} - {sucursal.domicilio.numero}
            <br />
            <strong>Horario:</strong> {sucursal.horarioApertura} - {sucursal.horarioCierre}
          </Card.Text>
          <div className={styles.cardActions}>
            <Button variant="primary" onClick={handleViewDetails}>
              Ver Detalles
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ModalVerSucursal
        show={showModalSucursal}
        handleClose={handleCloseModalSucursal}
        sucursal={sucursal}
      />
    </div>
  );
};