"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Save, 
  Settings, 
  Share, 
  Download,
  Menu,
  X,
  Workflow
} from "lucide-react";

interface NavigationProps {
  onSave?: () => void;
  onRun?: () => void;
  onExport?: () => void;
  isRunning?: boolean;
}

export function Navigation({ 
  onSave, 
  onRun, 
  onExport, 
  isRunning = false 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background/80 backdrop-blur-custom sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">
                <span className="text-gradient">Orchestr.ai</span>
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Beta
              </Badge>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onSave}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            
            <Button 
              variant={isRunning ? "secondary" : "default"}
              size="sm"
              onClick={onRun}
              disabled={isRunning}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isRunning ? "Running..." : "Run Crew"}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onExport}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            <div className="w-px h-6 bg-border mx-2" />
            
            <Button variant="ghost" size="icon">
              <Share className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in">
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onSave}
                className="justify-start gap-2"
              >
                <Save className="w-4 h-4" />
                Save Workflow
              </Button>
              
              <Button 
                variant={isRunning ? "secondary" : "default"}
                size="sm"
                onClick={onRun}
                disabled={isRunning}
                className="justify-start gap-2"
              >
                <Play className="w-4 h-4" />
                {isRunning ? "Running..." : "Run Crew"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={onExport}
                className="justify-start gap-2"
              >
                <Download className="w-4 h-4" />
                Export Code
              </Button>

              <div className="w-full h-px bg-border my-2" />
              
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
              
              <Button variant="ghost" size="sm" className="justify-start gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}