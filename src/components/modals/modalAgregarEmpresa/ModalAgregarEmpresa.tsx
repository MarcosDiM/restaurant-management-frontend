import { FC, useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { EmpresaService } from "../../../services/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
	removeImageActivo,
	setImageStringActivo,
} from "../../../redux/slices/ImageReducer";
import { removeEmpresaActiva } from "../../../redux/slices/empresasSlice";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";
import { UploadImageCompany } from "../../ui/UploadImage/UploadImageEmpresa"; // Importa tu componente

interface ModalAgregarEmpresaProps {
	show: boolean;
	handleClose: () => void;
}

export const ModalAgregarEmpresa: FC<ModalAgregarEmpresaProps> = ({
	show,
	handleClose,
}) => {
	const empresaService = new EmpresaService();
	const dispatch = useAppDispatch();
	const empresaActiva = useAppSelector((state) => state.empresas.empresaActiva);
	const imageActivo = useAppSelector((state) => state.image.imageStringActivo);

	const [nuevaEmpresa, setNuevaEmpresa] = useState<ICreateEmpresaDto>({
		nombre: "",
		razonSocial: "",
		cuit: "",
		logo: "",
	});


	useEffect(() => {
		if (empresaActiva) {
			setNuevaEmpresa({
				nombre: empresaActiva.nombre,
				razonSocial: empresaActiva.razonSocial,
				cuit: empresaActiva.cuit,
				logo: empresaActiva.logo || "",
			});
			if (empresaActiva.logo) {
				dispatch(setImageStringActivo(empresaActiva.logo));
			}
		}
	}, [empresaActiva, dispatch]);

	// Actualizar el estado de logo con la URL de la imagen cargada
	const handleImageSet = (image: string | null) => {
		if (image) {
			setNuevaEmpresa((prev) => ({ ...prev, logo: image }));
			dispatch(setImageStringActivo(image));
		} else {
			console.error("Error: la imagen no es válida.");
			setNuevaEmpresa((prev) => ({ ...prev, logo: "" })); 
			dispatch(removeImageActivo());
		}
	};


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (empresaActiva) {

				await empresaService.updateEmpresa(empresaActiva.id, {
					...nuevaEmpresa,
					logo: imageActivo,
				});
			} else {

				await empresaService.createEmpresa({
					...nuevaEmpresa,
					logo: imageActivo,
				});
			}
			handleClose(); 
			setNuevaEmpresa({
				nombre: "",
				razonSocial: "",
				cuit: "",
				logo: "",
			}); 
			dispatch(removeImageActivo());
			dispatch(removeEmpresaActiva());
		} catch (error) {
			console.error("Error al guardar la empresa:", error);
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{empresaActiva ? "Editar Empresa" : "Agregar Nueva Empresa"}
				</Modal.Title>
			</Modal.Header>
			<Form onSubmit={handleSubmit}>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Nombre</Form.Label>
						<Form.Control
							type="text"
							name="nombre"
							value={nuevaEmpresa.nombre}
							onChange={(e) =>
								setNuevaEmpresa((prev) => ({
									...prev,
									nombre: e.target.value,
								}))
							}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Razón Social</Form.Label>
						<Form.Control
							type="text"
							name="razonSocial"
							value={nuevaEmpresa.razonSocial}
							onChange={(e) =>
								setNuevaEmpresa((prev) => ({
									...prev,
									razonSocial: e.target.value,
								}))
							}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>CUIT</Form.Label>
						<Form.Control
							type="text"
							name="cuit"
							value={nuevaEmpresa.cuit}
							onChange={(e) =>
								setNuevaEmpresa((prev) => ({
									...prev,
									cuit: e.target.value,
								}))
							}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Logo</Form.Label>
						<UploadImageCompany
							image={nuevaEmpresa.logo}
							setImage={handleImageSet}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="primary" type="submit">
						{empresaActiva ? "Actualizar" : "Guardar"}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
