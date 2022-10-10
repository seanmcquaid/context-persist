import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePersist } from './index';
import { PersistProvider } from '../PersistProvider';

describe('usePersist', () => {
  it('throws an Error if the hook is not used within the PersistProvider', () => {
    expect(() => {
      renderHook(() => usePersist());
    }).toThrowError();
  });
  it('returns a value if the hook is used within the PersistProvider', () => {
    const { result } = renderHook(() => usePersist(), {
      wrapper: ({ children }) => (
        <PersistProvider
          defaultValue={'value'}
          persistKey={''}
          persistVersion={1}
        >
          {children}
        </PersistProvider>
      ),
    });
    expect(result.current.value).toEqual('value');
  });
});
