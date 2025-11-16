import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolio";
import * as Icons from "lucide-react";

export const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{
      className?: string;
    }>;
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <section className="section-padding" ref={sectionRef}>
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Skills</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6">{category}</h3>
              <div className="space-y-5">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {getIcon(skill.icon)}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-border">
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          <ul className="space-y-2">
            {portfolioData.certifications.map((cert) => (
              <li key={cert.name} className="text-muted-foreground">
                {cert.name}{" "}
                <span className="text-muted-foreground/60">
                  ({cert.status})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
