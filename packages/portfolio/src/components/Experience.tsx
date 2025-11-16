import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolio";
import { Briefcase, Calendar, MapPin, Sparkles, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const Experience: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers = new Map();

    itemRefs.current.forEach((element, id) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(element);
      observers.set(id, observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const hasCurrentPosition = portfolioData.experience.some(
    (exp) => exp.current,
  );
  const { availability } = portfolioData.personal;

  return (
    <section className="section-padding">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Experience</h2>

        {/* Availability Banner */}
        {!hasCurrentPosition && availability.isAvailable && (
          <Card className="mb-12 bg-gradient-to-r from-primary to-primary/90 border-none text-primary-foreground shadow-lg">
            <div className="p-8 flex items-start gap-4">
              <div className="p-3 bg-primary-foreground/10 rounded-lg">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  {availability.message}
                  <Badge variant="success" className="gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    Available
                  </Badge>
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Looking for challenging DevOps, Platform Engineering, or Cloud
                  Architecture roles. Specialized in AWS, Kubernetes, and
                  infrastructure automation.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <a
                    href={`mailto:${portfolioData.personal.email}?subject=Let's work together`}
                  >
                    <Mail className="w-4 h-4" />
                    Hire me
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="relative pl-8 md:pl-0">
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="hidden md:block absolute left-[232px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(exp.id, el);
                }}
                className={`relative transition-all duration-700 ${
                  visibleItems.has(exp.id)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: visibleItems.has(exp.id)
                    ? `${index * 200}ms`
                    : "0ms",
                }}
              >
                {/* Timeline dot - positioned differently on mobile vs desktop */}
                <div className="absolute -left-8 md:left-[232px] md:-translate-x-1/2 mt-1.5">
                  <div
                    className={`relative ${exp.current ? "animate-pulse" : ""}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        exp.current
                          ? "bg-neutral-900 border-neutral-900"
                          : "bg-white border-neutral-300"
                      }`}
                    />
                    {exp.current && (
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-neutral-900 opacity-25 animate-ping" />
                    )}
                  </div>
                </div>

                <div className="md:grid md:grid-cols-[220px_1fr] md:gap-12">
                  {/* Left column - Date & Location (on top on mobile, left on desktop) */}
                  <div className="mb-4 md:mb-0 space-y-2 md:pr-8">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                    {exp.current && (
                      <Badge variant="default" className="gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Current
                      </Badge>
                    )}
                  </div>

                  {/* Right column - Content */}
                  <Card className="p-6 hover:shadow-md hover:border-accent transition-all duration-300">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {exp.company}
                        </p>
                      </div>
                      <Badge variant="secondary">{exp.type}</Badge>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-muted-foreground/50 mt-1.5 text-xs">
                            •
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="font-normal"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
