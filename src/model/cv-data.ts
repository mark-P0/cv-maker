export type DateRange = { from?: Date; to?: Date };
export type CVData = {
  general: {
    name: string;
    /**
     * Home address, or where is currently based
     */
    location: string;
    contact: {
      email?: URL;
      /**
       * - Numbers could have symbols, e.g. `+-()`
       * - Numbers could have whitespaces
       * - Numbers could start with 0, which when taken as a number type would denote octal numbers
       */
      number: string;
      /**
       * URLs to e.g. social media accounts
       */
      links: URL[];
    };
  };
  career: {
    company: string;
    position: string;
    jobDescription: string[];
    /**
     * Dates working for the company
     */
    date: DateRange;
  }[];
  projects: {
    name: string;
    type: string;
    description: string[];
    date: DateRange;
  }[];
  skills: {
    hard: string[];
    soft: string[];
  };
  education: {
    university: string;
    degree: string;
    year?: Date;
    grade?: number | string;
  }[];
};
