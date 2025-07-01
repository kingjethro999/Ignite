'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Copy, CheckCircle, ArrowRight, Book, Code, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function RawExamplesPage() {
  const [markdown, setMarkdown] = useState('');
  const [tableOfContents, setTableOfContents] = useState<Array<{id: string, title: string, level: number}>>([]);
  const [copiedText, setCopiedText] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    fetch('/igniteexamples.md')
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text);
        // Generate table of contents
        const headings = text.match(/^#{1,6}\s+.+$/gm) || [];
        const toc = headings.map((heading, index) => {
          const level = heading.match(/^#+/)?.[0].length || 1;
          const title = heading.replace(/^#+\s+/, '');
          const id = `heading-${index}`;
          return { id, title, level };
        });
        setTableOfContents(toc);
      });
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ignite-examples.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      
      <main className="pt-28 pb-20">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Raw Examples</span>
                <br />
                <span className="text-ignite-offwhite">Complete Source Documentation</span>
              </h1>
              <p className="text-lg md:text-xl text-ignite-offwhite/80 mb-8 max-w-3xl mx-auto">
                Access the complete, unfiltered documentation with all examples, 
                technical details, and implementation guides in their original markdown format.
              </p>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button
                  onClick={downloadMarkdown}
                  className="flex items-center gap-2 bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download Markdown
                </button>
                <Link href="/examples">
                  <button className="flex items-center gap-2 border-2 border-ignite-orange text-ignite-orange px-6 py-3 rounded-lg font-semibold hover:bg-ignite-orange hover:text-white transition-all duration-300">
                    <Code className="w-5 h-5" />
                    Interactive Examples
                  </button>
                </Link>
                <Link href="/docs">
                  <button className="flex items-center gap-2 text-ignite-offwhite/70 hover:text-ignite-orange transition-colors">
                    <Book className="w-4 h-4" />
                    Documentation
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="sticky top-32"
                >
                  <div className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-ignite-offwhite mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-ignite-orange" />
                      Table of Contents
                    </h3>
                    {tableOfContents.length > 0 ? (
                      <nav className="space-y-2">
                        {tableOfContents.map((item, index) => (
                          <a
                            key={item.id}
                            href={`#heading-${index}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(`heading-${index}`);
                              element?.scrollIntoView({ behavior: 'smooth' });
                              setActiveSection(item.id);
                            }}
                            className={`block text-sm py-1 px-2 rounded transition-colors ${
                              activeSection === item.id
                                ? 'bg-ignite-orange/20 text-ignite-orange'
                                : 'text-ignite-offwhite/60 hover:text-ignite-orange hover:bg-ignite-orange/10'
                            }`}
                            style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </nav>
                    ) : (
                      <div className="text-ignite-offwhite/40 text-sm">
                        Loading table of contents...
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-6 bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-ignite-offwhite mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => copyToClipboard(markdown)}
                        className="w-full flex items-center gap-2 text-ignite-offwhite/70 hover:text-ignite-orange transition-colors text-sm"
                      >
                        {copiedText === markdown ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy All Content
                          </>
                        )}
                      </button>
                      <Link href="/docs" className="w-full block">
                        <button className="w-full flex items-center gap-2 text-ignite-offwhite/70 hover:text-ignite-orange transition-colors text-sm">
                          <ArrowRight className="w-4 h-4" />
                          Back to Docs
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-ignite-charcoal/30 border border-ignite-darkred/20 rounded-xl overflow-hidden"
                >
                  {/* Content Header */}
                  <div className="bg-ignite-charcoal/50 border-b border-ignite-darkred/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-ignite-orange" />
                        <span className="text-ignite-offwhite font-semibold">igniteexamples.md</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-ignite-offwhite/60 text-sm">
                          {markdown.split('\n').length} lines
                        </span>
                        <button
                          onClick={() => copyToClipboard(markdown)}
                          className="text-ignite-offwhite/60 hover:text-ignite-orange transition-colors"
                        >
                          {copiedText === markdown ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Markdown Content */}
                  <div className="p-6 md:p-8">
                    {markdown ? (
                      <div className="prose prose-invert prose-lg max-w-none text-ignite-offwhite/90">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children, ...props }) => (
                              <h1 
                                id={`heading-${tableOfContents.findIndex(item => item.title === children?.toString())}`}
                                className="text-3xl font-bold text-ignite-offwhite mb-6 pb-3 border-b border-ignite-darkred/20 scroll-mt-32"
                                {...props}
                              >
                                {children}
                              </h1>
                            ),
                            h2: ({ children, ...props }) => (
                              <h2 
                                id={`heading-${tableOfContents.findIndex(item => item.title === children?.toString())}`}
                                className="text-2xl font-bold text-ignite-offwhite mt-8 mb-4 scroll-mt-32"
                                {...props}
                              >
                                {children}
                              </h2>
                            ),
                            h3: ({ children, ...props }) => (
                              <h3 
                                id={`heading-${tableOfContents.findIndex(item => item.title === children?.toString())}`}
                                className="text-xl font-bold text-ignite-offwhite mt-6 mb-3 scroll-mt-32"
                                {...props}
                              >
                                {children}
                              </h3>
                            ),
                            code({ node, inline, className, children, ...props }: any) {
                              const match = /language-(\w+)/.exec(className || '');
                              const codeContent = String(children).replace(/\n$/, '');
                              
                              return !inline && match ? (
                                <div className="relative group">
                                  <button
                                    onClick={() => copyToClipboard(codeContent)}
                                    className="absolute top-3 right-3 z-10 p-2 bg-ignite-charcoal/80 border border-ignite-darkred/20 rounded-lg text-ignite-offwhite/60 hover:text-ignite-orange transition-colors opacity-0 group-hover:opacity-100"
                                  >
                                    {copiedText === codeContent ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </button>
                                  <SyntaxHighlighter
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg border border-ignite-darkred/20"
                                    {...props}
                                  >
                                    {codeContent}
                                  </SyntaxHighlighter>
                                </div>
                              ) : (
                                <code 
                                  className="bg-ignite-charcoal/50 border border-ignite-darkred/20 rounded px-2 py-1 text-ignite-orange font-mono text-sm"
                                  {...props}
                                >
                                  {children}
                                </code>
                              )
                            },
                            blockquote: ({ children, ...props }) => (
                              <blockquote className="border-l-4 border-ignite-orange pl-4 py-2 bg-ignite-orange/5 my-4 rounded-r" {...props}>
                                {children}
                              </blockquote>
                            ),
                            table: ({ children, ...props }) => (
                              <div className="overflow-x-auto my-6">
                                <table className="w-full border-collapse border border-ignite-darkred/20 rounded-lg" {...props}>
                                  {children}
                                </table>
                              </div>
                            ),
                            th: ({ children, ...props }) => (
                              <th className="border border-ignite-darkred/20 bg-ignite-charcoal/50 p-3 text-left text-ignite-offwhite font-semibold" {...props}>
                                {children}
                              </th>
                            ),
                            td: ({ children, ...props }) => (
                              <td className="border border-ignite-darkred/20 p-3 text-ignite-offwhite/80" {...props}>
                                {children}
                              </td>
                            ),
                            ul: ({ children, ...props }) => (
                              <ul className="space-y-2 ml-6" {...props}>
                                {children}
                              </ul>
                            ),
                            li: ({ children, ...props }) => (
                              <li className="text-ignite-offwhite/80" {...props}>
                                {children}
                              </li>
                            ),
                            p: ({ children, ...props }) => (
                              <p className="text-ignite-offwhite/80 leading-relaxed mb-4" {...props}>
                                {children}
                              </p>
                            ),
                            a: ({ href, children, ...props }) => (
                              <a 
                                href={href}
                                className="text-ignite-orange hover:text-ignite-yellow underline"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                {...props}
                              >
                                {children}
                              </a>
                            )
                          }}
                        >
                          {markdown}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-ignite-offwhite/60">
                          Loading documentation...
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Footer */}
        <section className="px-4 sm:px-6 lg:px-8 mt-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-ignite-orange/10 to-ignite-yellow/10 rounded-2xl p-8 text-center"
            >
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Need More Help?
              </h3>
              <p className="text-ignite-offwhite/80 mb-6">
                Explore our interactive documentation and examples for a better learning experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-ignite-orange to-ignite-yellow text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all duration-300"
                  >
                    <Book className="w-5 h-5" />
                    Interactive Docs
                  </motion.button>
                </Link>
                <Link href="/examples">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-ignite-orange text-ignite-orange px-6 py-3 rounded-lg font-semibold hover:bg-ignite-orange hover:text-white transition-all duration-300 flex items-center gap-2"
                  >
                    <Code className="w-5 h-5" />
                    Code Examples
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 