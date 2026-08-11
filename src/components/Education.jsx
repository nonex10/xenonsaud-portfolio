import useReveal from "../hooks/useReveal";

export default function Education() {
  const ref = useReveal();
  return (
    <section className="py-20 md:py-24 border-t border-line">
      <div className="max-w-canvas mx-auto px-6 md:px-10">
        <div ref={ref} className="reveal flex flex-col md:flex-row md:items-baseline md:justify-between gap-6 max-w-2xl">
          <div>
            <p className="text-xs tracking-[0.18em] uppercase text-mute font-semibold mb-3">
              Education
            </p>
            <h3 className="font-display text-xl font-bold tracking-tightest2 text-ink">
              Bachelor's Degree, BIT/CSIT
            </h3>
            <p className="text-mute mt-1.5">Padmakanya Multiple Campus, Tribhuvan University</p>
          </div>
          <div className="text-sm text-mute md:text-right">
            <p>2022 – Present</p>
            <p>Kathmandu, Nepal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
