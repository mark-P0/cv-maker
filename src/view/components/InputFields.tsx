import React from 'react';

function Field(type: string, label: string, name: string) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs tracking-wide">{label}</span>
      <input className="px-1 flex-1" name={name} type={type} />
    </label>
  );
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
              {Field('text', 'Name', 'general.name')}
              {Field('text', 'Location', 'general.location')}
              {Field('tel', 'Contact No.', 'general.contact.number')}
              {Field('text', 'Email', 'general.contact.email')}
            </div>
            {Field('text', 'Social 1', 'general.contact.links[0]')}
            {Field('text', 'Social 2', 'general.contact.links[1]')}
          </div>
        </section>
      </form>
    );
  }
}
