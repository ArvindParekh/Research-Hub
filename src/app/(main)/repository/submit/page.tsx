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
import { Upload, X, Plus } from "lucide-react";
import Link from "next/link";
import NavbarClient from "@/components/navbar-client";

export default function SubmitPaperPage() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [authors, setAuthors] = useState([{ name: "", affiliation: "" }]);
  const [status, setStatus] = useState("draft");

  const categories = [
    "Machine Learning",
    "Quantum Computing",
    "Neuroscience",
    "Computer Vision",
    "Natural Language Processing",
    "Robotics",
    "Bioinformatics",
    "Physics",
    "Mathematics",
    "Chemistry",
  ];

  const addKeyword = () => {
    if (currentKeyword.trim()) {
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
      <NavbarClient page="repositorySubmit" />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit a Paper</h1>
          <p className="text-muted-foreground">
            Share your research with the academic community. You can save as
            draft and submit for review later.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paper Title</CardTitle>
              <CardDescription>
                Enter the full title of your research paper
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Advanced Neural Architecture Search with Quantum-Inspired Optimization"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Abstract</CardTitle>
              <CardDescription>
                Provide a summary of your research (typically 150-250 words)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe the main contribution, methodology, and key findings..."
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                rows={6}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category & Keywords</CardTitle>
              <CardDescription>
                Select a category and add relevant keywords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Keywords
                </label>
                <div className="flex gap-2 mb-3">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Authors</CardTitle>
              <CardDescription>
                Add all authors and their affiliations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-4 border rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Author name"
                      value={author.name}
                      onChange={(e) => {
                        const newAuthors = [...authors];
                        newAuthors[index].name = e.target.value;
                        setAuthors(newAuthors);
                      }}
                    />
                    <Input
                      placeholder="Affiliation (optional)"
                      value={author.affiliation}
                      onChange={(e) => {
                        const newAuthors = [...authors];
                        newAuthors[index].affiliation = e.target.value;
                        setAuthors(newAuthors);
                      }}
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
              <CardTitle>PDF Upload</CardTitle>
              <CardDescription>Upload your paper in PDF format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium mb-1">Drag and drop your PDF here</p>
                <p className="text-sm text-muted-foreground">
                  or click to browse
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
              <CardDescription>
                Choose whether to save as draft or submit for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Save as Draft</SelectItem>
                  <SelectItem value="review">Submit for Review</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link href="/repository">Cancel</Link>
            </Button>
            <Button className="flex-1">
              {status === "draft" ? "Save as Draft" : "Submit for Review"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
