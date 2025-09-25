"use client"

// npm install lexical @lexical/react @lexical/rich-text @lexical/list @lexical/link @lexical/code @lexical/table @lexical/selection @lexical/html
import React, { useState, useEffect } from "react"
import {
  LexicalComposer,
  RichTextPlugin,
  ContentEditable,
  HistoryPlugin,
  OnChangePlugin,
  useLexicalComposerContext,
} from "@lexical/react/LexicalComposer"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode, ListNode } from "@lexical/list"
import { LinkNode, AutoLinkNode, $createLinkNode } from "@lexical/link"
import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { $generateHtmlFromNodes } from "@lexical/html"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import {
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import { $isListNode } from "@lexical/list"

// Theme for the editor
const theme = {
  ltr: "ltr",
  rtl: "rtl",
  placeholder: "editor-placeholder",
  paragraph: "editor-paragraph",
  quote: "editor-quote",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  image: "editor-image",
  link: "editor-link",
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    overflowed: "editor-text-overflowed",
    hashtag: "editor-text-hashtag",
    underline: "editor-text-underline",
    strikethrough: "editor-text-strikethrough",
    underlineStrikethrough: "editor-text-underlineStrikethrough",
    code: "editor-text-code",
  },
  code: "editor-code",
  codeHighlight: {
    atrule: "editor-tokenAttr",
    attr: "editor-tokenAttr",
    boolean: "editor-tokenProperty",
    builtin: "editor-tokenSelector",
    cdata: "editor-tokenComment",
    char: "editor-tokenSelector",
    class: "editor-tokenFunction",
    "class-name": "editor-tokenFunction",
    comment: "editor-tokenComment",
    constant: "editor-tokenProperty",
    deleted: "editor-tokenProperty",
    doctype: "editor-tokenComment",
    entity: "editor-tokenOperator",
    function: "editor-tokenFunction",
    important: "editor-tokenVariable",
    inserted: "editor-tokenSelector",
    keyword: "editor-tokenAttr",
    namespace: "editor-tokenVariable",
    number: "editor-tokenProperty",
    operator: "editor-tokenOperator",
    prolog: "editor-tokenComment",
    property: "editor-tokenProperty",
    punctuation: "editor-tokenPunctuation",
    regex: "editor-tokenVariable",
    selector: "editor-tokenSelector",
    string: "editor-tokenSelector",
    symbol: "editor-tokenProperty",
    tag: "editor-tokenProperty",
    url: "editor-tokenOperator",
    variable: "editor-tokenVariable",
  },
}

// Nodes for the editor
const nodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  AutoLinkNode,
  LinkNode,
]

// Toolbar Button Component
const ToolbarButton = ({ onClick, active, children, title, disabled = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`toolbar-item ${active ? "active" : ""} ${disabled ? "disabled" : ""}`}
    title={title}
    disabled={disabled}
  >
    {children}
  </button>
)

// Toolbar Component
function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()
  const [activeFormats, setActiveFormats] = useState(new Set())
  const [blockType, setBlockType] = useState("paragraph")
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      // Update active formats
      const newActiveFormats = new Set()
      if (selection.hasFormat("bold")) newActiveFormats.add("bold")
      if (selection.hasFormat("italic")) newActiveFormats.add("italic")
      if (selection.hasFormat("underline")) newActiveFormats.add("underline")
      if (selection.hasFormat("strikethrough")) newActiveFormats.add("strikethrough")
      if (selection.hasFormat("code")) newActiveFormats.add("code")
      setActiveFormats(newActiveFormats)

      // Update block type
      const anchor = selection.anchor
      const node = anchor.getNode()
      const element = node.getKey() === "root" ? node : node.getTopLevelElementOrThrow()
      const elementKey = element.getKey()
      const elementDOM = editor.getElementByKey(elementKey)

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const type = element.getTag()
          setBlockType(type)
        } else {
          const type = element.getType()
          if (type.startsWith("heading")) {
            setBlockType(element.getTag())
          } else {
            setBlockType(type)
          }
        }
      }
    }
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        updateToolbar()
      })
    })
  }, [editor, updateToolbar])

  const formatText = (format) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  const formatHeading = (headingSize) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createParagraphNode())
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND)
    }
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const linkNode = $createLinkNode(url)
          selection.insertNodes([linkNode])
        }
      })
    }
  }

  const insertTable = () => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, { rows: 3, columns: 3 })
  }

  return (
    <div className="toolbar">
      <ToolbarButton onClick={() => formatText("bold")} active={activeFormats.has("bold")} title="Bold (Ctrl+B)">
        <strong>B</strong>
      </ToolbarButton>

      <ToolbarButton onClick={() => formatText("italic")} active={activeFormats.has("italic")} title="Italic (Ctrl+I)">
        <em>I</em>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => formatText("underline")}
        active={activeFormats.has("underline")}
        title="Underline (Ctrl+U)"
      >
        <u>U</u>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => formatText("strikethrough")}
        active={activeFormats.has("strikethrough")}
        title="Strikethrough"
      >
        <span style={{ textDecoration: "line-through" }}>S</span>
      </ToolbarButton>

      <ToolbarButton onClick={() => formatText("code")} active={activeFormats.has("code")} title="Code">
        <span className="editor-text-code">C</span>
      </ToolbarButton>

      <div className="divider" />

      <ToolbarButton onClick={formatParagraph} active={blockType === "paragraph"} title="Paragraph">
        ¶
      </ToolbarButton>

      <ToolbarButton onClick={() => formatHeading("h1")} active={blockType === "h1"} title="Heading 1">
        H1
      </ToolbarButton>

      <ToolbarButton onClick={() => formatHeading("h2")} active={blockType === "h2"} title="Heading 2">
        H2
      </ToolbarButton>

      <ToolbarButton onClick={() => formatHeading("h3")} active={blockType === "h3"} title="Heading 3">
        H3
      </ToolbarButton>

      <div className="divider" />

      <ToolbarButton onClick={formatBulletList} active={blockType === "ul"} title="Bullet List">
        • List
      </ToolbarButton>

      <ToolbarButton onClick={formatNumberedList} active={blockType === "ol"} title="Numbered List">
        1. List
      </ToolbarButton>

      <ToolbarButton onClick={formatQuote} active={blockType === "quote"} title="Quote">
        "
      </ToolbarButton>

      <div className="divider" />

      <ToolbarButton onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND)} title="Indent">
        →
      </ToolbarButton>

      <ToolbarButton onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND)} title="Outdent">
        ←
      </ToolbarButton>

      <div className="divider" />

      <ToolbarButton onClick={insertLink} title="Insert Link">
        🔗
      </ToolbarButton>

      <ToolbarButton onClick={insertTable} title="Insert Table">
        📊
      </ToolbarButton>
    </div>
  )
}

