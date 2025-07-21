"use client";

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";
import { Navigation } from "@/components/navigation";

export default function LandingPage() {
  const handleGetStarted = () => {
    // Redirect to builder page (will require auth)
    window.location.href = '/builder';
  };

  const handleDemo = () => {
    // Scroll to features or open demo modal
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        <HeroSection />
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <CTASection />
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-semibold text-gradient">Orchestr.ai</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The visual platform for building AI agent workflows.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Features</div>
                <div>Pricing</div>
                <div>Documentation</div>
                <div>API</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Community</div>
                <div>Tutorials</div>
                <div>Examples</div>
                <div>Support</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Orchestr.ai. Built by Keanu Harrell.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <div>Privacy Policy</div>
              <div>Terms of Service</div>
              <div>Cookie Policy</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}