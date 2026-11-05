import useReveal from "../hooks/useReveal";

export default function SectionHeading({ eyebrow, title, supporting, align = "left" }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="text-xs tracking-[0.18em] uppercase text-plum font-semibold mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tightest2 text-ink">
        {title}
      </h2>
      {supporting && <p className="text-mute mt-4 text-base leading-relaxed">{supporting}</p>}
    </div>
  );
}
