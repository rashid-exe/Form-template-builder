import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const fieldTypes = ['label', 'text', 'number', 'boolean', 'dropdown'];

function SortableItem({ field, index, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="relative"
    >
      
      <div
        {...listeners}
        className="absolute -left-6 top-1/2 -translate-y-1/2 cursor-grab text-gray-400 hover:text-gray-700"
        title="Drag to reorder"
      >
          🟰
      </div>
      {children}
    </div>
  );
}

const Section = ({ section, updateSection }) => {
  const [title, setTitle] = useState(section.title);
  const [fields, setFields] = useState(section.fields);

  useEffect(() => {
    updateSection({ ...section, title, fields });
  }, [fields, title]);

  const addField = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        label: '',
        type: 'text',
        required: false,
        options: ['', '', '', '', ''],
        level: 'h1'
      }
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const updateOption = (fieldIndex, optIndex, value) => {
    const updated = [...fields];
    updated[fieldIndex].options[optIndex] = value;
    setFields(updated);
  };

  const deleteField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      setFields((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="border p-4 rounded mb-4 bg-gray-50">
      <input
        type="text"
        placeholder="Section Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="font-semibold border-b p-2 mb-4 w-full"
      />

      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field, idx) => (
            <SortableItem key={field.id} field={field} index={idx}>
              <div className="mb-4 p-3 bg-white rounded shadow-sm border pl-8 relative">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <input
                    type="text"
                    placeholder="Field Label"
                    value={field.label}
                    onChange={(e) => updateField(idx, 'label', e.target.value)}
                    className="border p-2 flex-1 rounded"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => updateField(idx, 'type', e.target.value)}
                    className="border p-2 rounded"
                  >
                    {fieldTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(idx, 'required', e.target.checked)
                      }
                    />
                    Required
                  </label>
                  <button
                    onClick={() => deleteField(idx)}
                    className="text-red-500 text-xs ml-2"
                    title="Delete Field"
                  >
                    🗑️
                  </button>
                </div>

                
                {field.type === 'label' && (
                  <select
                    value={field.level || 'h1'}
                    onChange={(e) => updateField(idx, 'level', e.target.value)}
                    className="border p-2 rounded mb-2"
                  >
                    <option value="h1">H1</option>
                    <option value="h2">H2</option>
                    <option value="h3">H3</option>
                  </select>
                )}

                
                {field.type === 'dropdown' && (
                  <div className="grid grid-cols-2 gap-2">
                    {field.options.map((opt, optIdx) => (
                      <input
                        key={optIdx}
                        type="text"
                        placeholder={`Option ${optIdx + 1}`}
                        value={opt}
                        onChange={(e) =>
                          updateOption(idx, optIdx, e.target.value)
                        }
                        className="border p-2 rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={addField}
        className="text-blue-600 font-medium mt-2 hover:underline"
      >
        + Add Field
      </button>
    </div>
  );
};

export default Section;
