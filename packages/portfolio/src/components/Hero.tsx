import React, { useState, useEffect } from "react";
import { portfolioData } from "../data/portfolio";
import { TypingEffect } from "./TypingEffect";
import { Button } from "./ui/button";

export const Hero: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after typing animation completes
    const timer = setTimeout(
      () => {
        setShowContent(true);
      },
      portfolioData.personal.name.length * 120 + 500,
    ); // typing speed * length + delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container-width text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 font-mono">
          <TypingEffect
            text={portfolioData.personal.name}
            speed={120}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
          />
        </h1>

        <div
          className={`transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            {portfolioData.personal.title}
          </p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {portfolioData.personal.bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="link" size="sm">
              <a href={`mailto:${portfolioData.personal.email}`}>Email</a>
            </Button>
            <Button asChild variant="link" size="sm">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button asChild variant="link" size="sm">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
