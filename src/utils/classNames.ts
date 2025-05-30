import clsx from 'clsx';

/**
 * ssl: Simple Styled List
 * A wrapper around clsx to compose Tailwind classes.
 */
export function ssl(...classes: (string | undefined | boolean | null)[]) {
  return clsx(classes);
}