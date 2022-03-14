import { User, AppTypes } from '@cenera/models';

const KEY_PREFIX = 'keyset_';

/** Stores a value with the given key into localstorage
 * If the auth token is null or and empty string, removes it from local storage
 */
const store = (key: string, value: string) => {
  if (value == null || value.trim() === '') {
    localStorage.removeItem(KEY_PREFIX + key);
  } else {
    localStorage.setItem(KEY_PREFIX + key, value);
  }
};

/** Retrieves associated value with the given key from local storage.
 *
 * Returns `null` if the key doesn't exists.
 */
const retrieve = (key: string): string | null => {
  return localStorage.getItem(KEY_PREFIX + key);
};

/**
 * Application's shared preferences.
 */
export const preferences = {
  // =========== AUTH TOKEN

  /** Retrieves or stores authentication token.
   *
   * If the authentication token is null or an empty string, removes it from local storage
   */
  get accessToken(): string | null {
    return retrieve('AUTH_TOKEN');
  },

  set accessToken(accessToken: string | null) {
    store('AUTH_TOKEN', accessToken);
  },
  // ============ Current user info

  /** Retrieves or stores authenticated user information.
   *
   * If the user is null or an empty string, removes it from local storage
   */
  get user(): User | null {
    const jsUser = retrieve('AUTHENTICATED_USER');

    if (jsUser == null) return null;
    return JSON.parse(jsUser);
  },

  set user(user: User | null) {
    store('AUTHENTICATED_USER', JSON.stringify(user));
  },

  /** Retrieves or stores authenticated user information.
   *
   * If the user is null or an empty string, removes it from local storage
   */
  get appTypes(): AppTypes | null {
    const appTypes = retrieve('APP_TYPES');

    if (appTypes == null) return null;
    return JSON.parse(appTypes);
  },

  set appTypes(appTypes: AppTypes | null) {
    store('APP_TYPES', JSON.stringify(appTypes));
  },
};
