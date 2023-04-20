import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputFile } from "./InputFile";

describe("InputFile component", () => {
  const onChange = jest.fn();
  const file = new File([""], "filename.txt", {
    type: "text/plain",
    lastModified: Date.now(),
  });

  afterEach(() => {
    onChange.mockClear();
  });

  test("shows label without value", () => {
    render(<InputFile name="file" value={null} onChange={onChange} />);
    expect(screen.getByText(/Choose image/i)).toBeInTheDocument();
  });
  test("shows file name", () => {
    render(<InputFile name="file" value={file} onChange={onChange} />);

    expect(screen.getByText(file.name)).toBeInTheDocument();
  });
  test("checks snapshot", () => {
    const { asFragment } = render(
      <InputFile name="file" value={file} onChange={onChange} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("onChange", async () => {
    render(<InputFile name="file" value={null} onChange={onChange} />);

    await userEvent.upload(screen.getByTestId("input-file"), file);

    expect(onChange).toHaveBeenCalledWith(file);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
