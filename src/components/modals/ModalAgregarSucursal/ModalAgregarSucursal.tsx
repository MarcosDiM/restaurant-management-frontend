// src/components/modals/ModalAgregarSucursal/ModalAgregarSucursal.tsx
import { FC, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ICreateSucursal } from "../../../types/dtos/sucursal/ICreateSucursal";
import { IPais } from "../../../types/IPais";
import { IProvincia } from "../../../types/IProvincia";
import { ILocalidad } from "../../../types/ILocalidad";
import { LocalidadesService } from "../../../services/LocalidadesService";
import { ProvinciaService } from "../../../services/ProvinciaService";
import { PaisService } from "../../../services/PaisService";
import { SucursalService } from "../../../services/SucursalService";
import styles from "./ModalAgregarSucursal.module.css";
import { removeImageActivo, setImageStringActivo } from "../../../redux/slices/ImageReducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { UploadImageCompany } from "../../ui/UploadImage/UploadImageEmpresa";

interface ModalAgregarSucursalProps {
  show: boolean;
  handleClose: () => void;
  onSave: (sucursal: ICreateSucursal) => void;
  idEmpresa: number;
}

export const ModalAgregarSucursal: FC<ModalAgregarSucursalProps> = ({
  show,
  handleClose,
  onSave,
  idEmpresa,
}) => {

  const dispatch = useAppDispatch()
  const [nuevaSucursal, setNuevaSucursal] = useState<ICreateSucursal>({
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    esCasaMatriz: false,
    latitud: 0,
    longitud: 0,
    domicilio: {
      calle: "",
      numero: 0,
      cp: 0,
      piso: 0,
      nroDpto: 0,
      idLocalidad: 0,
    },
    idEmpresa: idEmpresa,
    logo: null,
  });

  const empresaActiva = useAppSelector((state)=> state.empresas.empresaActiva)

  const [paises, setPaises] = useState<IPais[]>([]);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);
  const [selectedPais, setSelectedPais] = useState<number | null>(null);
  const [selectedProvincia, setSelectedProvincia] = useState<number | null>(null);

  useEffect(() => {
    const fetchPaises = async () => {
      const paisService = new PaisService();
      const paisesData = await paisService.getAllPaises();
      setPaises(paisesData);
    };
    fetchPaises();
  }, []);

  useEffect(() => {
    const fetchProvincias = async () => {
      if (selectedPais) {
        const provinciaService = new ProvinciaService();
        const provinciasData = await provinciaService.getProvinciaByPais(selectedPais);
        setProvincias(provinciasData);
        setLocalidades([]);
      }
    };
    fetchProvincias();
  }, [selectedPais]);

  useEffect(() => {
    const fetchLocalidades = async () => {
      if (selectedProvincia) {
        const localidadesService = new LocalidadesService();
        const localidadesData = await localidadesService.getLocalidadesByProvincia(selectedProvincia);
        setLocalidades(localidadesData);
      }
    };
    fetchLocalidades();
  }, [selectedProvincia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNuevaSucursal((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeDomicilio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevaSucursal((prev) => ({
      ...prev,
      domicilio: {
        ...prev.domicilio,
        [name]: value,
      },
    }));
  };

  const handleSelectPais = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement;
    const paisId = Number(target.value);
    setSelectedPais(paisId);
    setNuevaSucursal((prev) => ({
      ...prev,
      domicilio: { ...prev.domicilio, idLocalidad: 0 },
    }));
    setSelectedProvincia(null);
  };

  const handleSelectProvincia = (e: React.ChangeEvent<HTMLElement>) => {
    const target = e.target as HTMLSelectElement;
    const provinciaId = Number(target.value);
    setSelectedProvincia(provinciaId);
    setNuevaSucursal((prev) => ({
      ...prev,
      domicilio: { ...prev.domicilio, idLocalidad: 0 },
    }));
  };

  const handleImageSet = (image: string | null) => {
		if (image) {
			setNuevaSucursal((prev) => ({ ...prev, logo: image }));
			dispatch(setImageStringActivo(image));
		} else {
			console.error("Error: la imagen no es válida.");
			setNuevaSucursal((prev) => ({ ...prev, logo: "" }));
			dispatch(removeImageActivo()); 
		}
	};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sucursalService = new SucursalService();
      const respuesta = await sucursalService.createSucursal(nuevaSucursal);
      if (respuesta) {
        onSave(nuevaSucursal);
        handleClose();
        setNuevaSucursal({
          nombre: "",
          horarioApertura: "",
          horarioCierre: "",
          esCasaMatriz: false,
          latitud: 0,
          longitud: 0,
          domicilio: {
            calle: "",
            numero: 0,
            cp: 0,
            piso: 0,
            nroDpto: 0,
            idLocalidad: 0,
          },
          idEmpresa: idEmpresa,
          logo: null,
        });
        setSelectedPais(null);
        setSelectedProvincia(null);
      } else {
        console.error("Error al agregar la sucursal");
      }
    } catch (error) {
      console.error("Error en la creación de la sucursal", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={styles.modalHeader} closeButton>
        <Modal.Title className={styles.modalTitle}>Agregar Sucursal</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Nombre</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="text"
              name="nombre"
              value={nuevaSucursal.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formHorarioApertura" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Horario de Apertura</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="time"
              name="horarioApertura"
              value={nuevaSucursal.horarioApertura}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formHorarioCierre" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Horario de Cierre</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="time"
              name="horarioCierre"
              value={nuevaSucursal.horarioCierre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEsCasaMatriz" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Es Casa Matriz</Form.Label>
            <Form.Check
              type="checkbox"
              name="esCasaMatriz"
              checked={nuevaSucursal.esCasaMatriz}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLatitud" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Latitud</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="latitud"
              value={nuevaSucursal.latitud}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLongitud" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Longitud</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="longitud"
              value={nuevaSucursal.longitud}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCalle" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Calle</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="text"
              name="calle"
              value={nuevaSucursal.domicilio.calle}
              onChange={handleChangeDomicilio}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNumero" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Número</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="numero"
              value={nuevaSucursal.domicilio.numero}
              onChange={handleChangeDomicilio}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCP" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Código Postal</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="cp"
              value={nuevaSucursal.domicilio.cp}
              onChange={handleChangeDomicilio}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPiso" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Piso</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="piso"
              value={nuevaSucursal.domicilio.piso}
              onChange={handleChangeDomicilio}
            />
          </Form.Group>

          <Form.Group controlId="formNroDpto" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Número Departamento</Form.Label>
            <Form.Control
              className={styles.formControl}
              type="number"
              name="nroDpto"
              value={nuevaSucursal.domicilio.nroDpto}
              onChange={handleChangeDomicilio}
            />
          </Form.Group>

          <Form.Group controlId="formPais" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>País</Form.Label>
            <Form.Control
              className={styles.formControl}
              as="select"
              value={selectedPais || ""}
              onChange={handleSelectPais}
              required
            >
              <option value="">Seleccionar País</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formProvincia" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Provincia</Form.Label>
            <Form.Control
              className={styles.formControl}
              as="select"
              value={selectedProvincia || ""}
              onChange={handleSelectProvincia}
              required
            >
              <option value="">Seleccionar Provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.id} value={provincia.id}>
                  {provincia.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formLocalidad" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Localidad</Form.Label>
            <Form.Control
              className={styles.formControl}
              as="select"
              name="idLocalidad"
              value={nuevaSucursal.domicilio.idLocalidad || ""}
              onChange={handleChangeDomicilio}
              required
            >
              <option value="">Seleccionar Localidad</option>
              {localidades.map((localidad) => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formLogo" className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Logo</Form.Label>
            <UploadImageCompany 
              image={nuevaSucursal.logo}
              setImage={handleImageSet}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className={styles.submitButton}>
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
