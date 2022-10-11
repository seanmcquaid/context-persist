import { describe, expect, it, beforeEach, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { usePersist } from '../usePersist';
import { PersistProvider } from './index';

describe('PersistProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  describe('storedInfo', () => {
    it('defaults to defaultValue if nothing is in localStorage', () => {
      const { result } = renderHook(() => usePersist(), {
        wrapper: ({ children }) => (
          <PersistProvider
            defaultValue={'value'}
            persistKey={'key'}
            persistVersion={1}
          >
            {children}
          </PersistProvider>
        ),
      });
      expect(result.current.value).toEqual('value');
    });
    it('returns value in localStorage if something is there', () => {
      localStorage.setItem(
        'react-persist-key',
        JSON.stringify({ value: 'new value', version: 1 })
      );
      const { result } = renderHook(() => usePersist(), {
        wrapper: ({ children }) => (
          <PersistProvider
            defaultValue={'value'}
            persistKey={'key'}
            persistVersion={1}
          >
            {children}
          </PersistProvider>
        ),
      });
      expect(result.current.value).toEqual('new value');
    });
  });
  it('stores updated value in local storage when the value changes', async () => {
    const { result } = renderHook(() => usePersist(), {
      wrapper: ({ children }) => (
        <PersistProvider
          defaultValue={'value'}
          persistKey={'key'}
          persistVersion={1}
        >
          {children}
        </PersistProvider>
      ),
    });
    act(() => {
      result.current.updateValue('new value in local');
    });
    await waitFor(() =>
      expect(
        JSON.parse(localStorage.getItem('react-persist-key') ?? '{}').value
      ).toEqual('new value in local')
    );
  });
  it('clears localStorage and stores default value if persistVersion does not equal stored version', async () => {
    localStorage.setItem(
      'react-persist-key',
      JSON.stringify({ value: 'new value', version: 1 })
    );
    const { result } = renderHook(() => usePersist(), {
      wrapper: ({ children }) => (
        <PersistProvider
          defaultValue={'value'}
          persistKey={'key'}
          persistVersion={12}
        >
          {children}
        </PersistProvider>
      ),
    });
    await waitFor(() => expect(result.current.value).toEqual('value'));
  });
  it('logs console error if the default value is not serializable', async () => {
    const mockConsoleError = vi.fn();
    const mockConsole = { error: mockConsoleError };
    vi.stubGlobal('console', mockConsole);
    renderHook(() => usePersist(), {
      wrapper: ({ children }) => (
        <PersistProvider
          defaultValue={new Date()}
          persistKey={'key'}
          persistVersion={1}
        >
          {children}
        </PersistProvider>
      ),
    });
    await waitFor(() => expect(mockConsoleError).toHaveBeenCalled());
  });
});
