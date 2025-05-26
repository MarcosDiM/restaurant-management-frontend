import { Button } from "react-bootstrap";
import styles from "./Sucursal.module.css";
import { useState } from "react";
import { AlergenosSucursal } from "../AlergenosSucursal/AlergenosSucursal";
import { ProductosSucursal } from "../ProductosSucursal/ProductosSucursal";
import { useNavigate } from "react-router-dom";
import { CategoriasSucursal } from "../CategoriasSucursal/CategoriasSucursal";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

export const Sucursal = () => {
  const [showAlergenos, setShowAlergenos] = useState(false);
  const [showProductos, setShowProductos] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const navigate = useNavigate();
  const sucursalActivo = useSelector(
    (state: RootState) => state.sucursal.sucursalActivo
  );

  const handleShowProductos = () => {
    setShowAlergenos(false);
    setShowCategorias(false);
    setShowProductos(true);
  };

  const handleShowAlergenos = () => {
    setShowProductos(false);
    setShowCategorias(false);
    setShowAlergenos(true);
  };

  const handleShowCategorias = () => {
    setShowAlergenos(false);
    setShowProductos(false);
    setShowCategorias(true);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <div className={styles.mainSucursal}>
        <div className={styles.headerSucursal}>
          <Button
            onClick={handleBack}
            style={{
              width: "60px",
              height: "5vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0.5rem 1.5rem",
              border: "solid 1px",
            }}
            variant="dark"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Button>
          <h2 style={{ paddingTop: "1.3vh" }}>{sucursalActivo?.nombre}</h2>
        </div>
        <div className={styles.container}>
          <div className={styles.navSucursal}>
            <div className={styles.tittleNav}>Administracion</div>
            <div className={styles.buttonsNavSucursal}>
              <Button
                onClick={handleShowCategorias}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1.5rem",
                  height: "7vh",
                  width: "15vw",
                  border: "solid 1px",
                }}
                variant="dark"
              >
                Categorias
              </Button>
              <Button
                onClick={handleShowProductos}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1.5rem",
                  height: "7vh",
                  width: "15vw",
                  border: "solid 1px",
                }}
                variant="dark"
              >
                Productos
              </Button>
              <Button
                onClick={handleShowAlergenos}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1.5rem",
                  height: "7vh",
                  width: "15vw",
                  border: "solid 1px",
                }}
                variant="dark"
              >
                Alergenos
              </Button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.tableAlergenos}>
              {showProductos && (
                <ProductosSucursal
                  sucursal={sucursalActivo}
                  onSelect={() => setShowAlergenos(true)}
                />
              )}
              {showAlergenos && (
                <AlergenosSucursal
                  sucursal={sucursalActivo}
                  onSelect={() => setShowAlergenos(true)}
                />
              )}
              {showCategorias && (
                <CategoriasSucursal 
                sucursal={sucursalActivo}
                onSelect={() => setShowAlergenos(true)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
