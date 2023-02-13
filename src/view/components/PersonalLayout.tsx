import React from 'react';
import { CVData, DateRange } from '../../model/cv-data.js';
import '../fonts/cabin.css';
import '../fonts/eb-garamond.css';

/**
 * Non-breaking space alias.
 * `&nbsp;` is escaped when used as a string.
 * It works fine when used directly when JSX however.
 *
 * https://stackoverflow.com/questions/37909134/nbsp-jsx-not-working
 */
const nbsp = '\u00A0';

const shortMonthFormatter = new Intl.DateTimeFormat('en-us', { month: 'short' });
function parseDate(date?: Date) {
  if (!date) return 'present';

  const year = date.getFullYear();
  const shortMonth = shortMonthFormatter.format(date);
  return `${shortMonth} ${year}`;
}
function parseDateRange(date: DateRange): string {
  const { from, to } = date;
  if (!(from && to)) return nbsp;

  return `${parseDate(from)} to ${parseDate(from)}`;
}

function parseDescription(description: string[]) {
  const toDisplay = description.length > 0 ? description.slice(0, 3) : [nbsp];
  return toDisplay.map((desc, idx) => <li key={idx}>{desc}</li>);
}

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

class Chunk extends React.Component<React.PropsWithChildren<{ title: string }>> {
  render() {
    const { title, children } = this.props;

    return (
      <section>
        <h2 className="text-[18pt] uppercase font-bold tracking-widest text-center border-b-2 border-black mb-3">
          {title}
        </h2>
        <div className="flex flex-col gap-[16pt]">{children}</div>
      </section>
    );
  }
}

class ChunkRow extends React.Component<
  React.PropsWithChildren<{
    title: string;
    subtitle: string;
    dates: string;
  }>
> {
  render() {
    const { title, subtitle, dates, children } = this.props;

    return (
      <section className="grid grid-cols-5 px-[16pt]">
        <div className="text-right">
          <h3 className="text-[12pt] font-bold tracking-tight">{title || nbsp}</h3>
          <p className="text-[10pt] font-['GWFH_EBGaramond']">{subtitle || nbsp}</p>
          <p className="text-[8pt]">{dates || nbsp}</p>
        </div>
        <BulletedList
          orientation="vertical"
          hasFirstBullet={true}
          isBulletWide={true}
          canWrapItems={true}
          className="text-[10pt] col-span-4"
        >
          {children}
        </BulletedList>
      </section>
    );
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
          className="text-[14pt] font-['GWFH_EBGaramond']"
        >
          <li>{contact.number}</li>
          <li>{location}</li>
        </BulletedList>
        <BulletedList
          orientation="horizontal"
          hasFirstBullet={false}
          isBulletWide={false}
          canWrapItems={false}
          className="text-[10pt] font-['GWFH_EBGaramond']"
        >
          <li>{SocialLink(contact.email)}</li>
          <li>{SocialLink(contact.links[0])}</li>
          <li>{SocialLink(contact.links[1])}</li>
        </BulletedList>
      </header>
    );
  }
  get #career() {
    const { data } = this.props;
    const { career } = data;
    if (career.length === 0) return null;

    const rows = career.map(({ company, position, jobDescription, date }, idx) => {
      return (
        <ChunkRow key={idx} title={position} subtitle={company} dates={parseDateRange(date)}>
          {parseDescription(jobDescription)}
        </ChunkRow>
      );
    });

    return <Chunk title="Experience">{rows}</Chunk>;
  }
  get #projects() {
    const { data } = this.props;
    const { projects } = data;
    if (projects.length === 0) return null;

    const rows = projects.map(({ name, type, description, date }, idx) => {
      return (
        <ChunkRow key={idx} title={name} subtitle={type} dates={parseDateRange(date)}>
          {parseDescription(description)}
        </ChunkRow>
      );
    });

    return <Chunk title="Projects">{rows}</Chunk>;
  }
  get #education() {
    const { data } = this.props;
    const { education } = data;
    if (education.length === 0) return null;

    const rows = education.map(({ university, degree, year, grade }, idx) => {
      const batch = year ? `Batch ${year.getFullYear()}` : nbsp;
      const avg = grade ? (
        <>
          <br />
          Latest Grade: <span className="text-[12pt] font-bold">{grade}</span>
        </>
      ) : null;

      return (
        <ChunkRow key={idx} title={degree || nbsp} subtitle={batch} dates="">
          <li>
            <span>
              <span className="font-bold">{university || nbsp}</span>
              {avg}
            </span>
          </li>
        </ChunkRow>
      );
    });

    return <Chunk title="Education">{rows}</Chunk>;
  }
  get #skills() {
    const { data } = this.props;
    const { skills } = data;
    const { hard, soft } = skills;
    if (hard.length === 0 && soft.length === 0) return null;

    const addlSkills =
      hard.length > 0 ? (
        <Chunk title="Additional Skills">
          <BulletedList
            orientation="horizontal"
            hasFirstBullet={false}
            isBulletWide={false}
            canWrapItems={true}
            className="text-[10pt] justify-center px-[32pt]"
          >
            {hard.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </BulletedList>
        </Chunk>
      ) : null;

    const personalAttrs =
      soft.length > 0 ? (
        <Chunk title="Personal Attributes">
          <BulletedList
            orientation="horizontal"
            hasFirstBullet={false}
            isBulletWide={false}
            canWrapItems={true}
            className="text-[10pt] justify-center px-[32pt]"
          >
            {soft.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </BulletedList>
        </Chunk>
      ) : null;

    return (
      <div className="flex [&>*]:flex-1 gap-[32pt]">
        {addlSkills}
        {personalAttrs}
      </div>
    );
  }

  render() {
    const margin = 'p-[0.5in]';

    return (
      <div className={`${margin} flex flex-col justify-evenly h-full font-['GWFH_Cabin']`}>
        {this.#general}
        {this.#career}
        {this.#projects}
        {this.#education}
        {this.#skills}
      </div>
    );
  }
}
