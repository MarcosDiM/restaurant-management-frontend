import { FC } from "react";
import { Button } from "react-bootstrap";
import styles from "./HeaderEmpresa.module.css";

interface HeaderEmpresaProps {
  nombreEmpresa: string;
  onAgregarSucursal: () => void;
}

export const HeaderEmpresa: FC<HeaderEmpresaProps> = ({
  nombreEmpresa,
  onAgregarSucursal,
}) => {
  return (
    <div className={styles.headerContainer}>
      <h2>SUCURSALES DE: {nombreEmpresa}</h2>

      <Button
        variant="dark"
        onClick={onAgregarSucursal}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#525252",
        }}
      >
        <span className="material-symbols-outlined">add</span>
        Agregar Sucursal
      </Button>
    </div>
  );
};
