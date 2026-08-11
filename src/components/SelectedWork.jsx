import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import SectionHeading from "./SectionHeading";
import useReveal from "../hooks/useReveal";

function ProjectCard({ project, featured }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal group ${
        featured ? "grid md:grid-cols-2 gap-10 items-center" : ""
      }`}
    >
      {/* PROJECT IMAGE */}
      <Link
        to={`/work/${project.slug}`}
        className={`block ${
          featured ? "order-2 md:order-1" : ""
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-[3px] border border-line ${
            featured ? "aspect-[4/3]" : "aspect-[16/11]"
          }`}
        >
          <img
            src={project.image}
            alt={`${project.title} project`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      {/* PROJECT CONTENT */}
      <div className={featured ? "order-1 md:order-2" : "mt-5"}>
        <p className="text-xs text-mute font-medium tracking-wide">
          {project.number}
        </p>

        <Link
          to={`/work/${project.slug}`}
          className="group/link inline-block mt-2"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tightest2 text-ink group-hover/link:text-plum transition-colors duration-200">
            {project.title}
          </h3>
        </Link>

        <p className="text-xs uppercase tracking-[0.1em] text-mute mt-2">
          {project.category}
        </p>

        <p className="text-mute leading-relaxed mt-4 max-w-md">
          {project.description}
        </p>

        {/* CLICKABLE CASE STUDY LINK */}
        <Link
          to={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-plum mt-6 group/cta"
        >
          View Case Study

          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const [featuredProject, ...rest] = projects;

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* SECTION HEADING */}
        <SectionHeading
          eyebrow="Selected Work"
          title="Selected Work"
          description="A selection of interfaces and digital experiences I've designed and explored."
        />

        {/* AURA BEAUTY — FEATURED */}
        <div className="mt-16">
          <ProjectCard
            project={featuredProject}
            featured
          />
        </div>

        {/* WORKFOLIO + TASKORA */}
        <div className="grid md:grid-cols-2 gap-14 mt-20">
          {rest.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </div>

      </div>
    </section>
  );
}