import { MMKV } from 'react-native-mmkv';
import { ZustandStorage } from './types';
import { useUserStore } from '../userStore';
import { useShortcutsStore } from '../shortcutsStore';
import { useStatusStore } from '../statusStore';
import { useVacationsStore } from '../vacationsStore';

const storage = new MMKV();

const zustandStorage: ZustandStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    storage.delete(name);
  },
};

export default zustandStorage;

export const clearAllStores = () => {
  useUserStore.getState().logout();
  useShortcutsStore.getState().logout();
  useStatusStore.getState().logout();
  useShortcutsStore.getState().logout();
  useVacationsStore.getState().logout();
};
