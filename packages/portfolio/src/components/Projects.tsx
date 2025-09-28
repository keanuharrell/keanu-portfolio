import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Projects: React.FC = () => {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Projects</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {portfolioData.projects.filter(p => p.featured).map((project) => (
            <div key={project.id}>
              <h3 className="text-xl font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-neutral-600 mb-4">
                {project.longDescription}
              </p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-neutral-600 text-sm leading-relaxed">
                    • {highlight}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-white text-neutral-600 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
                >
                  View on GitHub →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};