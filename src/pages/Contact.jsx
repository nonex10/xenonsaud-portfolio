import { useEffect, useState } from "react";
import { Mail, Link2 } from "lucide-react";

// Set VITE_API_URL in Vercel (production) or .env.local (local testing).
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return; // block double submits

    const form = e.currentTarget;
    const data = {
      name: form.elements.namedItem("name").value.trim(),
      email: form.elements.namedItem("email").value.trim(),
      message: form.elements.namedItem("message").value.trim(),
    };

    // Quick checks in the browser (the server checks again).
    if (!data.name || !data.email || !data.message) {
      setStatus("error");
      setFeedback("Please fill in your name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        setStatus("sent");
        setFeedback(result.message || "Thanks! Your message has been sent.");
        form.reset();
      } else {
        const firstFieldError = result.errors && Object.values(result.errors)[0];
        setStatus("error");
        setFeedback(firstFieldError || result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Couldn't reach the server. Check your connection and try again.");
    }
  };

  return (
    <section className="pt-36 md:pt-44 pb-28">
      <div className="max-w-canvas mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-xs tracking-[0.18em] uppercase text-plum font-semibold mb-4">
            Contact
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tightest2 text-ink leading-[1.1]">
            Let's connect.
          </h1>
          <p className="text-mute leading-relaxed mt-6 max-w-sm">
            Have a project, opportunity, or idea you'd like to discuss? I'd love
            to hear from you.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <a
              href="mailto:xenusaud1010@gmail.com"
              className="flex items-center gap-3 text-ink/85 hover:text-plum transition-colors group"
            >
              <Mail size={18} className="text-plum" />
              <span className="text-[15px]">xenusaud1010@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/xenon-saud-645034289"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink/85 hover:text-plum transition-colors"
            >
              <Link2 size={18} className="text-plum" />
              <span className="text-[15px]">linkedin.com/in/xenon-saud</span>
            </a>
            <a
              href="https://github.com/nonex10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-ink/85 hover:text-plum transition-colors"
            >
              <Link2 size={18} className="text-plum" />
              <span className="text-[15px]">github.com/nonex10</span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink placeholder:text-mute/60 focus:border-plum outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink placeholder:text-mute/60 focus:border-plum outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="bg-transparent border-b border-line py-2.5 text-[15px] text-ink placeholder:text-mute/60 focus:border-plum outline-none transition-colors resize-none"
              placeholder="Tell me a little about the opportunity or project."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start disabled:opacity-60 disabled:cursor-not-allowed bg-plum text-paper text-sm font-medium px-7 py-3.5 rounded-sm hover:bg-plum-light transition-colors duration-200 mt-2"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {(status === "sent" || status === "error") && (
            <p
              className={`text-sm ${status === "sent" ? "text-plum" : "text-[#8A2B2B]"}`}
              role={status === "error" ? "alert" : "status"}
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
