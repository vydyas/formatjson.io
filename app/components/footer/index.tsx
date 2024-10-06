// components/Footer
import React from "react";
import styles from "./index.module.css"; // Updated CSS module

const Index: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4>
            <b>About formatjson.io</b>
          </h4>
          <p>
            FormatJSON.io helps you manage and convert JSON to other formats
            efficiently.
            <br /> <br />
          </p>

          <ul>
            <li>JSON to XML</li>
            <li>JSON Beautifier</li>
            <li>JSON Minifier</li>
            <li>JSON TREE VIEW</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>
            <b>Follow The Developer</b>
          </h4>
          <ul>
            <li>
              <a
                href="https://x.com/siddhucse"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://github.com/VYDYAS"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/siddhucse/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h4>
            <b>About Me</b>
          </h4>
          <p>
            I'm Siddhu from Hyderabad, India. I'm working as Senior Software
            Engineer @Salesforce. I'm passionate about building products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Index;