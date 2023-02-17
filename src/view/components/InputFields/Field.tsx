import React from 'react';
import { UpdateDataEvent } from '../../../controller/events.js';

/**
 * So many type casts...
 */
function handleFieldUpdates(event: React.ChangeEvent) {
  const target = event.target as HTMLInputElement;

  const accessor = target.getAttribute('name') as string;
  const value = target.value;
  UpdateDataEvent.publish({ accessor, value });
}

export function Field(type: string, accessor: string, key?: React.Key) {
  return (
    <input
      key={key}
      className="px-1 py-0.5"
      type={type}
      name={accessor}
      onChange={handleFieldUpdates}
    />
  );
}

export function LabelledField(label: string, type: string, accessor: string) {
  return (
    <label className="flex flex-col gap-1">
      <h3 className="text-xs tracking-wide">{label}</h3>
      {Field(type, accessor)}
    </label>
  );
}
