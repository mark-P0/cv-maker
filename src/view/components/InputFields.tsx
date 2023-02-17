import React from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';
import { UpdateDataEvent } from '../../controller/events.js';

/**
 * So many type casts...
 */
const handleFieldUpdates: React.ChangeEventHandler = function (event) {
  const target = event.target as HTMLInputElement;

  const accessor = target.getAttribute('name') as string;
  const value = target.value;

  UpdateDataEvent.publish({ accessor, value });
};

function Field(type: string, accessor: string, key?: React.Key) {
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

function LabelledField(label: string, type: string, accessor: string) {
  return (
    <label className="flex flex-col gap-1">
      <h3 className="text-xs tracking-wide">{label}</h3>
      {Field(type, accessor)}
    </label>
  );
}

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

    const removeButton =
      fieldCt == this.#minFieldCt ? (
        <button className="aspect-square h-full opacity-50" type="button" disabled>
          <MinusCircleIcon />
        </button>
      ) : (
        <button className="aspect-square h-full" type="button" onClick={this.#removeField}>
          <MinusCircleIcon />
        </button>
      );

    return (
      <section className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs tracking-wide">Socials</h3>
          <button className="aspect-square h-full" type="button" onClick={this.#addField}>
            <PlusCircleIcon />
          </button>
          {removeButton}
        </div>
        <div className="grid grid-cols-2 gap-3">{fields}</div>
      </section>
    );
  }
}

export class InputFields extends React.Component {
  render() {
    return (
      <form className="overflow-y-scroll bg-neutral-100 flex flex-col gap-3 p-4">
        {/* <h1 className="font-bold text-2xl">Fields</h1> */}
        <section>
          <h2 className="font-bold text-lg mb-2">General Information</h2>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              {LabelledField('Name', 'text', 'general.name')}
              {LabelledField('Location', 'text', 'general.location')}
              {LabelledField('Contact No.', 'tel', 'general.contact.number')}
              {LabelledField('Email', 'text', 'general.contact.email')}
            </div>
            <SocialsFields />
          </div>
        </section>
      </form>
    );
  }
}
