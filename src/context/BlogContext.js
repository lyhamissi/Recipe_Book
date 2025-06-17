import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    saveBlogs(blogs);
  }, [blogs]);

  const loadBlogs = async () => {
    try {
      const json = await AsyncStorage.getItem('@blogs');
      if (json) setBlogs(JSON.parse(json));
    } catch (err) {
      console.error('Failed to load blogs', err);
    }
  };

  const saveBlogs = async (blogs) => {
    try {
      await AsyncStorage.setItem('@blogs', JSON.stringify(blogs));
    } catch (err) {
      console.error('Failed to save blogs', err);
    }
  };

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, blog]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};