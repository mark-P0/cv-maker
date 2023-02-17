import React from 'react';
import { IncrementDecrementButtons } from './IncrementDecrementButtons.js';
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

function Label(text: string) {
  return <h3 className="text-xs tracking-wide">{text}</h3>;
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
      {Label(label)}
      {Field(type, accessor)}
    </label>
  );
}

export class MultipleFields extends React.Component<
  {
    label: string;
    fieldGroupClasses: string;
    fieldTemplate: (key: number) => JSX.Element;
    minFieldCt: number;
    onFieldAdd?: (currentFieldCt: number) => void;
    onFieldRemove?: (currentFieldCt: number) => void;
  },
  { fieldCt: number }
> {
  constructor(props: MultipleFields['props']) {
    super(props);
    const { minFieldCt } = props;
    this.state = {
      fieldCt: minFieldCt,
    };
  }

  #addField = () => {
    const { onFieldAdd } = this.props;
    const { fieldCt } = this.state;
    if (onFieldAdd) onFieldAdd(fieldCt);
    this.setState({
      fieldCt: fieldCt + 1,
    });
  };

  #removeField = () => {
    const { onFieldRemove } = this.props;
    const { fieldCt } = this.state;
    if (onFieldRemove) onFieldRemove(fieldCt);
    this.setState({
      fieldCt: fieldCt - 1,
    });
  };

  render() {
    const { label, fieldGroupClasses, fieldTemplate, minFieldCt } = this.props;
    const { fieldCt } = this.state;

    const disableDecrement = fieldCt === minFieldCt;
    const fields = Array.from({ length: fieldCt }, (_, idx) => fieldTemplate(idx));

    return (
      <section className="flex flex-col gap-1 select-none">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs tracking-wide">{label}</h3>
          <IncrementDecrementButtons
            onIncrease={this.#addField}
            onDecrease={this.#removeField}
            disableDecrement={disableDecrement}
            className="flex items-center gap-1 h-3"
          />
        </div>
        <div className={fieldGroupClasses}>{fields}</div>
      </section>
    );
  }
}
