import React from 'react';
import { portfolioData } from '../data/portfolio';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container-width">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
          {portfolioData.personal.name}
        </h1>

        <p className="text-xl md:text-2xl text-neutral-600 mb-4">
          {portfolioData.personal.title}
        </p>

        <p className="text-lg text-neutral-500 max-w-2xl">
          {portfolioData.personal.bio}
        </p>

        <div className="mt-12 flex flex-wrap gap-6 text-sm">
          <a
            href={`mailto:${portfolioData.personal.email}`}
            className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
          >
            Email
          </a>
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
          >
            GitHub
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 underline underline-offset-4"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};