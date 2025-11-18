import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Phone,
  Video,
  Users,
  Plus,
  Search,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function MessagesPage() {
  const researchGroups = [
    {
      id: "ml-lab",
      name: "ML Research Lab",
      members: 12,
      unread: 3,
      channels: [
        { name: "general", unread: 2 },
        { name: "papers", unread: 1 },
        { name: "experiments", unread: 0 },
        { name: "random", unread: 0 },
      ],
    },
    {
      id: "quantum-team",
      name: "Quantum Computing Team",
      members: 8,
      unread: 0,
      channels: [
        { name: "general", unread: 0 },
        { name: "hardware", unread: 0 },
        { name: "algorithms", unread: 0 },
      ],
    },
  ];

  const directMessages = [
    {
      id: "sarah-chen",
      name: "Dr. Sarah Chen",
      status: "online",
      lastMessage: "Thanks for sharing the paper!",
      time: "2m ago",
      unread: 1,
    },
    {
      id: "michael-rodriguez",
      name: "Prof. Michael Rodriguez",
      status: "away",
      lastMessage: "Let's schedule a meeting next week",
      time: "1h ago",
      unread: 0,
    },
    {
      id: "emily-johnson",
      name: "Dr. Emily Johnson",
      status: "offline",
      lastMessage: "The results look promising",
      time: "3h ago",
      unread: 0,
    },
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "Dr. Sarah Chen",
      content:
        "Hey everyone! I just published our latest findings on neural architecture search. Would love to get your thoughts on the methodology.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Congratulations Sarah! I'll take a look at it this afternoon. The abstract looks very promising.",
      time: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Prof. Michael Rodriguez",
      content:
        "This is excellent work. The quantum-inspired optimization approach is particularly interesting. Have you considered applying it to larger datasets?",
      time: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Dr. Sarah Chen",
      content:
        "Thanks Michael! Yes, we're planning to scale it up. Actually, would you be interested in collaborating on the next phase?",
      time: "10:37 AM",
      isOwn: false,
    },
  ];

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold text-foreground">Sociolect</h1>
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 text-sm"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Research Groups */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                Research Groups
              </h3>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {researchGroups.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer transition-colors">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{group.name}</span>
                    </div>
                    {group.unread > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {group.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Direct Messages */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                Direct Messages
              </h3>
              <Button size="sm" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <div
                  key={dm.id}
                  className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&query=professional academic portrait`}
                      />
                      <AvatarFallback className="text-xs">
                        {dm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border border-card ${
                        dm.status === "online"
                          ? "bg-green-500"
                          : dm.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{dm.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {dm.time}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {dm.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">general</h2>
              <p className="text-xs text-muted-foreground">
                ML Research Lab • 12 members
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Audio
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-sm bg-transparent"
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.isOwn ? "flex-row-reverse" : ""
                }`}
              >
                {!message.isOwn && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32&query=professional academic portrait`}
                    />
                    <AvatarFallback className="text-xs">
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`flex-1 max-w-md ${
                    message.isOwn ? "text-right" : ""
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    {message.sender}
                  </p>
                  <div
                    className={`p-3 rounded text-sm ${
                      message.isOwn
                        ? "bg-primary text-primary-foreground ml-auto w-fit"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-2">
            <Input placeholder="Message..." className="text-sm" />
            <Button size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
