import React, { useState } from "react";
import { useTemplates } from "../context/TemplateContext";
import Section from "./Section";
import { v4 as uuidv4 } from "uuid";

const TemplateBuilder = () => {
  const { templates, addTemplate, setTemplates } = useTemplates();
  const [sections, setSections] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [editingTemplateId, setEditingTemplateId] = useState(null);

  const addSection = () => {
    setSections([...sections, { id: uuidv4(), title: "", fields: [] }]);
  };

  const updateSection = (updatedSection) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === updatedSection.id ? updatedSection : sec))
    );
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      alert("Please enter a template name.");
      return;
    }

    if (sections.length === 0) {
      alert("Please add at least one section.");
      return;
    }

    const newTemplate = {
      id: editingTemplateId || uuidv4(),
      name: templateName.trim(),
      sections,
    };

    if (editingTemplateId) {
      setTemplates((prev) =>
        prev.map((t) => (t.id === editingTemplateId ? newTemplate : t))
      );
    } else {
      addTemplate(newTemplate);
    }

    setTemplateName("");
    setSections([]);
    setEditingTemplateId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          updateSection={updateSection}
        />
      ))}

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={addSection}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-sm transition duration-200"
        >
          ➕ Add Section
        </button>
        <button
          onClick={saveTemplate}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow-sm transition duration-200"
        >
          {editingTemplateId ? "💾 Update Template" : "💾 Save Template"}
        </button>
      </div>

      {templates.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
            🗂️ Saved Templates
          </h2>
          <ul className="space-y-3">
            {templates.map((t) => (
              <li
                key={t.id}
                className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded hover:shadow transition"
              >
                <span className="font-medium text-gray-800">
                  {t.name || "Untitled"}
                </span>
                <div className="space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setTemplateName(t.name);
                      setSections(t.sections);
                      setEditingTemplateId(t.id);
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this template?")
                      ) {
                        setTemplates((prev) =>
                          prev.filter((tp) => tp.id !== t.id)
                        );
                      }
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TemplateBuilder;
