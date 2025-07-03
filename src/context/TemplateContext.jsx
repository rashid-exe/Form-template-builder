import React, { createContext, useContext, useState, useEffect } from "react";

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState(() => {
    const stored = localStorage.getItem("templates");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  const addTemplate = (template) => {
    if (templates.length < 5) {
      setTemplates([...templates, template]);
    }
  };
  const deleteTemplate = (id) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  return (
    <TemplateContext.Provider
      value={{ templates, addTemplate, setTemplates, deleteTemplate }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => useContext(TemplateContext);
