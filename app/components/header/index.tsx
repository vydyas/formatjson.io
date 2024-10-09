// components/Header.tsx
import React from "react";
import styles from "./index.module.css"; // Create a separate CSS file for Header styling
import { Fredoka } from "next/font/google";
import Link from "next/link";

const fredoka = Fredoka({
  weight: "400",
  subsets: ["latin"],
});

interface HeaderProps {
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ subtitle }) => {
  return (
    <header className={fredoka.className}>
      <div className={styles.title}>
        <Link href="/" className={styles.link}>
          <h1 className={styles.title}>formatjson.io</h1>
        </Link>
        {subtitle && (
          <div className={styles.subTitle}>
            &nbsp;&nbsp;|&nbsp;{" "}
            <span className={styles.subtitle}>{subtitle}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
