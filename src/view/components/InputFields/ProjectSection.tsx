import React from 'react';
import { Field, LabelledField, MultipleFields } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { CVData } from '../../../model/cv-data.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

let rowIdx = 0;

function descriptionFieldTemplate(key: number) {
  return Field('text', `projects[${rowIdx}].description[${key}]`, key);
}

function handleDescriptionRemove(currentFieldCt: number) {
  const idx = currentFieldCt - 1;
  const accessor = `projects[${rowIdx}].description[${idx}]`;
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

function handleProjectAdd(currentRowCt: number) {
  rowIdx = currentRowCt;

  const accessor = `projects[${currentRowCt}]`;
  const value: CVData['projects'][number] = {
    name: '',
    type: '',
    description: [],
    date: {},
  };
  UpdateDataEvent.publish({ accessor, value });
}

function handleProjectRemove(currentRowCt: number) {
  rowIdx--;

  const accessor = 'projects';
  const idx = currentRowCt - 1;
  DeleteArrayDataEvent.publish({ accessor, idx });
}

function projectRowTemplate(key: number) {
  return (
    <div key={key} className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        {LabelledField('Project Name', 'text', `projects[${key}].name`)}
        {LabelledField('Project Type', 'text', `projects[${key}].type`)}
        {LabelledField('From', 'date', `projects[${key}].date.from`)}
        {LabelledField('To', 'date', `projects[${key}].date.to`)}
      </div>
      {descriptions}
    </div>
  );
}

export const ProjectSection = (
  <FieldSection
    title="Projects"
    rowTemplate={projectRowTemplate}
    hasMultipleRows
    onRowAdd={handleProjectAdd}
    onRowRemove={handleProjectRemove}
  />
);
