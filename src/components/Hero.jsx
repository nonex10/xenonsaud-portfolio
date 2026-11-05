import { Link } from "react-router-dom";
import { MousePointer2 } from "lucide-react";
import useReveal from "../hooks/useReveal";

function HeroComposition() {
  return (
    <div className="relative w-full h-[420px] md:h-[480px] select-none" aria-hidden="true">
      {/* base canvas frame */}
      {/* <div className="absolute right-0 top-6 w-[78%] h-[70%] bg-[#F3EEE4] border border-line rounded-[3px] shadow-[0_30px_60px_-30px_rgba(25,23,26,0.25)] rotate-[1.5deg]">
        <div className="h-8 border-b border-line/70 flex items-center gap-1.5 px-3">
          <span className="w-2 h-2 rounded-full bg-mute/30" />
          <span className="w-2 h-2 rounded-full bg-mute/30" />
          <span className="w-2 h-2 rounded-full bg-mute/30" />
        </div>
        <div className="p-5 grid grid-cols-3 gap-3">
          <div className="col-span-2 h-24 rounded-sm bg-plum/90" />
          <div className="h-24 rounded-sm bg-[#E8E1D3]" />
          <div className="h-14 rounded-sm bg-[#E8E1D3]" />
          <div className="h-14 rounded-sm bg-[#E8E1D3]" />
          <div className="h-14 rounded-sm bg-plum/20" />
        </div>
      </div> */}
      <div className="absolute top-0 left-0 w-full h-[410px] bg-paper border border-line rounded-[3px] overflow-hidden shadow-[0_24px_48px_-24px_rgba(25,23,26,0.2)] rotate-1">
        <img
          src="/images/aura-beauty/homepage.png"
          alt="Aura Beauty homepage design"
          className="w-full h-full object-contain"
        />
      </div>


      <div className="absolute left-0 top-[-10px] z-20 w-[46%] bg-paper border border-line rounded-[3px] overflow-hidden shadow-[0_24px_48px_-24px_rgba(25,23,26,0.2)] -rotate-2">
        <img
          src="/images/combine/homepagee.png"
          alt="Aura Beauty homepage design"
          className="w-full h-auto block"
        />
      </div>

      {/* cursor artifact */}
      {/* <div className="absolute right-10 bottom-8 flex items-center gap-2 bg-ink text-paper text-xs px-2.5 py-1.5 rounded-sm shadow-lg rotate-1">
        <MousePointer2 size={12} className="text-plum-light" fill="currentColor" />
        Xenon
      </div> */}
    </div>
  );
}

export default function Hero() {
  const ref = useReveal();
  return (
    <section className="pt-32 md:pt-44 pb-20 md:pb-28">
      <div className="max-w-canvas mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 items-center">
        <div ref={ref} className="reveal">
          <p className="text-xs tracking-[0.18em] uppercase text-plum font-semibold mb-5">
            UI/UX Designer
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tightest2 leading-[1.08] text-ink">
            Hi, I'm Xenon.
          </h1>
          <p className="font-display text-2xl md:text-[2rem] font-semibold tracking-tightest2 leading-snug text-ink mt-4">
            UI/UX designer crafting simple, thoughtful digital experiences.
          </p>
          <p className="text-mute text-base md:text-[1.05rem] leading-relaxed mt-6 max-w-md">
            I design clean and intuitive interfaces that balance user needs with
            visual clarity. I enjoy turning ideas into meaningful digital
            experiences through wireframing, prototyping, and thoughtful visual
            design.
          </p>

          <div className="flex items-center gap-2 mt-7">
            <span className="w-1.5 h-1.5 rounded-full bg-plum" />
            <p className="text-sm text-ink/70">Open to UI/UX internship opportunities</p>
          </div>

          <div className="flex flex-wrap gap-4 mt-9">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-plum text-paper text-sm font-medium px-6 py-3.5 rounded-sm hover:bg-plum-light transition-colors duration-200"
            >
              View My Work
            </a>
            <Link
              to="/contact"
              className="border border-ink/20 text-ink text-sm font-medium px-6 py-3.5 rounded-sm hover:border-plum hover:text-plum transition-colors duration-200"
            >
              Let's Connect
            </Link>
          </div>
        </div>

        <HeroComposition />
      </div>
    </section>
  );
}
