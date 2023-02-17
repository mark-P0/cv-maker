import React from 'react';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/outline';

export class IncrementDecrementButtons extends React.Component<
  {
    onIncrease: () => void;
    onDecrease: () => void;
    disableDecrement: boolean;
  } & React.HTMLProps<HTMLDivElement>
> {
  render() {
    const { onIncrease, onDecrease, disableDecrement, ...divProps } = this.props;

    const decrement = disableDecrement ? (
      <button className="aspect-square h-full opacity-50" type="button" disabled>
        <MinusCircleIcon />
      </button>
    ) : (
      <button className="aspect-square h-full" type="button" onClick={onDecrease}>
        <MinusCircleIcon />
      </button>
    );

    return (
      <div {...divProps}>
        <button className="aspect-square h-full" type="button" onClick={onIncrease}>
          <PlusCircleIcon />
        </button>
        {decrement}
      </div>
    );
  }
}
