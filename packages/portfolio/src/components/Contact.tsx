import React from "react";
import { portfolioData } from "../data/portfolio";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export const Contact: React.FC = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Contact</h2>

        <div className="max-w-xl">
          <p className="text-muted-foreground mb-8">
            I'm always interested in hearing about new DevOps challenges and
            cloud infrastructure projects.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                {portfolioData.personal.email}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                {portfolioData.personal.phone}
              </a>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground text-sm mb-4">Connect</p>
              <div className="flex gap-3">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={portfolioData.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href={portfolioData.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
