'use client'

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import DocsSidebar from '../../components/DocsSidebar';
import CodeBlock from '../../components/CodeBlock';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';
import rehypeRaw from 'rehype-raw';

const docSections = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'cli', title: 'CLI & Commands' },
  { id: 'project-structure', title: 'Project Structure' },
  { id: 'usage', title: 'Usage' },
  { id: 'features', title: 'Features' },
  { id: 'components', title: 'Components' },
  { id: 'state-management', title: 'State Management' },
  { id: 'navigation', title: 'Navigation' },
  { id: 'advanced', title: 'Advanced' },
  { id: 'examples', title: 'App Examples' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
];

const gettingStartedContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Install Ignite</h3>
    <CodeBlock code={`npm install -g the-ignite`} />
    <h3>Create a New Project</h3>
    <CodeBlock code={`ignite create my-app\ncd my-app`} />
    <h3>Start Development</h3>
    <CodeBlock code={`ignite dev`} />
    <h3>Edit Your App</h3>
    <ul className="space-y-2 mb-4">
      <li className="pb-2">Edit <code>app/(tabs)/Home/index.ignite</code> and other <code>.ignite</code> files in the <code>app/</code> directory.</li>
      <li className="pb-2">Changes are compiled automatically and hot-reloaded in Expo.</li>
    </ul>
    <h3>Build for Production</h3>
    <CodeBlock code={`ignite build --android\nignite build --ios`} />
    <h3>Project Structure</h3>
    <CodeBlock code={`my-app/\n├── app/\n│   └── (tabs)/\n│       ├── Home/\n│       │   └── index.ignite\n│       ├── About/\n│       │   └── index.ignite\n│       └── Developers/\n│           └── index.ignite\n├── assets/\n│   ├── icon.png\n│   ├── adaptive-icon.png\n│   └── splash.png\n├── .ignite/\n│   ├── screens/\n│   │   ├── HomeIndex.js\n│   │   ├── AboutIndex.js\n│   │   └── DevelopersIndex.js\n│   └── router.js\n├── package.json\n├── babel.config.js\n├── app.config.js\n├── App.js\n└── ignite.json`} />
  </div>
);

const cliContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>CLI Commands</h3>
    <p>Ignite provides a powerful command-line interface to create, develop, and build your applications.</p>
    <table className="table-auto w-full text-left mb-6">
      <thead>
        <tr>
          <th className="pr-4">Command</th>
          <th className="pr-4">Description</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>ignite create &lt;name&gt;</code></td>
          <td>Create a new Ignite app</td>
          <td><CodeBlock code={`ignite create my-app`} /></td>
        </tr>
        <tr>
          <td><code>ignite dev</code></td>
          <td>Start development server</td>
          <td><CodeBlock code={`ignite dev`} /></td>
        </tr>
        <tr>
          <td><code>ignite dev --android</code></td>
          <td>Start dev server for Android</td>
          <td><CodeBlock code={`ignite dev -a`} /></td>
        </tr>
        <tr>
          <td><code>ignite dev --ios</code></td>
          <td>Start dev server for iOS</td>
          <td><CodeBlock code={`ignite dev -i`} /></td>
        </tr>
        <tr>
          <td><code>ignite build</code></td>
          <td>Build for production</td>
          <td><CodeBlock code={`ignite build`} /></td>
        </tr>
        <tr>
          <td><code>ignite build --android</code></td>
          <td>Build for Android</td>
          <td><CodeBlock code={`ignite build -a`} /></td>
        </tr>
        <tr>
          <td><code>ignite build --ios</code></td>
          <td>Build for iOS</td>
          <td><CodeBlock code={`ignite build -i`} /></td>
        </tr>
      </tbody>
    </table>
    <h4>Command Details</h4>
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>ignite create &lt;name&gt;:</b> Sets up a new Expo project, downloads starter <code>.ignite</code> files, assets, and installs dependencies.</li>
      <li className="pb-2"><b>ignite dev:</b> Compiles <code>.ignite</code> files, starts file watcher, launches Expo dev server, and hot reloads changes.</li>
      <li className="pb-2"><b>ignite build:</b> Compiles <code>.ignite</code> files and builds for Android/iOS using EAS Build.</li>
    </ul>
    <h4>Development Workflow</h4>
    <ol className="space-y-2 mb-4">
      <li className="pb-2">Edit <code>.ignite</code> files in <code>app/</code></li>
      <li className="pb-2">Changes are compiled to <code>.ignite/</code> directory</li>
      <li className="pb-2">Expo hot reloads changes instantly</li>
      <li className="pb-2">See results on your device/simulator</li>
    </ol>
    <h4>Troubleshooting</h4>
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>"This is not an Ignite project"</b>: Check for <code>ignite.json</code> in project root.</li>
      <li className="pb-2"><b>"App directory not found"</b>: Ensure <code>app/</code> exists with <code>.ignite</code> files.</li>
      <li className="pb-2"><b>Build failures</b>: Check EAS Build config, Expo account, and dependencies.</li>
    </ul>
  </div>
);

const projectStructureContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Project Structure</h3>
    <p>When you create a new Ignite project, you get a complete Expo/React Native structure:</p>
    <CodeBlock code={`my-app/
├── app/
│   └── (tabs)/
│       ├── Home/
│       │   └── index.ignite
│       ├── About/
│       │   └── index.ignite
│       └── Developers/
│           └── index.ignite
├── assets/
│   ├── icon.png
│   ├── adaptive-icon.png
│   └── splash.png
├── .ignite/
│   ├── screens/
│   │   ├── HomeIndex.js
│   │   ├── AboutIndex.js
│   │   └── DevelopersIndex.js
│   └── router.js
├── package.json
├── babel.config.js
├── app.config.js
├── App.js
└── ignite.json`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>app/</b>: Your source <code>.ignite</code> files</li>
      <li className="pb-2"><b>assets/</b>: App icons, splash, images</li>
      <li className="pb-2"><b>.ignite/</b>: Generated React Native code</li>
      <li className="pb-2"><b>package.json</b>: Project dependencies</li>
      <li className="pb-2"><b>ignite.json</b>: Ignite project config</li>
    </ul>
  </div>
);

const usageContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Basic Usage</h3>
    <p>Create <code>.ignite</code> files in your <code>app/</code> directory. Example:</p>
    <CodeBlock code={`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'

screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"

state user=null
state loading=false

async handleLogin() {
  const result = await firebase.auth().signInWithEmailAndPassword(email, password)
  setUser(result.user)
  go('/profile')
}

<View style="container">
  <LinearGradient colors={['#ff6b6b', '#4ecdc4']} style="gradient">
    <Text style="title">Welcome to Ignite</Text>
    <Input bind="username" placeholder="Enter username" />
    <Button onPress="handleLogin()">Login</Button>
  </LinearGradient>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  gradient: {
    flex: 1,
    borderRadius: 10,
  },
});`} />
    <ol className="space-y-2 mb-4">
      <li className="pb-2">Edit <code>.ignite</code> files</li>
      <li className="pb-2">Run <CodeBlock code={`ignite dev`} /></li>
      <li className="pb-2">See changes instantly in Expo</li>
    </ol>
  </div>
);

const featuresContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Features</h3>
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>Declarative Syntax:</b> XML-like component definitions</li>
      <li className="pb-2"><b>Automatic State Management:</b> Smart state inference and generation</li>
      <li className="pb-2"><b>Built-in Navigation:</b> Simple navigation with automatic route generation</li>
      <li className="pb-2"><b>Style Integration:</b> Seamless stylesheet handling</li>
      <li className="pb-2"><b>Hot Reloading:</b> Real-time compilation during development</li>
      <li className="pb-2"><b>Advanced State Management:</b> Integration with Redux or Zustand</li>
      <li className="pb-2"><b>Tab Navigation:</b> Easy tab-based navigation setup</li>
      <li className="pb-2"><b>Type Safety:</b> Generated code with TypeScript support</li>
      <li className="pb-2"><b>Flexible Imports:</b> Any npm package (default, named, namespace)</li>
      <li className="pb-2"><b>Custom Components:</b> Use any React Native or third-party component</li>
      <li className="pb-2"><b>Function Support:</b> Write async and regular functions in <code>.ignite</code></li>
      <li className="pb-2"><b>Expression Support:</b> Full JSX expression support</li>
      <li className="pb-2"><b>Package Integration:</b> Firebase, Expo, and more</li>
    </ul>
  </div>
);

const componentsContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Component Mapping</h3>
    <p>Ignite maps your declarative components to React Native/Expo components. Example:</p>
    <CodeBlock code={`const COMPONENT_MAP = {
  View: 'View',
  Text: 'Text',
  Button: 'TouchableOpacity',
  Input: 'TextInput',
  // ...more
}`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2"><b>Button</b> → <code>TouchableOpacity</code></li>
      <li className="pb-2"><b>Input</b> → <code>TextInput</code></li>
      <li className="pb-2">Supports any npm or custom component</li>
    </ul>
  </div>
);

const stateManagementContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Automatic State Management</h3>
    <p>State is declared at the top of your <code>.ignite</code> file and automatically inferred:</p>
    <CodeBlock code={`state user=null
state loading=false
state count=0`} />
    <p>Generates:</p>
    <CodeBlock code={`const [user, setUser] = useState(null)
const [loading, setLoading] = useState(false)
const [count, setCount] = useState(0)`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2">Type inference for string, number, boolean, object, array</li>
      <li className="pb-2">Smart defaults for common UI patterns</li>
    </ul>
  </div>
);

const navigationContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Navigation</h3>
    <p>Ignite generates navigation automatically from your <code>.ignite</code> files:</p>
    <CodeBlock code={`screen title="Home" isTabScreen="true" tabOrder="1" tabIcon="home"`} />
    <ul className="space-y-2 mb-4">
      <li className="pb-2">Tab and stack navigation supported</li>
      <li className="pb-2">Custom tab icons and ordering</li>
      <li className="pb-2">Screen options: titles, header visibility, etc.</li>
    </ul>
    <p>Navigation actions:</p>
    <CodeBlock code={`onPress="go('/settings')" // → navigation.navigate('SettingsIndex')`} />
  </div>
);

const advancedContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Advanced</h3>
    <ul className="space-y-2 mb-4">
  <li className="pb-2"><b>Flexible Imports:</b> Any npm package, default/named/namespace imports</li>
  <li className="pb-2"><b>Custom Functions:</b> Async and regular functions in <code>.ignite</code></li>
  <li className="pb-2"><b>Complex Expressions:</b> Full JSX support in curly braces</li>
  <li className="pb-2"><b>File System Management:</b> Maintains directory structure, cleans up old files</li>
  <li className="pb-2"><b>Error Handling:</b> Comprehensive error messages and validation</li>
</ul>
    <CodeBlock code={`import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase'
import * as Three from 'three'`} />
  </div>
);

const troubleshootingContent = (
  <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg">
    <h3>Troubleshooting</h3>
    <ul className="space-y-2 mb-4">
  <li className="pb-2"><b>"This is not an Ignite project"</b>: Check for <code>ignite.json</code> in project root.</li>
  <li className="pb-2"><b>"App directory not found"</b>: Ensure <code>app/</code> exists with <code>.ignite</code> files.</li>
  <li className="pb-2"><b>Build failures</b>: Check EAS Build config, Expo account, and dependencies.</li>
  <li className="pb-2">See generated files in <code>.ignite/</code> for debugging.</li>
  <li className="pb-2">Review Expo docs for platform-specific issues.</li>
  <li className="pb-2">Ensure all dependencies are installed with <CodeBlock code={`npm install`} /></li>
</ul>
  </div>
);

