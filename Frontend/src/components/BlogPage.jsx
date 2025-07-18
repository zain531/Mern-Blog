import React, { useState, useEffect } from "react";
import CategorySelection from "./CategorySelection";
import Pagination from "./Pagination";
import BlogCards from "./BlogCards";
import Sidebar from "./Sidebar";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        let url = `${import.meta.env.VITE_API_URL}/blogs?page=${currentPage}&limit=${pageSize}`;

        if (selectedCategory) {
          url += `&category=${selectedCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }

    fetchBlogs();
  }, [currentPage, selectedCategory]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
    setCurrentPage(1); // Reset to page 1 on new category
  };

  return (
    <div>
      <CategorySelection
        onSelectCategory={handleCategoryChange}
        activeCategory={activeCategory}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <BlogCards
          blogs={blogs}
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          pageSize={pageSize}
        />
        <Sidebar />
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        blogs={blogs}
        pageSize={pageSize}
      />
    </div>
  );
};

export default BlogPage;
