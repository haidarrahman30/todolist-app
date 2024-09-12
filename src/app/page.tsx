"use client";

import MainLayout from "@/components/layout";
import Todo from "@/components/todo";
import { ThemeProvider } from "@/context/theme";

const Home = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <Todo />
      </MainLayout>
    </ThemeProvider>
  );
};

export default Home;
