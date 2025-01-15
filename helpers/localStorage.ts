'use client';

export const getItemFromLocalStorage = (name: string, initialValue: string) => {
  return JSON.parse(localStorage.getItem(name) || initialValue);
};

export const removeItemFromLocalStorage = (name: string) => {
  localStorage.removeItem(name);
};

export const setItemToLocalStorage = <T>(name: string, data: T) => {
  localStorage.setItem(name, JSON.stringify(data));
};
