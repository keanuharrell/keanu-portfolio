import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolio";
import { Github, ExternalLink } from "lucide-react";
import * as Icons from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(
    new Set(),
  );
  const projectRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers = new Map();

    projectRefs.current.forEach((element, id) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => new Set(prev).add(id));
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as React.ComponentType<{
      className?: string;
    }>;
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <Card
                key={project.id}
                ref={(el) => {
                  if (el) projectRefs.current.set(project.id, el);
                }}
                className={`group relative p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 hover:border-accent ${
                  visibleProjects.has(project.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: visibleProjects.has(project.id)
                    ? `${index * 150}ms`
                    : "0ms",
                }}
              >
                {/* Icon header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-primary transition-colors duration-300">
                    <span className="text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300">
                      {getIcon(project.icon)}
                    </span>
                  </div>
                  <Badge variant="ghost" className="font-mono font-normal">
                    {project.date}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.longDescription}
                </p>

                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground text-xs leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-muted-foreground/50 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="font-normal">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  {project.github && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo</span>
                      </a>
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};
