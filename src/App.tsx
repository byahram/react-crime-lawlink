import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaseSearch from "./pages/CaseSearch";
import NotFound from "./pages/NotFound";
import RootLayout from "./components/RootLayout";
import CrimeStats from "./pages/CrimeStats";
import Analysis from "./pages/Analysis";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/crime-stats" element={<CrimeStats />} />
        <Route path="/case-search" element={<CaseSearch />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
