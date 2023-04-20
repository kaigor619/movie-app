import { screen, render } from "@testing-library/react";
import { themeStore, Theme } from "stores";
import { ThemeConsumer } from "./ThemeConsumer";

describe("ThemeConsumer component", () => {
  const selectedTheme: Theme = "dark";

  beforeEach(() => themeStore.setTheme(selectedTheme));

  const getChildrenContent = (theme: Theme) => `Current theme: ${theme}`;

  it("pass theme as argument in children", () => {
    const children = jest.fn(getChildrenContent);

    render(<ThemeConsumer>{children}</ThemeConsumer>);

    expect(children).toBeCalledWith(selectedTheme);
    expect(screen.getByText(getChildrenContent("dark"))).toBeInTheDocument();
  });
});
