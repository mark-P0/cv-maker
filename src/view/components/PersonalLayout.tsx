import React from 'react';
import { CVData } from '../../model/cv-data.js';

/**
 * Non-breaking space alias.
 * `&nbsp;` is escaped when used as a string.
 * It works fine when used directly when JSX however.
 *
 * https://stackoverflow.com/questions/37909134/nbsp-jsx-not-working
 */
const nbsp = '\u00A0';

/**
 * Preferred over `list-style-type` for ease of styling
 */
class BulletedList extends React.Component<
  React.PropsWithChildren<{
    orientation: 'horizontal' | 'vertical';
    hasFirstBullet: boolean;
    isBulletWide: boolean;
    canWrapItems: boolean;
    className?: string;
  }>
> {
  static defaultProps = {
    className: '',
  };

  render() {
    const { orientation, hasFirstBullet, isBulletWide, canWrapItems } = this.props;
    const { className, children } = this.props;

    /**
     * Better way of doing this?
     */
    const bulletClasses = (
      hasFirstBullet
        ? [
            "[&>*::before]:content-['•']",
            isBulletWide ? '[&>*::before]:mx-[1.75em]' : '[&>*::before]:mx-[0.5em]',
          ]
        : [
            "[&>*:nth-child(n+2)::before]:content-['•']",
            isBulletWide
              ? '[&>*:nth-child(n+2)::before]:mx-[1.5em]'
              : '[&>*:nth-child(n+2)::before]:mx-[0.5em]',
          ]
    ).join(' ');
    const wrap = canWrapItems ? 'flex-wrap' : 'flex-nowrap [&>*]:whitespace-nowrap';
    const display = orientation === 'horizontal' ? 'flex' : 'flex flex-col';
    const classes = `${className} ${display} ${wrap} ${bulletClasses} [&>*]:flex`;

    return <ul className={classes}>{children}</ul>;
  }
}

function SocialLink(link?: URL) {
  if (!link) return nbsp;

  const { href, hostname, pathname } = link;

  return (
    <a className="underline" href={href} target="_blank" rel="noreferrer">
      {hostname + pathname}
    </a>
  );
}

export class PersonalLayout extends React.Component<{ data: CVData }> {
  get #general() {
    const { data } = this.props;
    const { general } = data;
    const { name, location, contact } = general;

    return (
      <header className="flex flex-col items-center">
        <h1 className="text-[24pt] uppercase font-bold mb-1 tracking-wide">{name || nbsp}</h1>
        <BulletedList
          orientation="horizontal"
          hasFirstBullet={false}
          isBulletWide={false}
          canWrapItems={false}
          className="text-[14pt]"
        >
          <li>{contact.number}</li>
          <li>{location}</li>
        </BulletedList>
        <BulletedList
          orientation="horizontal"
          hasFirstBullet={false}
          isBulletWide={false}
          canWrapItems={false}
          className="text-[10pt]"
        >
          <li>{SocialLink(contact.email)}</li>
          <li>{SocialLink(contact.links[0])}</li>
          <li>{SocialLink(contact.links[1])}</li>
        </BulletedList>
      </header>
    );
  }

  render() {
    const margin = 'p-[0.5in]';

    return <div className={`${margin} flex flex-col justify-evenly h-full`}>{this.#general}</div>;
  }
}
