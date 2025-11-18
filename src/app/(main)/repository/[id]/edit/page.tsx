"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import NavbarClient from "@/components/navbar-client";
import { useParams } from "next/navigation";

export default function EditPaperPage() {
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState(
    "Advanced Neural Architecture Search with Quantum-Inspired Optimization",
  );
  const [abstract, setAbstract] = useState(
    "We present a novel approach to neural architecture search that leverages quantum-inspired optimization techniques...",
  );
  const [category, setCategory] = useState("machine-learning");
  const [keywords, setKeywords] = useState([
    "Neural Architecture Search",
    "Quantum Computing",
    "Optimization",
  ]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [authors, setAuthors] = useState([
    { name: "Dr. Sarah Chen", affiliation: "MIT" },
    { name: "Alex Thompson", affiliation: "MIT" },
  ]);

  const categories = [
    "Machine Learning",
    "Quantum Computing",
    "Neuroscience",
    "Computer Vision",
    "Natural Language Processing",
  ];

  const addKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addAuthor = () => {
    setAuthors([...authors, { name: "", affiliation: "" }]);
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarClient page="repositoryEdit" />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Edit Paper</h1>
              <p className="text-muted-foreground">
                Update your paper details. You can save changes at any time.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/repository/${params?.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Paper
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paper Title</CardTitle>
            </CardHeader>
            <CardContent>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abstract</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                rows={6}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keywords</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a keyword..."
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button type="button" variant="outline" onClick={addKeyword}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="gap-1">
                    {keyword}
                    <button
                      onClick={() => removeKeyword(index)}
                      className="hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-3 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <Input placeholder="Author name" value={author.name} />
                    <Input
                      placeholder="Affiliation (optional)"
                      value={author.affiliation}
                    />
                  </div>
                  {authors.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAuthor(index)}
                      className="mt-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addAuthor}
                className="w-full bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Author
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version Information</CardTitle>
              <CardDescription>
                Current version: v2 (Last updated: 2024-01-15)
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link href={`/repository/${params?.id}`}>Cancel</Link>
            </Button>
            <Button className="flex-1">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
