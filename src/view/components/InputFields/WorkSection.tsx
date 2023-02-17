import React from 'react';
import { Field, LabelledField, MultipleFields } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

let rowIdx = 0;

function fieldTemplate(key: number) {
  return Field('text', `career[${rowIdx}].jobDescription[${key}]`, key);
}

function onFieldRemove(currentFieldCt: number) {
  const idx = currentFieldCt - 1;
  const accessor = `career[${rowIdx}].jobDescription[${idx}]`;
  const value = '';
  UpdateDataEvent.publish({ accessor, value });
}

const descriptions = (
  <MultipleFields
    label="Description"
    fieldGroupClasses="grid grid-cols-2 gap-3"
    fieldTemplate={fieldTemplate}
    onFieldRemove={onFieldRemove}
  />
);

function onRowAdd(currentRowCt: number) {
  rowIdx = currentRowCt;

  const accessor = `career[${currentRowCt}]`;
  const value = {
    company: '',
    position: '',
    jobDescription: [],
    date: {},
  };
  UpdateDataEvent.publish({ accessor, value });
}

function onRowRemove(currentRowCt: number) {
  rowIdx--;

  const accessor = 'career';
  const idx = currentRowCt - 1;
  DeleteArrayDataEvent.publish({ accessor, idx });
}

function rowTemplate(key: number) {
  return (
    <div key={key} className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        {LabelledField('Company', 'text', `career[${key}].company`)}
        {LabelledField('Position', 'text', `career[${key}].position`)}
        {LabelledField('From', 'date', `career[${key}].date.from`)}
        {LabelledField('To', 'date', `career[${key}].date.to`)}
      </div>
      {descriptions}
    </div>
  );
}

export const WorkSection = (
  <FieldSection
    title="Work Experience"
    rowTemplate={rowTemplate}
    hasMultipleRows
    onRowAdd={onRowAdd}
    onRowRemove={onRowRemove}
  />
);
