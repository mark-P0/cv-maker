import React from 'react';
import { GeneralSection } from './InputFields/GeneralSection.js';
import { WorkSection } from './InputFields/WorkSection.js';

export class InputFields extends React.Component {
  render() {
    return (
      <form className="overflow-y-scroll flex flex-col gap-4 p-4">
        {/* <h1 className="font-bold text-2xl">Fields</h1> */}
        {GeneralSection}
        {WorkSection}
      </form>
    );
  }
}
