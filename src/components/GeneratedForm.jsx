
import React, { useState } from 'react';
import { useTemplates } from '../context/TemplateContext';

const GeneratedForm = () => {
  const { templates } = useTemplates();
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('formData') || '{}');
    localStorage.setItem(
      'formData',
      JSON.stringify({ ...existing, [selected.id]: formData })
    );
    alert('Form submitted!');
  };

  const handleInputChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  if (!templates.length) return <p className="text-gray-600 italic">No templates yet.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow border mt-6">
      <select
        className="mb-4 border p-2 rounded w-full"
        onChange={(e) => {
          const template = templates.find((t) => t.id === e.target.value);
          setSelected(template);
          setFormData({});
        }}
      >
        <option value="">Select Template</option>
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {selected && (
        <form onSubmit={handleSubmit}>
          {selected.sections.map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                📁 {section.title || 'Untitled Section'}
              </h3>

              {section.fields.map((field) => (
                <div key={field.id} className="mb-4">
                  {field.type === 'label' ? (
                    <div className="text-gray-700 mb-2">
                      {field.level === 'h1' && (
                        <h1 className="text-3xl font-bold">{field.label || 'Untitled Label'}</h1>
                      )}
                      {field.level === 'h2' && (
                        <h2 className="text-2xl font-semibold">{field.label || 'Untitled Label'}</h2>
                      )}
                      {field.level === 'h3' && (
                        <h3 className="text-xl font-medium">{field.label || 'Untitled Label'}</h3>
                      )}
                    </div>
                  ) : (
                    <>
                      <label className="block font-medium text-sm text-gray-600 mb-1">
                        {field.label || 'Untitled Field'}
                        {field.required && (
                          <span className="text-red-500 ml-1 font-bold">*</span>
                        )}
                      </label>

                      {field.type === 'dropdown' ? (
                        <select
                          required={field.required}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        >
                          <option value="">Select an option</option>
                          {field.options?.map(
                            (opt, idx) =>
                              opt.trim() && (
                                <option key={idx} value={opt}>
                                  {opt}
                                </option>
                              )
                          )}
                        </select>
                      ) : field.type === 'boolean' ? (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-sm text-gray-600">No</span>
                          <label className="relative inline-flex items-center cursor-pointer w-11 h-6">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!!formData[field.id]}
                              onChange={(e) =>
                                handleInputChange(field.id, e.target.checked)
                              }
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                          </label>
                          <span className="text-sm text-gray-600">Yes</span>
                        </div>
                      ) : (
                        <input
                          type={field.type === 'number' ? 'number' : 'text'}
                          required={field.required}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.value)
                          }
                          className="border p-2 rounded w-full"
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default GeneratedForm;
