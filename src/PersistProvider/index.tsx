import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

const PersistValueContext = createContext<any | undefined>(undefined);
const PersistUpdateValueContext = createContext<
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
  const storedInfo = JSON.parse(localStorage.getItem('react-persist') ?? '{}');
  // object will have keys of persistKeys in it, within that persistKey will be an object with a value and a version
  const [value, setValue] = useState(storedInfo[persistKey] ?? defaultValue);

  useEffect(() => {
    const updatedStoredInfo = {
      ...storedInfo,
      [persistKey]: { ...value[persistKey] },
    };
    localStorage.setItem('react-persist', updatedStoredInfo);
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
