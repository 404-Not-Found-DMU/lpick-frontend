import clsx from 'clsx';

export const ssl = (...classes: (string | undefined | boolean | null)[]) => {
  return clsx(classes);
}