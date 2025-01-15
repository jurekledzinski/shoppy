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
