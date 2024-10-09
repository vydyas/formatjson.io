"use client";

import React, { useState, ChangeEvent, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import AceEditor from "react-ace";
import dynamic from "next/dynamic"; // To dynamically import the tree view component
import Footer from "../components/footer"; // Import the Footer component
import Header from "../components/header"; // Import the Footer component

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

// Dynamically import react-json-view (it needs to run on the client side)
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const Home: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const output = "";
  const indentation = 2;
  const [inputEditor, setInputEditor] = useState<any>(null);
  const [outputEditor, setOutputEditor] = useState<any>(null);
  const [showTreeView, setShowTreeView] = useState<boolean>(false);
  const [xmlOutput, setXmlOutput] = useState<string>("");

  // Memoize the sample JSON to avoid re-creation on each render
  const sampleJSON = useMemo(
    () => ({
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "Somewhere",
        state: "CA",
        postalCode: "12345",
      },
      phoneNumbers: ["555-555-5555", "555-555-1234"],
    }),
    []
  );

  // Load sample JSON data when the component mounts
  useEffect(() => {
    const formattedSample = JSON.stringify(sampleJSON, null, 2); // Format with 2 spaces
    setInput(formattedSample);
  }, [sampleJSON]);

  useEffect(() => {
    if (inputEditor) {
      inputEditor.getSession().setFoldStyle("markbeginend");
    }
    if (outputEditor) {
      outputEditor.getSession().setFoldStyle("markbeginend");
    }
  }, [inputEditor, outputEditor]);

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setInput(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      alert("Valid JSON");
    } catch (error) {
      alert(`
        Invalid JSON: ${
          error instanceof Error ? error.message : "Unknown error"
        }
      `);
    }
  };

  const handleLoadSample = () => {
    setShowTreeView(false);
    setXmlOutput("");
    const formattedSample = JSON.stringify(sampleJSON, null, 2); // Format sample with 2 spaces
    setInput(formattedSample);
  };

  const handleToggleTreeView = () => {
    setShowTreeView((prev) => !prev);
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(input).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const editorOptions = {
    useWorker: false,
    showLineNumbers: true,
    tabSize: indentation,
    fontSize: 15,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
  };

  return (
    <div className={styles.container}>
      <Header subtitle="JSON to Tree View" />{" "}
      {/* Use the Header component here */}
      <main>
        <div className={styles.textareaContainer}>
          <div className={styles.editorContainer}>
            <button
              className={styles.copyButton}
              onClick={handleCopyInput}
              title="copy"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.copyIcon}
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
            </button>

            <AceEditor
              className={styles.textarea}
              value={input}
              mode="json"
              theme="github"
              onChange={setInput}
              name="input-editor"
              onLoad={setInputEditor}
              setOptions={editorOptions}
              style={{ width: "100%", height: "100%" }}
              placeholder="Paste your JSON here"
              editorProps={{ $blockScrolling: true }}
            />
          </div>

          <div className={styles.buttonContainer}>
            <input
              type="file"
              onChange={handleUpload}
              className={styles.fileInput}
              id="fileUpload"
            />
            <button onClick={handleValidate} className={styles.button}>
              Validate
            </button>

            <button onClick={handleLoadSample} className={styles.button}>
              Load Sample JSON
            </button>

            <button onClick={handleToggleTreeView} className={styles.button}>
              {showTreeView ? "Hide Tree View" : "Show Tree View"}
            </button>

            <label htmlFor="fileUpload" className={styles.upload}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Upload JSON
            </label>
          </div>
          <div className={styles.editorContainer}>
            {output && (
              <button
                className={styles.copyButton}
                onClick={handleCopyOutput}
                title="copy"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.copyIcon}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                </svg>
              </button>
            )}
            {!showTreeView && (
              <AceEditor
                className={styles.textarea}
                value={xmlOutput || output}
                mode={xmlOutput ? "xml" : "json"}
                onLoad={setOutputEditor}
                theme="github"
                name="output-editor"
                setOptions={{ ...editorOptions, readOnly: true }}
                placeholder="Formatted JSON will appear here"
                editorProps={{ $blockScrolling: true }}
                style={{ width: "100%", height: "100%" }}
              />
            )}
            {/* Conditional rendering of the JSON tree view */}
            {showTreeView && (
              <div className={styles.textarea}>
                <ReactJson
                  src={input ? JSON.parse(input) : {}}
                  collapsed={1} // Initial collapse level
                  enableClipboard={true}
                  theme="monokai"
                  displayDataTypes={false}
                  style={{
                    padding: "20px",
                    backgroundColor: "#333",
                    color: "#2e2e2e",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer /> {/* Add the footer here */}
    </div>
  );
};

export default Home;
