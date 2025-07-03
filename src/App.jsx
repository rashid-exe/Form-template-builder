import React from 'react';
import TemplateBuilder from './components/TemplateBuilder';
import GeneratedForm from './components/GeneratedForm';
import FormPreview from './components/FormPreview';
import { TemplateProvider } from './context/TemplateContext';

function App() {
  return (
    <TemplateProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <header className="text-center">
            <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow-sm">
              Form Template Builder
            </h1>
            <p className="text-gray-600 mt-2">
              Build, Preview & Generate Forms with ease
            </p>
          </header>

          <section className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
            <TemplateBuilder />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md border border-green-100">
            <FormPreview />
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
            <GeneratedForm />
          </section>
        </div>
      </div>
    </TemplateProvider>
  );
}

export default App;
