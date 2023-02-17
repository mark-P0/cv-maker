import React from 'react';
import { Field, MultipleFields } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

/**
 * Use a single parameterized copy of these functions?
 */
const fns = {
  hard: {
    template(key: number) {
      return Field('text', `skills.hard[${key}]`, key);
    },
    handleAdd(currentFieldCt: number) {
      const idx = currentFieldCt;
      const accessor = `skills.hard[${idx}]`;
      const value = '';
      UpdateDataEvent.publish({ accessor, value });
    },
    handleRemove(currentFieldCt: number) {
      const accessor = 'skills.hard';
      const idx = currentFieldCt - 1;
      DeleteArrayDataEvent.publish({ accessor, idx });
    },
  },
  soft: {
    template(key: number) {
      return Field('text', `skills.soft[${key}]`, key);
    },
    handleAdd(currentFieldCt: number) {
      const idx = currentFieldCt;
      const accessor = `skills.soft[${idx}]`;
      const value = '';
      UpdateDataEvent.publish({ accessor, value });
    },
    handleRemove(currentFieldCt: number) {
      const accessor = 'skills.soft';
      const idx = currentFieldCt - 1;
      DeleteArrayDataEvent.publish({ accessor, idx });
    },
  },
};

function skillsRowTemplate(key: number) {
  return (
    <div key={key} className="grid grid-cols-2 gap-3">
      <MultipleFields
        label="Hard Skills"
        fieldGroupClasses="grid gap-3"
        fieldTemplate={fns.hard.template}
        minFieldCt={0}
        onFieldAdd={fns.hard.handleAdd}
        onFieldRemove={fns.hard.handleRemove}
      />
      <MultipleFields
        label="Soft Skills"
        fieldGroupClasses="grid gap-3"
        fieldTemplate={fns.soft.template}
        minFieldCt={0}
        onFieldAdd={fns.soft.handleAdd}
        onFieldRemove={fns.soft.handleRemove}
      />
    </div>
  );
}

export const SkillsSection = <FieldSection title="Skills" rowTemplate={skillsRowTemplate} />;
