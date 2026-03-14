import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, BookOpen, Copy, Check, Search, X } from 'lucide-react';

// --- TYPES ---
interface Prompt {
  id: string;
  title: string;
  category: string;
  tags: string[];
  slug: string;
  description?: string; // Optional description from frontmatter
}

// --- NEW STYLES (injected for simplicity) ---
const newStyles = `
  :root {
    --bg-color: #f3f4f6;
    --card-bg: #ffffff;
    --text-primary: #111827;
    --text-secondary: #4b5563;
    --accent: #4f46e5;
    --border-color: #e5e7eb;
  }
  body {
    background-color: var(--bg-color);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
`;

// --- MODAL COMPONENT ---
const PromptModal = ({ prompt, onClose }: { prompt: Prompt, onClose: () => void }) => {
  const [content, setContent] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`./data/prompts/${prompt.slug}.md`)
      .then(res => res.text())
      .then(text => {
        const promptText = text.split('# The Prompt')[1]?.split('# Documentation')[0]?.trim() || '';
        setContent(promptText);
        const matches = promptText.match(/{{(.*?)}}/g);
        if (matches) {
          const initialVars: Record<string, string> = {};
          matches.forEach(m => {
            const varName = m.replace(/{{|}}/g, '');
            initialVars[varName] = '';
          });
          setVariables(initialVars);
        } else {
          setVariables({});
        }
      });
  }, [prompt]);

  const processedContent = useMemo(() => {
    let result = content;
    Object.entries(variables).forEach(([key, value]) => {
      result = result.replaceAll(`{{${key}}}`, value || `{{${key}}}`);
    });
    return result;
  }, [content, variables]);

  const handleCopy = () => {
    navigator.clipboard.writeText(processedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{prompt.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X size={20}/></button>
        </div>
        <div className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-auto">
          <div className="col-span-1 space-y-4">
            <h3 className="font-bold text-gray-700">Variables</h3>
            {Object.keys(variables).length > 0 ? Object.keys(variables).map(key => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-1">{key}</label>
                <input
                  type="text"
                  value={variables[key]}
                  onChange={(e) => setVariables({ ...variables, [key]: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            )) : <p className="text-sm text-gray-500">No variables.</p>}
          </div>
          <div className="col-span-2">
            <h3 className="font-bold text-gray-700 mb-2">Processed Prompt</h3>
            <div className="whitespace-pre-wrap bg-gray-900 text-white font-mono text-sm p-4 rounded-lg h-full overflow-y-auto">
              {processedContent}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={handleCopy}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


// --- CARD COMPONENT ---
const PromptCard = ({ prompt, onClick }: { prompt: Prompt; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-indigo-300 hover:-translate-y-1"
  >
    <div>
      <h3 className="font-bold text-lg text-gray-900 mb-2">{prompt.title}</h3>
      <p className="text-sm text-gray-600 mb-4 h-10">{prompt.description || 'A versatile prompt for your collection.'}</p>
    </div>
    <div className="flex flex-wrap gap-2">
      {prompt.tags.map(tag => (
        <span key={tag} className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-1 rounded-md">
          {tag}
        </span>
      ))}
    </div>
  </div>
);


// --- MAIN APP ---
export default function App() {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = newStyles;
    document.head.appendChild(style);

    fetch('./prompts-index.json')
      .then(res => res.json())
      .then(data => {
        setPrompts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch prompts:', err);
        setLoading(false);
      });
  }, []);
  
  const filteredPrompts = useMemo(() => {
    return prompts.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [prompts, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8">
      {selectedPrompt && <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
      
      <header className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-black text-gray-900 flex items-center justify-center mb-2">
          <BookOpen className="mr-4 text-indigo-600" size={36}/>
          Prompt Collection
        </h1>
        <p className="text-lg text-gray-600">A curated library of powerful and reusable prompts.</p>
        <div className="mt-6 relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by title or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map(p => (
            <PromptCard key={p.slug} prompt={p} onClick={() => setSelectedPrompt(p)} />
          ))}
        </div>
      </main>
    </div>
  );
}
