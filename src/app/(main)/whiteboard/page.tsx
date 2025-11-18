"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  PenTool,
  Square,
  Circle,
  Type,
  Eraser,
  Undo,
  Redo,
  Download,
  Share,
  Users,
  MousePointer,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// import Navbar from "@/components/navbar";

export default function WhiteboardPage() {
  const [selectedTool, setSelectedTool] = useState("pen");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "pen", icon: PenTool, label: "Pen" },
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "text", icon: Type, label: "Text" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
  ];

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
  ];

  const collaborators = [
    { name: "Dr. Sarah Chen", status: "active", cursor: { x: 45, y: 30 } },
    { name: "Prof. Rodriguez", status: "viewing", cursor: null },
    { name: "Dr. Johnson", status: "active", cursor: { x: 70, y: 60 } },
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      {/* <Navbar /> */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Sociolect</h1>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h2 className="font-semibold">
                Neural Network Architecture Brainstorm
              </h2>
              <p className="text-sm text-muted-foreground">ML Research Lab</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Collaborators */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {collaborators.map((collaborator, index) => (
                  <Avatar
                    key={index}
                    className="w-8 h-8 border-2 border-background"
                  >
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&query=professional academic portrait`}
                    />
                    <AvatarFallback className="text-xs">
                      {collaborator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Badge variant="secondary" className="ml-2">
                {collaborators.length} online
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Toolbar */}
        <div className="w-16 border-r bg-card flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool(tool.id)}
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          ))}

          <Separator className="w-8 my-2" />

          {/* Color Palette */}
          <div className="grid grid-cols-2 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-4 h-4 rounded border-2 ${
                  selectedColor === color ? "border-foreground" : "border-muted"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <Separator className="w-8 my-2" />

          {/* Action Tools */}
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-10 h-10 p-0"
            title="Clear"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-white">
          {/* Canvas */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="w-full h-full cursor-crosshair"
              style={{
                background:
                  "radial-gradient(circle, #f0f0f0 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Sample drawing elements */}
              <rect
                x="100"
                y="100"
                width="200"
                height="150"
                fill="none"
                stroke="#0066cc"
                strokeWidth="2"
              />
              <text x="120" y="130" fontSize="14" fill="#333">
                Input Layer
              </text>

              <rect
                x="350"
                y="80"
                width="200"
                height="190"
                fill="none"
                stroke="#cc6600"
                strokeWidth="2"
              />
              <text x="370" y="110" fontSize="14" fill="#333">
                Hidden Layers
              </text>

              <rect
                x="600"
                y="120"
                width="150"
                height="110"
                fill="none"
                stroke="#009900"
                strokeWidth="2"
              />
              <text x="620" y="150" fontSize="14" fill="#333">
                Output Layer
              </text>

              {/* Arrows */}
              <path
                d="M300 175 L350 175"
                stroke="#666"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <path
                d="M550 175 L600 175"
                stroke="#666"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />

              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
                </marker>
              </defs>

              {/* Collaborator cursors */}
              {collaborators.map(
                (collaborator, index) =>
                  collaborator.cursor && (
                    <g key={index}>
                      <circle
                        cx={`${collaborator.cursor.x}%`}
                        cy={`${collaborator.cursor.y}%`}
                        r="4"
                        fill="#ff4444"
                      />
                      <text
                        x={`${collaborator.cursor.x}%`}
                        y={`${collaborator.cursor.y - 2}%`}
                        fontSize="12"
                        fill="#ff4444"
                        textAnchor="middle"
                      >
                        {collaborator.name.split(" ")[0]}
                      </text>
                    </g>
                  ),
              )}
            </svg>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-card border rounded-lg p-2">
            <Button variant="ghost" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-2">100%</span>
            <Button variant="ghost" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 border-l bg-card p-4">
          <h3 className="font-semibold mb-4">Properties</h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Stroke Width
              </label>
              <input
                type="range"
                min="1"
                max="10"
                defaultValue="2"
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full"
              />
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Layers</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-accent rounded">
                  <span className="text-sm">Neural Network</span>
                  <Button variant="ghost" size="sm">
                    👁
                  </Button>
                </div>
                <div className="flex items-center justify-between p-2 rounded">
                  <span className="text-sm">Annotations</span>
                  <Button variant="ghost" size="sm">
                    👁
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sarah added rectangle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Rodriguez added text</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Johnson moved element</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
