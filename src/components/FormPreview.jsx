import { useTemplates } from "../context/TemplateContext";

const FormPreview = () => {
  const { templates, deleteTemplate } = useTemplates();

  const latest = [...templates]
    .reverse()
    .find((t) => t.sections && t.sections.length > 0);

  if (!latest)
    return (
      <p className="text-center text-gray-500 italic">
        No valid templates to preview.
      </p>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🧾 Preview: {latest.name || "Untitled"}
        </h2>
        <button
          onClick={() => deleteTemplate(latest.id)}
          className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-100 transition duration-200 text-sm font-medium"
        >
          🗑️ Delete
        </button>
      </div>

      {latest.sections.map((section) => (
        <div
          key={section.id}
          className="mb-8 bg-gray-50 p-4 rounded border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
            📁 {section.title || "Untitled Section"}
          </h3>

          {section.fields?.map((field) => (
            <div key={field.id} className="mb-5">
              {field.type === "label" ? (
                <div className="text-gray-700">
                  {field.level === "h1" && (
                    <h1 className="text-3xl font-bold">{field.label || "Untitled Label"}</h1>
                  )}
                  {field.level === "h2" && (
                    <h2 className="text-2xl font-semibold">{field.label || "Untitled Label"}</h2>
                  )}
                  {field.level === "h3" && (
                    <h3 className="text-xl font-medium">{field.label || "Untitled Label"}</h3>
                  )}
                </div>
              ) : (
                <>
                  <label className="block font-medium text-sm text-gray-600 mb-1">
                    {field.label || "Untitled Field"}
                    {field.required && (
                      <span className="text-red-500 ml-1 font-bold">*</span>
                    )}
                  </label>

                  {field.type === "dropdown" ? (
                    <select
                      className="border border-gray-300 bg-gray-100 p-2 rounded w-full text-gray-700"
                      disabled
                    >
                      {field.options?.map(
                        (opt, i) =>
                          opt?.trim() && <option key={i}>{opt}</option>
                      )}
                    </select>
                  ) : field.type === "boolean" ? (
                    <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                      <div className="opacity-50 cursor-not-allowed">
                        <input
                          type="checkbox"
                          disabled
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-not-allowed"
                        />
                        <span className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      className="border border-gray-300 bg-gray-100 p-2 rounded w-full text-gray-700"
                      disabled
                    />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FormPreview;
