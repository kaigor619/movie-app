import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination component", () => {
  const onChangePage = jest.fn();

  beforeEach(() => {
    onChangePage.mockClear();
  });

  test("shows prev and next arrows ", () => {
    render(<Pagination totalCount={100} onChangePage={onChangePage} />);

    expect(screen.getByText(/</i)).toBeInTheDocument();
    expect(screen.getByText(/>/i)).toBeInTheDocument();
  });
  test("shows active default page", () => {
    render(<Pagination totalCount={100} onChangePage={onChangePage} />);

    const items = screen.getAllByRole("listitem");

    const foundActiveItem = items.find((x) => x.textContent === "1");

    expect(foundActiveItem).toHaveClass("selected");
  });
  test("fires onChangePage when click on prev arrow", async () => {
    render(
      <Pagination
        totalCount={100}
        activePage={32}
        onChangePage={onChangePage}
      />
    );

    await userEvent.click(screen.getByText(/</i));

    expect(onChangePage).toBeCalledWith(31);
  });
  test("fires onChangePage when click on next arrow", async () => {
    render(
      <Pagination
        totalCount={100}
        activePage={32}
        onChangePage={onChangePage}
      />
    );

    await userEvent.click(screen.getByText(/>/i));

    expect(onChangePage).toBeCalledWith(33);
  });

  test("fires onChangePage when user click on page number", async () => {
    const onChangePage = jest.fn();

    render(
      <Pagination
        totalCount={100}
        activePage={32}
        onChangePage={onChangePage}
      />
    );

    await userEvent.click(screen.getByText("34"));

    expect(onChangePage).toBeCalledWith(33);
  });
});
