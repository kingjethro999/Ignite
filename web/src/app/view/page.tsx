'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function MarkdownViewer() {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/igniteexamples.md')
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="prose prose-invert max-w-4xl mx-auto text-ignite-offwhite/90 text-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
} 