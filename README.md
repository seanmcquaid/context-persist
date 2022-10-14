# Context Persist

A lightweight solution for storing values in Context in Local Storage. 

If you prefer to utilize Context for Global State Management but want similar functionality to Redux Persist, this library might be a good fit for your use case. 

We do not currently support storing non-serializable data (like Dates) into Local Storage. We might look at adding a transform function option later on if this is requested enough.

## Installing

Using npm:

```bash
$ npm install react-persist
```

Using yarn:

```bash
$ yarn add react-persist
```

## Basic Usage

```tsx
import { PersistProvider } from 'react-persist';

const ParentComponent: FC = () => {
  return (
    <PersistProvider
      defaultValue="default here"
      persistKey="cool-key-here"
      persistVersion={1}
    >
      <ChildComponent />
    </PersistProvider>
  );
};
```

```tsx
const ChildComponent: FC = () => {
  const { value, updateValue } = usePersist<string>();

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => updateValue('New value for local storage')}>
        Update Value!
      </button>
    </div>
  );
};
```

## API

### PersistProvider

The Provider for persisting a value in local storage. If you want to guarantee a clear on values in local storage for all users, you just need to update the version number for the specific Provider.

```tsx
interface PersistProviderProps {
    children: ReactNode;
    defaultValue: any;
    persistKey: string;
    persistVersion: number;
}

const PersistProvider: ({ children, defaultValue, persistKey, persistVersion, }: PersistProviderProps) => JSX.Element;
```

### usePersist

A hook that will give you access to the value stored in the PersistProvider, as well as, an update value function for actually changing the value in the Provider. You have the option to pass in the type of the value if you would like to have some type safety.

```tsx
function usePersist<T = any>(): {
  value: T;
  updateValue: (value: T) => void;
};
```

## Found a bug or want an enhancement?

Please file an issue on this repo and I will do my best to prioritize the requests appropriately!
