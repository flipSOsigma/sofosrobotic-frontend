"use client";

import React, { useEffect, useState } from "react";
import DashboradSideBar from "@/components/dashboard-sidebar";
import { usePathname, useRouter } from "next/navigation";
import { INewsItem } from "@/lib/interfaces";

// Define available categories
const CATEGORIES = [
  "University",
  "Faculty",
  "Student Life",
  "Research",
  "Events",
  "Announcements",
  "Sports",
  "International",
  "Other"
];

const Page = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [data, setData] = useState<INewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const path = usePathname().split("/").pop();

  useEffect(() => {
    if (path) {
      fetch(`/api/news/${path}`)
        .then((res) => res.json())
        .then((newsData) => {
          setData(newsData.data);
          if (newsData.data?.imagePath) {
            setImagePreviews(newsData.data.imagePath);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch news:", err);
          setError("Failed to load news data");
        });
    }
  }, [path]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
      
      const urls = newFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...urls]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveExistingImage = (indexToRemove: number) => {
    setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    const now = new Date();

    // Append editable fields
    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("content", data.content || "");
    formData.append("category", data.category || CATEGORIES[0]);

    // Append new image files
    files.forEach((file) => {
      formData.append("images", file);
    });

    // Append existing images that haven't been removed
    const existingImages = imagePreviews.filter(url => !url.startsWith('blob:'));
    existingImages.forEach((imageUrl) => {
      formData.append("existingImages", imageUrl);
    });

    // Append other required fields
    formData.append("authorId", data.authorId || "John-Doe");
    formData.append("date", now.toISOString().split("T")[0]);
    formData.append("excerpt", data.description?.slice(0, 100) || "");
    formData.append("status", "published");
    formData.append("publishDate", now.toISOString().slice(0, 16));
    formData.append("updatedAt", now.toISOString());
    formData.append("views", data.views?.toString() || "0");

    try {
      const res = await fetch(`/api/news/${data.uniqueId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.description || "Failed to update news");
      }

      // const result = await res.json();
      alert("News updated successfully!");
      router.push("/dashboard/news");
    } catch (error) {
      console.error("Update error:", error);
      setError(error instanceof Error ? error.message : "Failed to update news");
    } finally {
      setIsLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="flex w-full">
        <DashboradSideBar />
        <div className="w-full flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      <DashboradSideBar />
      <div className="w-full flex flex-col p-8 gap-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Edit News Page</h1>
          <p className="text-muted-foreground">You are now editing news here</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-3xl">
          {/* Title Field */}
          <div className="flex flex-col w-full">
            <input 
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              type="text" 
              className="selection:bg-primary w-full text-4xl bg-transparent focus:outline-none" 
              placeholder="Add news title here" 
              id="news-title" 
            />
            <label htmlFor="news-title">News Title</label>
          </div>

          {/* Category Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="news-category">Category</label>
            <select
              id="news-category"
              value={data.category || CATEGORIES[0]}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              className="w-full border-b-2 px-4 border-l-2 py-4 pt-2 mt-2 border-border text-base bg-transparent focus:outline-none"
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Description Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="news-description">News Description</label>
            <input
              value={data.description || ""}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              type="text"
              className="selection:bg-primary w-full border-b-2 px-4 border-l-2 py-4 pt-2 mt-2 border-border text-base bg-transparent focus:outline-none"
              placeholder="Add news description here"
              id="news-description"
            />
          </div>

          {/* Content Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="news-content">News Content</label>
            <textarea
              rows={8}
              value={data.content || ""}
              onChange={(e) => setData({ ...data, content: e.target.value })}
              className="selection:bg-primary w-full border-b-2 px-4 border-l-2 py-4 pt-2 mt-2 border-border text-base bg-transparent hide-scrollbar focus:outline-none"
              placeholder="Add news content here"
              id="news-content"
            />
          </div>

          {/* Images Field */}
          <div className="flex flex-col w-full">
            <label htmlFor="news-images">News Images</label>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageChange} 
              className="selection:bg-primary w-full border-b-2 px-4 border-l-2 py-4 pt-2 mt-2 border-border text-base bg-transparent focus:outline-none" 
              id="news-images" 
            />

            {imagePreviews.length > 0 && (
              <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 border-2 border-border mt-4 p-4">
                <div className="text-3xl col-span-2 md:col-span-3">
                  <h1>Image Previews</h1>
                  <p className="mt-2 text-sm text-muted-foreground mb-5">
                    {files.length > 0 ? `${files.length} new image(s) will be uploaded` : "Existing images"}
                  </p>
                </div>
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={src} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-md border" 
                    />
                    <button 
                      type="button" 
                      onClick={() => 
                        src.startsWith('blob:') 
                          ? handleRemoveImage(index) 
                          : handleRemoveExistingImage(index)
                      } 
                      className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-90 group-hover:opacity-100 hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button 
              type="submit" 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update News"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/news")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="text-red-500 p-4 border border-red-500 rounded">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;