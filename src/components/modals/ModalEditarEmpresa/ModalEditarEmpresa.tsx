import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import style from "./ModalEditarEmpresa.module.css"
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";

interface ModalEditarEmpresaProps {
    show: boolean;
    handleClose: () => void;
    onSave: (empresa: IEmpresa) => void;
    empresaInicial: IEmpresa;
}

export const ModalEditarEmpresa: FC<ModalEditarEmpresaProps> = ({
    show,
    handleClose,
    onSave,
    empresaInicial,
    }) => {
    const [empresa, setEmpresa] = useState(empresaInicial);

    useEffect(() => {
        setEmpresa(empresaInicial); 
    }, [empresaInicial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmpresa((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>
                setEmpresa((prev) => ({ ...prev, logo: reader.result as string }));
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        onSave(empresa);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header className={style.modalHeader}>
            <Modal.Title>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese un nombre"
                        name="nombre"
                        value={empresa.nombre}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese razon social"
                        name="razonSocial"
                        value={empresa.razonSocial}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese CUIT"
                        name="cuit"
                        value={empresa.cuit}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="file"
                        className="form-control"
                        placeholder="Ingrese una imagen"
                        onChange={handleImageChange}
                />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer className={style.modalFooter}>
            <Button
                variant="danger"
                className={style.closeButton}
                onClick={handleClose}
            >
                CERRAR
            </Button>
            <Button
                variant="success"
                className={style.confirmButton}
                onClick={handleSave}
            >
                CONFIRMAR
            </Button>
        </Modal.Footer>
    </Modal>
    );
};