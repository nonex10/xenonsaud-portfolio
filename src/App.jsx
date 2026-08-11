import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";

export default function App() {
  return (
    <div className="min-h-screen bg-paper font-body">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
