import { useEffect, useState } from "react";
import { Mail, Link2 } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
  const response = await fetch(
    "http://localhost/portfolio-api/send-email.php", // Send the form data to my PHP file
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const text = await response.text();

  console.log("PHP RAW RESPONSE:", text);

  const result = JSON.parse(text);

  if (result.success) {
    setStatus("sent");
    e.target.reset();
  } else {
    console.error(result.message);
    setStatus("error");
  }
} catch (error) {
  console.error(error);
  setStatus("error");
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
            className="self-start bg-plum text-paper text-sm font-medium px-7 py-3.5 rounded-sm hover:bg-plum-light transition-colors duration-200 mt-2"
          >
            Send Message
          </button>

          {status === "sending" && (
            <p className="text-sm text-mute" role="status">
              Sending message...
            </p>
          )}

          {status === "sent" && (
            <p className="text-sm text-plum" role="status">
              Thanks! Your message has been sent.
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-600" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
