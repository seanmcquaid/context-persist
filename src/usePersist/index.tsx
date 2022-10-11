import { useContext } from 'react';
import {
  PersistUpdateValueContext,
  PersistValueContext,
} from '../PersistProvider';

export const usePersist = (): {
  value: any;
  updateValue: (value: any) => void;
} => {
  const value = useContext(PersistValueContext);
  const updateValue = useContext(PersistUpdateValueContext);
  if (value === undefined || updateValue === undefined) {
    throw new Error('usePersist must be used in a PersistProvider');
  }
  return { value, updateValue };
};
