import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Experience: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Experience</h2>

        <div className="space-y-20">
          {portfolioData.experience.map((exp) => (
            <div key={exp.id} className="grid md:grid-cols-[200px_1fr] gap-8">
              <div className="text-neutral-500 text-sm">
                <p>{exp.period}</p>
                <p className="mt-2">{exp.location}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-1">
                  {exp.title}
                </h3>
                <p className="text-neutral-600 mb-6">
                  {exp.company}
                </p>

                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-neutral-600 leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>

                {exp.technologies && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-neutral-100 text-neutral-600 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};