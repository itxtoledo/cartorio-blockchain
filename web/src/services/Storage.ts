

class Storage {
 
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  get<T>(key: string) : T | null {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } catch (error) {
      return null;
    }
  }

  unset(key: string) : void {
    return localStorage.removeItem(key);
  }
}

const instance = new Storage();
export { instance as Storage };