export interface ZustandStorage {
  setItem: (
    name: string,
    value: string | number | boolean | Uint8Array,
  ) => void;
  getItem: (name: string) => string | null;
  removeItem: (name: string) => void;
}
