import { FC } from "react";
import { IImagen } from "../../../types/IImagen";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ImageService } from "../../../services/ImageService";
import Swal from "sweetalert2";
import {
	removeImageActivo,
	setImageStringActivo,
} from "../../../redux/slices/ImageReducer";
import { Button } from "@mui/material";
import imageProblem from "../../../assets/images/imageProblem.jpg";

interface IUploadImage {
	image?: string | null;
	setImage?: (image: string | null) => void; 
	imageObjeto?: IImagen | null; 
	setImageObjeto?: (image: IImagen | null) => void;
	typeElement?: string; 
}

// Componente funcional que permite subir y eliminar imágenes
export const UploadImageCompany: FC<IUploadImage> = ({
	image,
	setImage,
	imageObjeto,
	setImageObjeto,
	typeElement,
}) => {
	
	const imageService = new ImageService("images");
	const empresaActiva = useAppSelector((state) => state.empresas.empresaActiva);
	const dispatch = useAppDispatch();

	
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("uploads", file); 

			Swal.fire({
				title: "Subiendo...",
				didOpen: () => {
					Swal.showLoading(); 
				},
			});

			try {
				
				const data = await imageService.uploadImage(formData);

				
				if (setImage) {
					setImage(data);
					dispatch(setImageStringActivo(data));
				}

				
				if (setImageObjeto) {
					setImageObjeto({
						url: data,
						name: file.name,
					});
				}
			} catch (error) {
				console.log(error); 
			}

			Swal.close(); 
		}
	};


	// Función para manejar la eliminación de la imagen
	const handleDeleteImagen = async () => {
		
		if (imageObjeto && setImageObjeto && empresaActiva && typeElement) {
			await imageService
				.deleteImgItems(empresaActiva.id, imageObjeto.url, typeElement)
				.then(() => {
					setImageObjeto(null);
					dispatch(removeImageActivo());
				});
		}

		else if (image && setImage) {
			await imageService.deleteImgCloudinary(image).then(() => {
				setImage(null);
			});
		}
	};

	return (
		<div
			style={{
				width: "100%",
				border: "1px solid #9d9d9d",
				borderRadius: ".4rem",
				padding: ".4rem",
				height: "155px",
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
			}}>
	
			{image || imageObjeto ? (
				<div
					style={{
						borderRadius: ".4rem",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						padding: ".4rem",
					}}>
					<div style={{ width: "100%" }}>
						<Button
							onClick={handleDeleteImagen} 
							variant="outlined"
							color="error">
							Eliminar imagen
						</Button>
					</div>
					<img
						src={imageObjeto ? imageObjeto.url : image!} 
						alt="Uploaded"
						style={{
							backgroundColor: "#ccc",
							width: "10vw",
							borderRadius: ".4rem",
							height: "10vh",
							objectFit: "fill",
							marginTop: "10px",
						}}
					/>
				</div>
			) : (
				<>
					
					<input
						accept="image/*"
						style={{ display: "none" }}
						id="contained-button-file"
						type="file"
						onChange={handleFileChange} 
					/>
					<label htmlFor="contained-button-file">
						<Button variant="outlined" component="span">
							Elige una imagen
						</Button>
					</label>
					<div>
						<img
							src={imageProblem}
							alt="Uploaded"
							style={{ maxWidth: "100px", height: "auto" }}
						/>
					</div>
				</>
			)}
		</div>
	);
};
