import React from 'react';
import { IncrementDecrementButtons } from './IncrementDecrementButtons.js';

export class FieldSection extends React.Component<
  {
    title: string;
    rowTemplate: (key: number) => JSX.Element;
    hasMultipleRows?: boolean; // `undefined` can be used as a boolean-ish
    onRowAdd?: (currentRowCt: number) => void;
    onRowRemove?: (currentRowCt: number) => void;
  },
  { rowCt: number }
> {
  #MIN_ROW_CT = 0 as const;
  state = {
    rowCt: 0,
  };

  #addRow = () => {
    const { onRowAdd } = this.props;
    const { rowCt } = this.state;
    this.setState({
      rowCt: rowCt + 1,
    });
    if (onRowAdd) onRowAdd(rowCt);
  };

  #removeRow = () => {
    const { onRowRemove } = this.props;
    const { rowCt } = this.state;
    this.setState({
      rowCt: rowCt - 1,
    });
    if (onRowRemove) onRowRemove(rowCt);
  };

  render() {
    const { title, rowTemplate, hasMultipleRows } = this.props;
    const { rowCt } = this.state;

    const disableDecrement = rowCt === this.#MIN_ROW_CT;
    const buttons = hasMultipleRows ? (
      <IncrementDecrementButtons
        onIncrease={this.#addRow}
        onDecrease={this.#removeRow}
        disableDecrement={disableDecrement}
        className="flex items-center gap-1 h-4"
      />
    ) : null;

    const header =
      title !== '' ? (
        <div className="flex items-center gap-2 mb-2">
          <h2 className="font-bold text-lg">{title}</h2>
          {buttons}
        </div>
      ) : null;

    const length = hasMultipleRows ? rowCt : 1;
    const rows = Array.from({ length }, (_, idx) => rowTemplate(idx));

    return (
      <section>
        {header}
        <div>{rows}</div>
      </section>
    );
  }
}
