import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraMenu from "./components/ui/BarraMenu/BarraMenu";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import "./App.css";
import SimpleDashboard from "./components/Dashboard/SimpleDashboard";
import GraficaOne from "./pages/GraficaOne";
import GraficaTwo from "./pages/GraficaTwo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/example" element={<SimpleDashboard/>} />
        <Route path="/grafica1" element={<GraficaOne />} />
        <Route path="/grafica2" element={<GraficaTwo />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
