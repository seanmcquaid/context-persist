import { describe, it } from 'vitest';

describe('PersistProvider', () => {
  describe('storedInfo', () => {
    it('defaults to defaultValue if nothing is in localStorage', () => {});
    it('returns value in localStorage if something is there', () => {});
  });
  it('stores updated value in local storage when the value changes', () => {});
  it('clears localStorage and stores default value if persistVersion does not equal stored version', () => {});
});
