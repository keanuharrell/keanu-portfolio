"use client";

import { useState, useCallback, useEffect } from "react";
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Navigation } from "@/components/navigation";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import Kibo UI AI components
import { AIConversation } from "@/components/ui/kibo-ui/ai/conversation";
import { AIMessage } from "@/components/ui/kibo-ui/ai/message";
import { AIInput } from "@/components/ui/kibo-ui/ai/input";
import { AIResponse } from "@/components/ui/kibo-ui/ai/response";
import { AISuggestion } from "@/components/ui/kibo-ui/ai/suggestion";

import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Play, 
  Pause,
  RotateCcw,
  Sparkles 
} from "lucide-react";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'agentNode',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Start Agent',
      type: 'start',
      description: 'Beginning of the workflow'
    }
  }
];

const initialEdges: Edge[] = [];

// Custom node component for agents
const AgentNode = ({ data }: { data: any }) => {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start': return 'bg-green-500';
      case 'research': return 'bg-blue-500';
      case 'content': return 'bg-purple-500';
      case 'analysis': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="agent-node px-4 py-3 shadow-md rounded-md min-w-[200px]">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 ${getNodeColor(data.type)} rounded-lg flex items-center justify-center`}>
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-muted-foreground mt-1">
              {data.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  agentNode: AgentNode,
};

export default function BuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isRunning, setIsRunning] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'ai' as const,
      content: "Hello! I'm your AI assistant. I can help you build and optimize your agent workflows. What would you like to create today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/json');
      if (!type) return;

      const parsedData = JSON.parse(type);
      const position = { 
        x: event.clientX - 200, 
        y: event.clientY - 100 
      };

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type: 'agentNode',
        position,
        data: {
          label: parsedData.data.name,
          type: parsedData.type,
          description: parsedData.data.description,
          ...parsedData.data
        }
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const handleRunWorkflow = () => {
    setIsRunning(true);
    
    // Simulate workflow execution
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'ai' as const,
        content: "Workflow executed successfully! Your agents processed the tasks and generated the following results...",
        timestamp: new Date()
      }]);
      setIsRunning(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: "I understand you want to " + inputValue.toLowerCase() + ". Let me help you set that up in your workflow.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const suggestions = [
    "Create a content marketing crew",
    "Build a data analysis workflow", 
    "Set up email automation",
    "Generate social media content"
  ];

  return (
    <div className="h-screen flex flex-col">
      <Navigation 
        onRun={handleRunWorkflow}
        onSave={() => console.log('Save workflow')}
        onExport={() => console.log('Export workflow')}
        isRunning={isRunning}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar onDragStart={(type, data) => console.log('Drag start:', type, data)} />
        
        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Background />
            <Controls />
            <MiniMap 
              nodeColor={(node) => node.data.color || '#64748b'}
              className="!bg-muted"
            />
          </ReactFlow>

          {/* Empty state */}
          {nodes.length <= 1 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Card className="p-8 text-center max-w-md pointer-events-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Start Building Your Crew</h3>
                <p className="text-muted-foreground mb-4">
                  Drag agents from the sidebar to create your AI workflow
                </p>
                <Button size="sm" onClick={() => setShowChat(true)}>
                  Get Help from AI
                </Button>
              </Card>
            </div>
          )}
        </div>

        {/* AI Chat Panel */}
        {showChat && (
          <div className="w-96 border-l bg-muted/30 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="font-medium">AI Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowChat(false)}
              >
                ✕
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <AIMessage
                    key={message.id}
                    type={message.type}
                    timestamp={message.timestamp}
                  >
                    {message.content}
                  </AIMessage>
                ))}
                
                {isRunning && (
                  <AIMessage type="ai" timestamp={new Date()}>
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                      Running your workflow...
                    </div>
                  </AIMessage>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t space-y-3">
              {/* Suggestions */}
              <div className="flex flex-wrap gap-2">
                {suggestions.slice(0, 2).map((suggestion) => (
                  <AISuggestion 
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                  >
                    {suggestion}
                  </AISuggestion>
                ))}
              </div>

              {/* Input */}
              <AIInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={handleSendMessage}
                placeholder="Ask me anything about building workflows..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}