"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Type, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  _id: string;
  key: string;
  section: string;
  contentType: "text" | "rich_text" | "json";
  value: any;
  updatedAt: string;
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Track states for individual inputs
  const [editedValues, setEditedValues] = useState<Record<string, any>>({});
  const [savingKeys, setSavingKeys] = useState<Record<string, boolean>>({});
  const [successKeys, setSuccessKeys] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/admin/content");
        if (res.ok) {
          const json = await res.json();
          setContent(json);
          
          // Init local state tracking
          const edits: Record<string, any> = {};
          json.forEach((item: ContentItem) => {
            edits[item.key] = item.contentType === 'json' ? JSON.stringify(item.value, null, 2) : item.value;
          });
          setEditedValues(edits);
        }
      } catch (err) {
        console.error("Failed to load content:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  const handleSave = async (item: ContentItem) => {
    setSavingKeys(prev => ({ ...prev, [item.key]: true }));
    setSuccessKeys(prev => ({ ...prev, [item.key]: false }));

    try {
      let valueToSave = editedValues[item.key];
      
      // Parse JSON back to object before saving if needed
      if (item.contentType === 'json') {
        try {
          valueToSave = JSON.parse(valueToSave);
        } catch (e) {
          alert('Invalid JSON format');
          setSavingKeys(prev => ({ ...prev, [item.key]: false }));
          return;
        }
      }

      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.key, value: valueToSave }),
      });

      if (!res.ok) throw new Error("Failed");
      
      setSuccessKeys(prev => ({ ...prev, [item.key]: true }));
      setTimeout(() => {
        setSuccessKeys(prev => ({ ...prev, [item.key]: false }));
      }, 3000);

    } catch (err) {
      console.error("Save error:", err);
      // alert could be replaced with toast in a real app
      alert("Failed to save changes."); 
    } finally {
      setSavingKeys(prev => ({ ...prev, [item.key]: false }));
    }
  };

  // Group content by section
  const sections = Array.from(new Set(content.map(c => c.section)));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Site Content</h1>
        <p className="text-zinc-400 mt-1">Manage marketing copy, hero texts, and about page content.</p>
      </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-zinc-800 bg-zinc-950/50">
                <h2 className="font-medium text-white capitalize text-lg">{section.replace("_", " ")} Overview</h2>
              </div>
              
              <div className="divide-y divide-zinc-800/80">
                {content.filter(c => c.section === section).map(item => (
                  <div key={item.key} className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-zinc-300 font-medium font-mono text-sm">{item.key}</h3>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{item.contentType}</p>
                      </div>
                      <Button
                        onClick={() => handleSave(item)}
                        disabled={savingKeys[item.key]}
                        size="sm"
                        className={`transition-colors ${
                          successKeys[item.key] 
                            ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 hover:bg-emerald-500/30" 
                            : "bg-white text-zinc-900 hover:bg-zinc-200"
                        }`}
                      >
                        {savingKeys[item.key] ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : successKeys[item.key] ? (
                          <span className="flex items-center">Saved!</span>
                        ) : (
                          <><Save className="w-4 h-4 mr-2" /> Save Changes</>
                        )}
                      </Button>
                    </div>

                    <div className="mt-4">
                      {item.contentType === "text" ? (
                        <input
                          value={editedValues[item.key] || ""}
                          onChange={(e) => setEditedValues(p => ({ ...p, [item.key]: e.target.value }))}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600"
                        />
                      ) : (
                        <textarea
                          value={editedValues[item.key] || ""}
                          onChange={(e) => setEditedValues(p => ({ ...p, [item.key]: e.target.value }))}
                          rows={item.contentType === "json" ? 8 : 4}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-y font-mono text-sm"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {sections.length === 0 && (
            <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
              No editable site content found. Verify seed script ran successfully.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
