import { ReadonlyURLSearchParams } from 'next/navigation';

export const removeQueryUrl = (
  searchParams: ReadonlyURLSearchParams,
  queryName: string
) => {
  const currentParams = new URLSearchParams(searchParams.toString());
  currentParams.delete(queryName);
  const newPath = `${window.location.pathname}?${currentParams.toString()}`;
  return newPath;
};

export const redirectWithQueries = () => {
  const url = window.location.pathname;
  const currentSearchParams = window.location.search;
  const newUrl = `${url}${currentSearchParams}`;
  return newUrl;
};

export const setQueriesWithoutReload = (
  searchParams: ReadonlyURLSearchParams,
  queries: string[][]
) => {
  const updatedParams = new URLSearchParams(searchParams);
  const objectEntries = Object.fromEntries(queries);

  for (const key in objectEntries) {
    updatedParams.set(key, objectEntries[key]);
  }

  const query = updatedParams.toString();
  window.history.pushState(null, '', '?' + query);
};
