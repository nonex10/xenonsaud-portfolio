import useReveal from "../hooks/useReveal";

function AboutArtifact() {
  return (
    <div className="order-2 md:order-1">
      <div className="relative max-w-sm mx-auto md:mx-0">
        <div className="overflow-hidden rounded-[3px] border border-line bg-paper shadow-[0_24px_48px_-24px_rgba(25,23,26,0.2)]">
          <img
            src="/images/profile_picture.jpeg"
            alt="Xenon"
            className="w-full aspect-[4/5] object-cover"
          />
        </div>

        {/* Small decorative accent */}
        <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-plum/10 border border-plum/20 rounded-[3px] -z-10" />
      </div>
    </div>
  );
}

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-canvas mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref} className="reveal order-2 md:order-1">
          <AboutArtifact />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-xs tracking-[0.18em] uppercase text-plum font-semibold mb-3">
            About
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest2 text-ink">
            About Me
          </h2>

          <div className="mt-6 flex flex-col gap-5 text-mute leading-relaxed max-w-lg">
            <p>
              I'm a UI/UX designer and BIT student who enjoys creating digital
              experiences that are simple, useful, and visually engaging.
            </p>
            <p>
              My interest in design started with understanding how people
              interact with websites and applications. Since then, I've been
              developing my skills in Figma, interface design, wireframing,
              prototyping, visual hierarchy, and responsive design.
            </p>
            <p>
              I also have a foundation in frontend development, including HTML,
              CSS, JavaScript, and React. This helps me understand how designs
              move from Figma into real products and communicate more
              effectively with developers.
            </p>
            <p>
              I'm currently looking for opportunities where I can learn from
              experienced designers, work on real-world products, and continue
              growing as a UI/UX designer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
