import React from 'react';
import { Field, LabelledField } from './Field.js';
import { FieldSection } from './FieldSection.js';
import { IncrementDecrementButtons } from './IncrementDecrementButtons.js';
import { UpdateDataEvent, DeleteArrayDataEvent } from '../../../controller/events.js';

class DescriptionFields extends React.Component<{ rowIdx: number }, { fieldCt: number }> {
  #MIN_FIELD_CT = 1 as const;
  state = {
    fieldCt: this.#MIN_FIELD_CT,
  };

  #addField = () => {
    const { fieldCt } = this.state;
    this.setState({
      fieldCt: fieldCt + 1,
    });
  };

  #removeField = () => {
    const { rowIdx } = this.props;
    const { fieldCt } = this.state;
    if (fieldCt === this.#MIN_FIELD_CT) return;

    const idx = fieldCt - 1;
    const accessor = `career[${rowIdx}].jobDescription[${idx}]`;
    const value = '';
    UpdateDataEvent.publish({ accessor, value });

    this.setState({
      fieldCt: fieldCt - 1,
    });
  };

  render() {
    const { rowIdx } = this.props;
    const { fieldCt } = this.state;

    const fields = Array.from({ length: fieldCt }, (_, idx) => {
      return Field('text', `career[${rowIdx}].jobDescription[${idx}]`, idx);
    });

    const disableDecrement = fieldCt == this.#MIN_FIELD_CT;

    return (
      <section className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs tracking-wide">Description</h3>
          <IncrementDecrementButtons
            onIncrease={this.#addField}
            onDecrease={this.#removeField}
            disableDecrement={disableDecrement}
            className="flex items-center gap-1 h-3"
          />
        </div>
        <div className="grid grid-cols-1 gap-3">{fields}</div>
      </section>
    );
  }
}

function onRowAdd(rowCt: number) {
  const accessor = `career[${rowCt}]`;
  const value = {
    company: '',
    position: '',
    jobDescription: [],
    date: {},
  };
  UpdateDataEvent.publish({ accessor, value });
}

function onRowRemove(rowCt: number) {
  const accessor = 'career';
  const idx = rowCt - 1;
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
      <DescriptionFields rowIdx={key} />
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
