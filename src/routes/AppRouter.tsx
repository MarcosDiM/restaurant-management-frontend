import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screen/Home/Home";
import { Sucursal } from "../components/screen/Sucursal/Sucursal";

export const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/sucursal" element={<Sucursal/>} />
		</Routes>
	);
};
