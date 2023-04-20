import { FavoriteMovie, FavoriteMovies } from "api/movieApi";

export class MoviesDb {
  static db: IDBDatabase | null = null;
  static readonly dbName = "movies";
  static readonly storeName = "favorites";
  static readonly version = 1;

  create(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const indexedDB = window.indexedDB;

      if (!indexedDB) {
        reject("This browser doesn't support IndexedDB");
        return;
      }
      const openDb = indexedDB.open(MoviesDb.dbName, MoviesDb.version);

      openDb.onerror = (event) => {
        reject(event);
      };

      openDb.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const store = openDb.result.createObjectStore(MoviesDb.storeName, {
          keyPath: "id",
          autoIncrement: true,
        });

        if (!store.indexNames.contains("movie_title"))
          store.createIndex("movie_title", ["title"], { unique: false });
      };
      openDb.onsuccess = () => {
        resolve(openDb.result);
      };
    });
  }

  async connect() {
    MoviesDb.db = MoviesDb.db || (await this.create());
    return MoviesDb.db;
  }

  async add(value: Omit<FavoriteMovie, "id">): Promise<IDBValidKey> {
    const db = await this.connect();

    return new Promise<IDBValidKey>((resolve, reject) => {
      const transaction = db.transaction(MoviesDb.storeName, "readwrite");

      const store = transaction.objectStore(MoviesDb.storeName);

      const request = store.put(value);

      transaction.onerror = () => {
        reject(transaction.error);
      };

      transaction.oncomplete = () => {
        resolve(request.result);
      };
    });
  }
  async update(value: FavoriteMovie): Promise<FavoriteMovie> {
    const db = await this.connect();

    return new Promise<FavoriteMovie>((resolve, reject) => {
      const transaction = db.transaction(MoviesDb.storeName, "readwrite");

      const store = transaction.objectStore(MoviesDb.storeName);

      store.put(value);

      transaction.oncomplete = () => {
        resolve(value);
      };

      transaction.onerror = () => {
        reject(transaction.error);
      };
    });
  }

  async getAll(): Promise<FavoriteMovies> {
    const db = await this.connect();

    return new Promise<FavoriteMovies>((resolve, reject) => {
      const transaction = db.transaction(MoviesDb.storeName, "readonly");

      const store = transaction.objectStore(MoviesDb.storeName);

      const request = store.getAll();

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  static clean = () => {
    const indexedDB = window.indexedDB;

    indexedDB.deleteDatabase(MoviesDb.dbName);
  };
}
