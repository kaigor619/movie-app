import { makeAutoObservable, autorun } from "mobx";
import { makePersistable } from "mobx-persist-store";

export type Theme = "dark" | "light";

const isBrowserDefaultDark = () => {
  if (process.env.NODE_ENV === "test") return true;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

class ThemeStore {
  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "theme",
      properties: ["theme"],
      storage: window.localStorage,
    });

    autorun(() => {
      if (this.theme === "dark") {
        document.body.setAttribute("data-theme", "dark");
      }

      if (this.theme === "light") {
        document.body.setAttribute("data-theme", "light");
      }
    });
  }

  theme: Theme = isBrowserDefaultDark() ? "dark" : "light";

  setTheme = (theme: Theme): void => {
    this.theme = theme;
  };

  toggleTheme = (): void => {
    this.theme = this.theme === "dark" ? "light" : "dark";
  };
}

export const themeStore = new ThemeStore();
