# 🧾 Form Template Builder

🌐 **Live Demo:** [Click here to view the live app](https://form-template-builder-pi.vercel.app/)

A dynamic and interactive web app that allows users to **build custom form templates**, preview them in real-time, and generate actual forms with validation. Templates are stored in the browser using **LocalStorage**, and users can add/edit/delete fields with drag-and-drop support.

---

## 🚀 Features

### 🔧 Template Builder
- Create up to **5 templates**
- Each template can contain multiple **sections**
- Each section can have multiple **fields**
- Supported field types:
  - `Label` (H1, H2, H3 styled headings)
  - `Text`
  - `Number`
  - `Boolean` (Toggle switch)
  - `Dropdown` (Enum options)
- Drag-and-drop fields within a section
- Delete fields
- Live preview of the latest saved template
- Store templates using **LocalStorage**

### 📝 Form Generator
- Select a saved template to render a form
- Validations based on field types
- Form submission saves data to **LocalStorage**

---

## 🖼️ UI Technologies

- **React.js** with functional components
- **Tailwind CSS** for styling
- **@dnd-kit/core** and **@dnd-kit/sortable** for drag-and-drop functionality

---

## 📁 Folder Structure

```bash
src/
├── components/
│   ├── FormPreview.js
│   ├── GeneratedForm.js
│   └── TemplateBuilder.js
├── context/
│   └── TemplateContext.js
├── utils/
│   └── storage.js
├── App.js
└── index.js
```



---

## 📦 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/rashid-exe/form-template-builder.git
cd form-template-builder

2.Install dependencies
npm install

3.Start the app
npm run dev

The app will run locally at http://localhost:3000

Deployment
You can deploy this project easily on platforms like:

Vercel

Netlify



