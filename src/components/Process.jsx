import SectionHeading from "./SectionHeading";
import useReveal from "../hooks/useReveal";

const steps = [
  {
    n: "01",
    title: "Understand",
    text: "I start by understanding the project, its purpose, target users, and the goals the design needs to achieve.",
  },
  {
    n: "02",
    title: "Explore",
    text: "I explore ideas, references, layouts, and visual directions to find an approach that fits the product and its users.",
  },
  {
    n: "03",
    title: "Design",
    text: "I move directly into high-fidelity design in Figma, focusing on layout, typography, color, hierarchy, spacing, and visual consistency.",
  },
  {
    n: "04",
    title: "Prototype",
    text: "I connect screens and interactions in Figma to turn the interface into a realistic and testable experience.",
  },
  {
    n: "05",
    title: "Refine",
    text: "I review the design, identify areas that can be improved, and refine the interface based on feedback and usability considerations.",
  },
];

function Step({ step, isLast }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal relative pl-8 pb-10 last:pb-0">
      {!isLast && (
        <span className="absolute left-[7px] top-3 bottom-0 w-px bg-line" aria-hidden="true" />
      )}
      <span
        className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-paper border-2 border-plum"
        aria-hidden="true"
      />
      <p className="text-xs text-mute font-medium tracking-wide mb-1.5">{step.n}</p>
      <h3 className="font-display text-lg font-bold tracking-tightest2 text-ink">{step.title}</h3>
      <p className="text-mute leading-relaxed mt-2 max-w-md">{step.text}</p>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-canvas mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="Process"
          title="My Design Process"
          supporting="A consistent sequence I follow from an open problem to a designed, prototyped interface."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-x-16">
          <div>
            {steps.slice(0, 3).map((s, i) => (
              <Step key={s.n} step={s} isLast={i === 2} />
            ))}
          </div>
          <div>
            {steps.slice(3).map((s, i) => (
              <Step key={s.n} step={s} isLast={i === 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
