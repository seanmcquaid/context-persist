import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

export const PersistValueContext = createContext<any | undefined>(undefined);
export const PersistUpdateValueContext = createContext<
  Dispatch<SetStateAction<any>> | undefined
>(undefined);

interface PersistProviderProps {
  children: ReactNode;
  defaultValue: any;
  persistKey: string;
}

export const PersistProvider = ({
  children,
  defaultValue,
  persistKey,
}: PersistProviderProps): JSX.Element => {
  const key = useMemo(() => `react-persist-${persistKey}`, [persistKey]);
  const [value, setValue] = useState(localStorage.getItem(key) ?? defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return (
    <PersistValueContext.Provider value={value}>
      <PersistUpdateValueContext.Provider value={setValue}>
        {children}
      </PersistUpdateValueContext.Provider>
    </PersistValueContext.Provider>
  );
};
