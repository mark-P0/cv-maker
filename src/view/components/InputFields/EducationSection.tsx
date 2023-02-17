import React from 'react';
import { LabelledField } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { CVData } from '../../../model/cv-data.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

function handleEducationAdd(currentRowCt: number) {
  const accessor = `education[${currentRowCt}]`;
  const value: CVData['education'][number] = {
    university: '',
    degree: '',
    year: undefined,
    grade: undefined,
  };
  UpdateDataEvent.publish({ accessor, value });
}

function handleEducationRemove(currentRowCt: number) {
  const accessor = 'education';
  const idx = currentRowCt - 1;
  DeleteArrayDataEvent.publish({ accessor, idx });
}

function educationRowTemplate(key: number) {
  return (
    <div key={key} className="grid grid-cols-2 gap-3">
      {LabelledField('University', 'text', `education[${key}].university`)}
      {LabelledField('Degree', 'text', `education[${key}].degree`)}
      {LabelledField('Year', 'date', `education[${key}].year`)}
      {LabelledField('Grade', 'text', `education[${key}].grade`)}
    </div>
  );
}

export const EducationSection = (
  <FieldSection
    title="Education"
    rowTemplate={educationRowTemplate}
    hasMultipleRows
    onRowAdd={handleEducationAdd}
    onRowRemove={handleEducationRemove}
  />
);
