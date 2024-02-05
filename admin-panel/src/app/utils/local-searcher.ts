const defaultOptions: ISearchOptions = {
  fields: [],
};

export class LocalSearcher<T = {}> {
  result: T[] = [];
  constructor(private documents: T[] = [], private options = defaultOptions) {
    this.init(documents, options);
  }

  init(documents: T[], opt: ISearchOptions) {
    this.result = documents;
    this.documents = documents;
    this.options = { ...defaultOptions, ...opt };
  }

  reset() {
    return (this.result = this.documents);
  }

  search(term: string): T[] {
    term = term.trim().toLowerCase();

    if (term === '') {
      return (this.result = this.documents);
    }

    const { fields } = this.options;

    return (this.result = this.documents.filter((d) => {
      for (const f of fields) {
        if (f == 'categories') {
          for (const category of d[f]) {
            if (category.category_name?.toLowerCase().includes(term)) {
              return true;
            }
          }
        } else {
          if (d[f]?.toLowerCase().includes(term)) {
            return true;
          }
        }
      }
    }));
  }
}

export interface ISearchOptions {
  fields: string[];
}
