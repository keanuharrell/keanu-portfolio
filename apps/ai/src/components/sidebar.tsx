"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Search,
  Bot,
  Code,
  Database,
  Globe,
  FileText,
  Mail,
  Calculator,
  Image,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  Brain
} from "lucide-react";

const agentTypes = [
  {
    category: "Research & Analysis",
    icon: Search,
    items: [
      { name: "Web Researcher", icon: Globe, description: "Search and analyze web content", color: "bg-blue-500" },
      { name: "Data Analyst", icon: Database, description: "Process and analyze data", color: "bg-green-500" },
      { name: "Content Analyzer", icon: FileText, description: "Analyze documents and text", color: "bg-purple-500" },
    ]
  },
  {
    category: "Content Creation",
    icon: Sparkles,
    items: [
      { name: "Content Writer", icon: FileText, description: "Generate high-quality content", color: "bg-orange-500" },
      { name: "Code Generator", icon: Code, description: "Write and debug code", color: "bg-red-500" },
      { name: "Image Creator", icon: Image, description: "Generate and edit images", color: "bg-pink-500" },
    ]
  },
  {
    category: "Communication",
    icon: Mail,
    items: [
      { name: "Email Assistant", icon: Mail, description: "Draft and manage emails", color: "bg-cyan-500" },
      { name: "Social Media Manager", icon: Zap, description: "Create social content", color: "bg-violet-500" },
    ]
  }
];

const tools = [
  { name: "Web Search", icon: Search, description: "Search the internet" },
  { name: "Calculator", icon: Calculator, description: "Mathematical operations" },
  { name: "File Reader", icon: FileText, description: "Read and process files" },
  { name: "Database Query", icon: Database, description: "Query databases" },
  { name: "API Caller", icon: Globe, description: "Make HTTP requests" },
  { name: "Email Sender", icon: Mail, description: "Send emails" },
];

interface SidebarProps {
  onDragStart?: (type: string, data: any) => void;
}

export function Sidebar({ onDragStart }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["Research & Analysis"]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleDragStart = (e: React.DragEvent, type: 'agent' | 'tool', data: any) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
    onDragStart?.(type, data);
  };

  const filteredAgentTypes = agentTypes.map(category => ({
    ...category,
    items: category.items.filter(agent => 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r bg-muted/30 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold mb-3">Agent Palette</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search agents and tools..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* AI Agents */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Agents
            </h3>
            
            {filteredAgentTypes.map((category) => (
              <Collapsible 
                key={category.category}
                open={openCategories.includes(category.category)}
                onOpenChange={() => toggleCategory(category.category)}
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start p-2 h-auto mb-2 hover:bg-muted"
                  >
                    {openCategories.includes(category.category) ? (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-2" />
                    )}
                    <category.icon className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">{category.category}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {category.items.length}
                    </Badge>
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-2 ml-6">
                  {category.items.map((agent) => (
                    <div
                      key={agent.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'agent', agent)}
                      className="p-3 bg-background border border-border rounded-lg cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 ${agent.color} rounded-md flex items-center justify-center flex-shrink-0`}>
                          <agent.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium mb-1">{agent.name}</h4>
                          <p className="text-xs text-muted-foreground">{agent.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Tools
            </h3>
            
            <div className="space-y-2">
              {filteredTools.map((tool) => (
                <div
                  key={tool.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'tool', tool)}
                  className="p-3 bg-background border border-border rounded-lg cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                      <tool.icon className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}