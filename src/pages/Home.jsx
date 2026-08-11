import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import About from "../components/About";
import Process from "../components/Process";
import Skills from "../components/Skills";
import Education from "../components/Education";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Process />
      <Skills />
      <Education />
    </>
  );
}
