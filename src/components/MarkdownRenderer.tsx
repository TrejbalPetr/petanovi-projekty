"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";
import type { ReactNode } from "react";

function childrenToText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in (children as object)) {
    return childrenToText((children as { props: { children: ReactNode } }).props.children);
  }
  return "";
}

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const id = slugify(childrenToText(children));
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const id = slugify(childrenToText(children));
            return <h3 id={id}>{children}</h3>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
