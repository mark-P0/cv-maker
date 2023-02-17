import React from 'react';
import { GeneralSection } from './InputFields/GeneralSection.js';
import { WorkSection } from './InputFields/WorkSection.js';
import { ProjectSection } from './InputFields/ProjectSection.js';
import { EducationSection } from './InputFields/EducationSection.js';
import { SkillsSection } from './InputFields/SkillsSection.js';

export class InputFields extends React.Component {
  render() {
    return (
      <form className="overflow-y-scroll scrollbar scrollbar-thin flex flex-col gap-4 p-4 pt-0">
        {/* <h1 className="font-bold text-2xl">Fields</h1> */}
        {GeneralSection}
        {WorkSection}
        {ProjectSection}
        {EducationSection}
        {SkillsSection}
      </form>
    );
  }
}
