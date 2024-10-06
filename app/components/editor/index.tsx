"use client";

// components/Editor.tsx
import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import styles from "./index.module.css";

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
  mode: "json" | "xml";
  readOnly?: boolean;
  placeholder?: string;
  editorRef?: (editor: any) => void;
}

const Editor: React.FC<EditorProps> = ({
  value,
  setValue,
  mode,
  readOnly = false,
  placeholder,
  editorRef,
}) => {
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    if (editor && editorRef) {
      editorRef(editor);
    }
  }, [editor, editorRef]);

  useEffect(() => {
    if (editor) {
      editor.getSession().setFoldStyle("markbeginend");
    }
  }, [editor]);

  const editorOptions = {
    useWorker: false,
    showLineNumbers: true,
    tabSize: 2,
    fontSize: 15,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showPrintMargin: false,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      alert("Copied to clipboard!");
    });
  };

  return (
    <div className={styles.editorContainer}>
      <AceEditor
        className={styles.editor}
        value={value}
        mode={mode}
        theme="github"
        onChange={setValue}
        name="editor"
        onLoad={setEditor}
        setOptions={{ ...editorOptions, readOnly }}
        style={{ width: "100%", height: "100%" }}
        placeholder={placeholder}
        editorProps={{ $blockScrolling: true }}
      />
      <button className={styles.copyButton} onClick={handleCopy}>
        Copy
      </button>
    </div>
  );
};

export default Editor;
