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
