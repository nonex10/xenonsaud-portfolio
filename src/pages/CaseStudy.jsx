import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "../data/projects";
import useReveal from "../hooks/useReveal";

function Block({ eyebrow, title, children }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal py-12 border-t border-line first:border-t-0 first:pt-0">
      <div className="grid md:grid-cols-[5px_1fr] gap-6 md:gap-16">
        <p className="text-xs tracking-[0.14em] uppercase text-mute font-medium">
          {eyebrow}
        </p>
        <div>
          <h2 className="font-display text-xl md:text-2xl font-bold tracking-tightest2 text-ink mb-4">
            {title}
          </h2>
          <div className="text-mute leading-relaxed max-w-xl">{children}</div>
        </div>
      </div>
    </div>
  );
}

const structures = {
  "aura-beauty": [
    ["Overview", "overview"],
    ["Problem / Opportunity", "problem"],
    ["Goals", "goals"],
    ["User Flow", "userFlow"],
    ["Wireframes", "wireframes"],
    ["Visual Direction", "visualDirection"],
    ["Final UI", "finalUI"],
    ["Prototype", "prototype"],
    ["Reflection", "reflection"],
  ],
  workfolio: [
    ["Overview", "overview"],
    ["Design Challenge", "designChallenge"],
    ["Pages Designed", "pagesDesigned"],
    ["Before & After", "beforeAfter"],
    ["Design Approach", "designApproach"],
    ["Visual Direction", "visualDirection"],
    ["Final Design", "finalDesign"],
    ["Key Improvements", "improvements"],
    ["Reflection", "reflection"],
  ],
  taskora: [
    ["Overview", "overview"],
    ["Users", "users"],
    ["Problem", "problem"],
    ["User Roles", "userRoles"],
    ["User Flow", "userFlow"],
    ["Information Structure", "informationStructure"],
    ["Dashboard Design", "dashboardDesign"],
    ["Final UI", "finalUI"],
    ["Reflection", "reflection"],
  ],
};

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  const structure = structures[slug] || [];
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <article>
      <header className="pt-32 md:pt-40 pb-14 border-b border-line">
        <div className="max-w-canvas mx-auto px-6 md:px-10">
          <Link
            to="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-plum transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to work
          </Link>
          <p className="text-xs text-mute font-medium tracking-wide">{project.number}</p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tightest2 text-ink mt-2">
            {project.title}
          </h1>
          <p className="text-xs uppercase tracking-[0.1em] text-plum mt-4">{project.category}</p>
          <p className="text-mute leading-relaxed mt-5 max-w-xl text-[1.05rem]">
            {project.description}
          </p>
        </div>
      </header>

      <div className="max-w-canvas mx-auto px-6 md:px-10 py-14">
        <div className="rounded-[3px] overflow-hidden border border-line">
          <img
            src={project.image}
            alt={`${project.title} design`}
            className="w-full h-auto block"
          />
        </div>
      </div>

      <div className="max-w-canvas mx-auto px-6 md:px-10">
        {structure.map(([label, key], i) => {
          const content = project.case[key];
          return (
            <Block key={key} eyebrow={String(i + 1).padStart(2, "0")} title={label}>
              {Array.isArray(content) ? (
                <ul className="flex flex-col gap-2">
                  {content.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-plum mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{content}</p>
              )}
            </Block>
          );
        })}
      </div>

      <div className="border-t border-line py-16 mt-8">
        <div className="max-w-canvas mx-auto px-6 md:px-10 flex items-center justify-between">
          <div>
            <p className="text-xs text-mute uppercase tracking-[0.14em] mb-2">Next Project</p>
            <Link
              to={`/work/${next.slug}`}
              className="font-display text-2xl md:text-3xl font-bold tracking-tightest2 text-ink hover:text-plum transition-colors"
            >
              {next.title}
            </Link>
          </div>
          <Link
            to={`/work/${next.slug}`}
            className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:border-plum hover:text-plum transition-colors flex-shrink-0"
            aria-label={`View ${next.title} case study`}
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
