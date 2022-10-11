import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePersist } from './index';
import { PersistProvider } from '../PersistProvider';
import React from 'react';

class MockErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

describe('usePersist', () => {
  it('throws an Error if the hook is not used within the PersistProvider', () => {
    try {
      renderHook(() => usePersist(), {
        wrapper: ({ children }) => (
          <MockErrorBoundary>{children}</MockErrorBoundary>
        ),
      });
    } catch (e) {
      const error = e as Error;
      expect(error.message).toEqual(
        'usePersist must be used in a PersistProvider'
      );
    }
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
