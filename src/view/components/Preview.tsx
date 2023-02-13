import React from 'react';
import { PersonalLayout } from './PersonalLayout.js';
import { CVData } from '../../model/cv-data.js';
import { UpdateDataEvent } from '../../controller/events.js';
import { set } from 'lodash-es';

function parseValueUpdate(accessor: string, value: string) {
  if (accessor.includes('email')) {
    if (value === '') return undefined;
    return new URL(`mailto:${value}`);
  }

  if (accessor.includes('links')) {
    if (value === '') return undefined;

    try {
      return new URL(value);
    } catch {
      null;
    }
    try {
      return new URL(`https://${value}`);
    } catch {
      null;
    }
    try {
      return new URL(`https://${value}.com`);
    } catch {
      null;
    }

    return undefined;
  }

  return value;
}

export class Preview extends React.Component {
  state: { data: CVData } = {
    data: {
      general: {
        name: '',
        location: '',
        contact: {
          email: undefined,
          number: '',
          links: [],
        },
      },
      career: [],
      projects: [],
      skills: {
        hard: [],
        soft: [],
      },
      education: [],
    },
  };

  #targetAppearance = React.createRef<HTMLDivElement>();
  #elementToScale = React.createRef<HTMLDivElement>();

  /**
   * Follow scale-and-resize approach to use proper sizes (e.g. font sizes, margins)
   * in preview layout rather than adjusting everything by hand.
   *
   * - https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
   * - https://web.dev/resize-observer/
   * - https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API
   */
  #scaleAndObserveResizes() {
    const target = this.#targetAppearance.current;
    const toScale = this.#elementToScale.current;

    if (target === null || toScale === null) {
      console.warn('Target elements are null!');
      return;
    }

    new ResizeObserver(() => {
      const factor = target.offsetWidth / toScale.offsetWidth;
      toScale.style.setProperty('transform', `scale(${factor})`);
    }).observe(target);
  }

  #UpdateDataSubscriber = async ({ accessor, value }: { accessor: string; value: string }) => {
    const { data } = this.state;
    set(data, accessor, parseValueUpdate(accessor, value));
    this.setState({ data });
  };

  componentDidMount() {
    this.#scaleAndObserveResizes();
    UpdateDataEvent.subscribe(this.#UpdateDataSubscriber);
  }

  render() {
    const { data } = this.state;

    return (
      <div className="h-full w-full bg-neutral-200 grid place-items-center p-5">
        <div
          ref={this.#targetAppearance}
          className="relative w-full aspect-[8.5/11] overflow-hidden bg-transparent shadow-xl"
        >
          <div
            ref={this.#elementToScale}
            className="absolute origin-top-left w-[8.5in] h-[11in] bg-white"
          >
            <PersonalLayout data={data} />
          </div>
        </div>
      </div>
    );
  }
}
