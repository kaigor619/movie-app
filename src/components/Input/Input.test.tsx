import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input component", () => {
  const onChange = jest.fn();
  const onFocus = jest.fn();
  const mockInputValue = "Bruce";

  afterEach(() => {
    onChange.mockClear();
    onFocus.mockClear();
  });

  test("shows input value", () => {
    render(
      <Input
        name="name"
        value={mockInputValue}
        label="Name"
        errorMessage="Required"
        onChange={onChange}
        type="text"
      />
    );

    expect(screen.getByDisplayValue(mockInputValue)).toBeInTheDocument();
  });

  test("shows input label", () => {
    render(
      <Input
        name="name"
        value=""
        label="Name"
        errorMessage="Required"
        onChange={onChange}
        type="text"
      />
    );

    expect(screen.getByText(/Name/i)).toBeInTheDocument();
  });

  test("shows error message", () => {
    render(
      <Input
        name="name"
        value=""
        label="Name"
        errorMessage="Required"
        onChange={onChange}
        type="text"
      />
    );

    expect(screen.getByText(/Required/i)).toBeInTheDocument();
  });

  test("checks snapshot", () => {
    const { asFragment } = render(
      <Input
        name="name"
        value={mockInputValue}
        label="Name"
        errorMessage="Required"
        onChange={onChange}
        type="text"
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("checks onChange", async () => {
    render(<Input name="name" value="" onChange={onChange} />);

    const input = screen.getByRole("textbox");

    await userEvent.type(input, mockInputValue);

    expect(onChange).toHaveBeenCalledTimes(mockInputValue.length);
  });

  test("checks onFocus", async () => {
    render(
      <Input name="name" value="Ihor" onChange={onChange} onFocus={onFocus} />
    );

    const input = screen.getByRole("textbox");

    await userEvent.click(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });
});
