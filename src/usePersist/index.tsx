import { useContext } from 'react';
import {
  PersistUpdateValueContext,
  PersistValueContext,
} from '../PersistProvider';

export const usePersist = () => {
  const value = useContext(PersistValueContext);
  const updateValue = useContext(PersistUpdateValueContext);
  if (value === undefined || updateValue === undefined) {
    throw new Error('usePersist must be used in a PersistProvider');
  }
  return { value, updateValue };
};
