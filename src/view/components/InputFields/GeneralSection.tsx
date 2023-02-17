import React from 'react';
import { Field, LabelledField, MultipleFields } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { UpdateDataEvent } from '../../../controller/events.js';

function socialFieldTemplate(key: number) {
  return Field('text', `general.contact.links[${key}]`, key);
}

function handleSocialRemove(currentFieldCt: number) {
  const idx = currentFieldCt - 1;
  const accessor = `general.contact.links[${idx}]`;
  const value = '';
  UpdateDataEvent.publish({ accessor, value });
}

const socials = (
  <MultipleFields
    label="Socials"
    fieldGroupClasses="grid grid-cols-2 gap-3"
    fieldTemplate={socialFieldTemplate}
    onFieldRemove={handleSocialRemove}
  />
);

function generalRowTemplate(key: number) {
  return (
    <div key={key} className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        {LabelledField('Name', 'text', 'general.name')}
        {LabelledField('Location', 'text', 'general.location')}
        {LabelledField('Contact No.', 'tel', 'general.contact.number')}
        {LabelledField('Email', 'text', 'general.contact.email')}
      </div>
      {socials}
    </div>
  );
}

export const GeneralSection = (
  <FieldSection title="" rowTemplate={generalRowTemplate} />
  // <FieldSection title="General Information" rowTemplate={rowTemplate} />
);
