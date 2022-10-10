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
  const [storedInfo, setStoredInfo] = useState<{
    value: any;
    version: number;
  }>(
    JSON.parse(
      localStorage.getItem(key) ??
        JSON.stringify({ value: defaultValue, version: persistVersion })
    ) as {
      value: any;
      version: number;
    }
  );

  useEffect(() => {
    if (defaultValue === Object(defaultValue)) {
      console.error(
        'You must use JSON serializable data in order for the data to persist'
      );
    }
  }, [defaultValue]);

  useEffect(() => {
    const updatedStoredInfo = {
      value: storedInfo.value,
      version: persistVersion,
    };
    localStorage.setItem(key, JSON.stringify(updatedStoredInfo));
    setStoredInfo(updatedStoredInfo);
  }, [storedInfo.value, key, persistVersion]);

  useEffect(() => {
    if (storedInfo.version !== persistVersion) {
      const initialStoredInfo = {
        value: defaultValue,
        version: persistVersion,
      };
      localStorage.removeItem(key);
      localStorage.setItem(key, JSON.stringify(initialStoredInfo));
      setStoredInfo(initialStoredInfo);
    }
  }, [defaultValue, key, persistVersion, storedInfo.version]);

  return (
    <PersistValueContext.Provider value={storedInfo.value}>
      <PersistUpdateValueContext.Provider value={setStoredInfo}>
        {children}
      </PersistUpdateValueContext.Provider>
    </PersistValueContext.Provider>
  );
};
