import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Contact: React.FC = () => {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-width">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">Contact</h2>

        <div className="max-w-xl">
          <p className="text-neutral-600 mb-8">
            I'm always interested in hearing about new DevOps challenges and cloud infrastructure projects.
          </p>

          <div className="space-y-4">
            <div>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="text-neutral-900 hover:underline underline-offset-4"
              >
                {portfolioData.personal.email}
              </a>
            </div>

            <div>
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="text-neutral-900 hover:underline underline-offset-4"
              >
                {portfolioData.personal.phone}
              </a>
            </div>

            <div className="pt-4">
              <p className="text-neutral-500 text-sm mb-2">Connect</p>
              <div className="flex gap-4">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4 text-sm"
                >
                  GitHub
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4 text-sm"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};