export default function DocsPage() {
  const [currentSection, setCurrentSection] = useState('getting-started');
  const [examplesMarkdown, setExamplesMarkdown] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const offsets: { id: string; top: number }[] = docSections.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? { id, top: el.getBoundingClientRect().top } : null;
      }).filter((o): o is { id: string; top: number } => Boolean(o));
      let activeId = currentSection;
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (offsets[i].top < 120) {
          activeId = offsets[i].id;
          break;
        }
      }
      if (activeId !== currentSection) setCurrentSection(activeId);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  useEffect(() => {
    fetch('/igniteexamples.md')
      .then((response) => response.text())
      .then((text) => setExamplesMarkdown(text));
  }, []);

  // Split markdown into sections at each '## N.' heading
  const exampleSections = React.useMemo(() => {
    if (!examplesMarkdown) return [];
    const parts = examplesMarkdown.split(/\n(?=## \d+\.)/g);
    // The first part is the intro, keep it if not empty
    return parts.filter(Boolean);
  }, [examplesMarkdown]);

  // Helper to get preview (first 5 lines or 300 chars)
  function getPreview(md: string) {
    const lines = md.split('\n');
    return lines.slice(0, 5).join('\n') + (lines.length > 5 ? '\n...' : '');
  }

  // Modal component
  function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="bg-ignite-charcoal rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative p-6">
          <button onClick={onClose} className="absolute top-2 right-2 text-ignite-orange text-2xl font-bold hover:text-ignite-yellow">×</button>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ignite-charcoal">
      <NavBar />
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto pt-28 pb-20 px-4 sm:px-6 lg:px-8 md:gap-8">
        <DocsSidebar currentSection={currentSection} />
        <main className="flex-1 min-w-0 mt-8 md:mt-0">
          {docSections.map(({ id, title }) => (
            <motion.section
              key={id}
              id={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">{title}</h2>
              <div className="prose prose-invert max-w-none text-ignite-offwhite/90 text-lg md:text-xl space-y-4 md:space-y-6">
                {id === 'getting-started' && gettingStartedContent}
                {id === 'cli' && cliContent}
                {id === 'project-structure' && projectStructureContent}
                {id === 'usage' && usageContent}
                {id === 'features' && featuresContent}
                {id === 'components' && componentsContent}
                {id === 'state-management' && stateManagementContent}
                {id === 'navigation' && navigationContent}
                {id === 'advanced' && advancedContent}
                {id === 'examples' && (
                  <div className="space-y-8">
                    {/* Render intro/title section as normal markdown, not as a preview/modal */}
                    {exampleSections[0] && !exampleSections[0].trim().startsWith('##') && (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
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
                        {exampleSections[0]}
                      </ReactMarkdown>
                    )}
                    {/* Only show preview/modal for sections that start with '##' */}
                    {exampleSections.map((section, idx) => (
                      section.trim().startsWith('##') && (
                        <div key={idx} className="relative bg-ignite-charcoal/80 border border-ignite-darkred/20 rounded-lg p-6 shadow-md">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
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
                            {getPreview(section)}
                          </ReactMarkdown>
                          <button
                            className="absolute left-1/2 -translate-x-1/2 bottom-2 flex flex-col items-center group text-ignite-orange hover:text-ignite-yellow text-2xl font-bold focus:outline-none"
                            onClick={() => { setModalContent(section); setModalOpen(true); }}
                            title="Read more"
                          >
                            <span className="animate-bounce">↓</span>
                            <span className="absolute left-1/2 -translate-x-1/2 bottom-7 mb-2 px-2 py-1 rounded bg-ignite-charcoal text-xs text-ignite-offwhite opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-10">
                              Read more
                            </span>
                          </button>
                        </div>
                      )
                    ))}
                    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
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
                        {modalContent}
                      </ReactMarkdown>
                    </Modal>
                  </div>
                )}
                {id === 'troubleshooting' && troubleshootingContent}
              </div>
            </motion.section>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
} 