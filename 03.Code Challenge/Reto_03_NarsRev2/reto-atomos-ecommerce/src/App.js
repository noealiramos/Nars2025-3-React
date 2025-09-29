import React from "react";
import Layout from "./layout/Layout";
import Home from "./pages/Home.async";
import "./styles/globals.css";
import "./App.css";

export default function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}
