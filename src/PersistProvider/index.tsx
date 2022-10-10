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
  persistVersion: number;
}

export const PersistProvider = ({
  children,
  defaultValue,
  persistKey,
  persistVersion,
}: PersistProviderProps): JSX.Element => {
  const key = useMemo(() => `react-persist-${persistKey}`, [persistKey]);
  const keyVersion = useMemo(() => `${key}-persistVersion`, [key]);
  const [value, setValue] = useState(localStorage.getItem(key) ?? defaultValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  useEffect(() => {
    localStorage.setItem(keyVersion, persistVersion.toString());
  }, [keyVersion, persistVersion]);

  useEffect(() => {
    if (
      Number.parseInt(localStorage.getItem(keyVersion) ?? '0') !==
      persistVersion
    ) {
      localStorage.setItem(keyVersion, persistVersion.toString());
      localStorage.setItem(key, defaultValue);
    }
  }, [defaultValue, key, keyVersion, persistVersion]);

  return (
    <PersistValueContext.Provider value={value}>
      <PersistUpdateValueContext.Provider value={setValue}>
        {children}
      </PersistUpdateValueContext.Provider>
    </PersistValueContext.Provider>
  );
};
