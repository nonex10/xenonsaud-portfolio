import SectionHeading from "./SectionHeading";
import useReveal from "../hooks/useReveal";

const groups = [
  {
    title: "UX Design",
    items: ["User Flows", "Wireframing", "Information Architecture", "User-Centered Design", "Prototyping"],
  },
  {
    title: "UI Design",
    items: ["Visual Hierarchy", "Typography", "Color", "Layout", "Spacing", "Responsive Design", "Design Systems"],
  },
  {
    title: "Design Tools",
    items: ["Figma", "FigJam", "Canva"],
  },
  {
    title: "Development Knowledge",
    items: ["HTML", "CSS", "JavaScript", "React"],
  },
];

function SkillGroup({ group }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal">
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-plum">
        {group.title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {group.items.map((item) => (
          <li key={item} className="text-ink/85 text-[15px] pb-3 border-b border-line/70">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="py-24 md:py-32 border-t border-line">
      <div className="max-w-canvas mx-auto px-6 md:px-10">
        <SectionHeading eyebrow="Skills" title="Skills &amp; Tools" />

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {groups.map((g) => (
            <SkillGroup key={g.title} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
