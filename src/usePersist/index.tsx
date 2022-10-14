import { useContext } from 'react';
import {
  PersistUpdateValueContext,
  PersistValueContext,
} from '../PersistProvider';

export function usePersist<T = any>(): {
  value: T;
  updateValue: (value: T) => void;
} {
  const value = useContext<T>(PersistValueContext);
  const updateValue: ((value: T) => void) | undefined = useContext(
    PersistUpdateValueContext
  );
  if (value === undefined || updateValue === undefined) {
    throw new Error('usePersist must be used in a PersistProvider');
  }
  return { value, updateValue };
}
