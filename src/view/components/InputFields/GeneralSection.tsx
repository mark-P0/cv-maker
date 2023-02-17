import React from 'react';
import { Field, LabelledField } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { IncrementDecrementButtons } from './IncrementDecrementButtons.js';
import { UpdateDataEvent } from '../../../controller/events.js';

class SocialsFields extends React.Component<unknown, { fieldCt: number }> {
  #minFieldCt = 1;
  state = {
    fieldCt: this.#minFieldCt,
  };

  #addField = () => {
    const { fieldCt } = this.state;
    this.setState({
      fieldCt: fieldCt + 1,
    });
  };

  #removeField = () => {
    const { fieldCt } = this.state;
    if (fieldCt === this.#minFieldCt) return;

    const idx = fieldCt - 1;
    const accessor = `general.contact.links[${idx}]`;
    const value = '';
    UpdateDataEvent.publish({ accessor, value });

    this.setState({
      fieldCt: fieldCt - 1,
    });
  };

  render() {
    const { fieldCt } = this.state;

    const fields = Array.from({ length: fieldCt }, (_, idx) => {
      return Field('text', `general.contact.links[${idx}]`, idx);
    });

    const disableDecrement = fieldCt == this.#minFieldCt;

    return (
      <section className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs tracking-wide">Socials</h3>
          <IncrementDecrementButtons
            onIncrease={this.#addField}
            onDecrease={this.#removeField}
            disableDecrement={disableDecrement}
            className="flex items-center gap-1 h-3"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">{fields}</div>
      </section>
    );
  }
}

function rowTemplate() {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3">
        {LabelledField('Name', 'text', 'general.name')}
        {LabelledField('Location', 'text', 'general.location')}
        {LabelledField('Contact No.', 'tel', 'general.contact.number')}
        {LabelledField('Email', 'text', 'general.contact.email')}
      </div>
      <SocialsFields />
    </div>
  );
}

export const GeneralSection = (
  <FieldSection title="" rowTemplate={rowTemplate} />
  // <FieldSection title="General Information" rowTemplate={rowTemplate} />
);
