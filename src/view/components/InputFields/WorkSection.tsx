import React from 'react';
import { Field, LabelledField, MultipleFields } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { CVData } from '../../../model/cv-data.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

let rowIdx = 0;

function descriptionFieldTemplate(key: number) {
  return Field('text', `career[${rowIdx}].jobDescription[${key}]`, key);
}

function handleDescriptionRemove(currentFieldCt: number) {
  const idx = currentFieldCt - 1;
  const accessor = `career[${rowIdx}].jobDescription[${idx}]`;
  const value = '';
  UpdateDataEvent.publish({ accessor, value });
}

const descriptions = (
  <MultipleFields
    label="Description"
    fieldGroupClasses="grid gap-3"
    fieldTemplate={descriptionFieldTemplate}
    minFieldCt={1}
    onFieldRemove={handleDescriptionRemove}
  />
);

function handleWorkAdd(currentRowCt: number) {
  rowIdx = currentRowCt;

  const accessor = `career[${currentRowCt}]`;
  const value: CVData['career'][number] = {
    company: '',
    position: '',
    jobDescription: [],
    date: {},
  };
  UpdateDataEvent.publish({ accessor, value });
}

function handleWorkRemove(currentRowCt: number) {
  rowIdx--;

  const accessor = 'career';
  const idx = currentRowCt - 1;
  DeleteArrayDataEvent.publish({ accessor, idx });
}

function workRowTemplate(key: number) {
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
    rowTemplate={workRowTemplate}
    hasMultipleRows
    onRowAdd={handleWorkAdd}
    onRowRemove={handleWorkRemove}
  />
);