// Placeholder Component
function Placeholder() {
  return <div className="editor-placeholder">Start typing here...</div>
}

// Editor Component
export default function PageEditor({
  initialContent = "",
  onChange,
}: {
  initialContent?: string
  onChange?: (content: string) => void
}) {
  const [content, setContent] = useState(initialContent)
  const [isEditorReady, setIsEditorReady] = useState(false)

  const initialConfig = {
    namespace: "PageEditor",
    theme,
    onError: (error) => console.error(error),
    nodes,
  }

  const onEditorChange = (editorState) => {
    editorState.read(() => {
      const html = $generateHtmlFromNodes()
      setContent(html)
      if (onChange) {
        onChange(html)
      }
    })
  }

  useEffect(() => {
    setContent(initialContent)
  }, [initialContent])

  const handleSave = () => {
    console.log("Saving content:", content)
    // In a real app, you would send this to your backend
    alert("Content saved successfully!")
  }

  return (
    <div className="editor-container">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onEditorChange} />
          <HistoryPlugin />
        </div>
      </LexicalComposer>

      <style jsx>{`
        .editor-container {
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: 'Helvetica Neue', Arial, sans-serif;
          overflow: hidden;
          background: white;
        }
        
        .toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          padding: 8px;
          border-bottom: 1px solid #eee;
          background: #f8f9fa;
        }
        
        .toolbar-item {
          border: 0;
          display: flex;
          background: none;
          border-radius: 4px;
          padding: 6px 8px;
          cursor: pointer;
          vertical-align: middle;
          margin: 0 2px;
          font-size: 14px;
        }
        
        .toolbar-item:hover {
          background-color: #e0e0e0;
        }
        
        .toolbar-item.active {
          background-color: #042189;
          color: #fccf03;
        }
        
        .toolbar-item.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .divider {
          width: 1px;
          background-color: #ccc;
          margin: 0 6px;
          height: 20px;
          align-self: center;
        }
        
        .editor-inner {
          position: relative;
          min-height: 200px;
        }
        
        .editor-input {
          min-height: 200px;
          padding: 20px;
          outline: 0;
          resize: none;
          font-size: 15px;
          caret-color: #042189;
          position: relative;
          tab-size: 1;
          line-height: 1.7;
        }
        
        .editor-placeholder {
          color: #999;
          overflow: hidden;
          position: absolute;
          text-overflow: ellipsis;
          top: 20px;
          left: 20px;
          font-size: 15px;
          user-select: none;
          display: inline-block;
          pointer-events: none;
        }
        
        .editor-paragraph {
          margin: 0 0 15px 0;
          position: relative;
        }
        
        .editor-heading-h1 {
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 15px 0;
          color: #222;
        }
        
        .editor-heading-h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 12px 0;
          color: #333;
        }
        
        .editor-heading-h3 {
          font-size: 20px;
          font-weight: bold;
          margin: 0 0 10px 0;
          color: #444;
        }
        
        .editor-list-ol,
        .editor-list-ul {
          padding: 0 0 0 32px;
          margin: 0 0 15px 0;
        }
        
        .editor-listitem {
          margin: 8px 0;
        }
        
        .editor-text-bold {
          font-weight: bold;
        }
        
        .editor-text-italic {
          font-style: italic;
        }
        
        .editor-text-underline {
          text-decoration: underline;
        }
        
        .editor-text-strikethrough {
          text-decoration: line-through;
        }
        
        .editor-text-code {
          background-color: rgba(0, 0, 0, 0.05);
          padding: 1px 0.25rem;
          font-family: Menlo, Consolas, Monaco, monospace;
          font-size: 94%;
        }
        
        .editor-link {
          color: #042189;
          text-decoration: none;
        }
        
        .editor-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
