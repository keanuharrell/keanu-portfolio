import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Skills: React.FC = () => {
  return (
    <section className="section-padding">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Skills</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill.name} className="text-neutral-600">
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-neutral-200">
          <h3 className="text-lg font-semibold mb-4">Certifications</h3>
          <ul className="space-y-2">
            {portfolioData.certifications.map((cert) => (
              <li key={cert.name} className="text-neutral-600">
                {cert.name} <span className="text-neutral-400">({cert.status})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};