export interface BaseFetchResult {
  loading: boolean;
  error: Error | null;
}

export interface ContentFetchResult<T> {
  loading: boolean;
  error: Error | null;
  sectionContent?: T;
}
