// components/Header
import React from "react";
import styles from "./index.module.css"; // Create a separate CSS file for Header styling
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
});

const Index: React.FC = () => {
  return (
    <header className={fredoka.className}>
      <h1 className={styles.title}>formatjson.io</h1>
    </header>
  );
};

export default Index;
