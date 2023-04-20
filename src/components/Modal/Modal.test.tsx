import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal component", () => {
  const createModalDirectory = () => {
    if (!document.getElementById("modal-root")) {
      const modalRoot = document.createElement("div");

      modalRoot.id = "modal-root";

      document.body.appendChild(modalRoot);
    }
  };

  const onClose = jest.fn();

  afterEach(() => {
    onClose.mockClear();
  });

  test("shows null if modal-root not found", async () => {
    render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    expect(screen.queryByText(/Hello world!/i)).not.toBeInTheDocument();
  });

  it("shows Modal content", async () => {
    createModalDirectory();

    render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() =>
      expect(screen.getByText(/Hello world!/i)).toBeInTheDocument()
    );
  });
  it("checks modal width", async () => {
    createModalDirectory();

    render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() =>
      expect(screen.getByTestId("dialog")).toHaveStyle({ maxWidth: "30rem" })
    );
  });

  it("checks snapshots", async () => {
    createModalDirectory();
    const { baseElement } = render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() => expect(screen.getByText(/Hello/i)).toBeInTheDocument());

    expect(baseElement).toMatchSnapshot();
  });

  it("fires onClose when click on overlay", async () => {
    createModalDirectory();

    render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() => expect(screen.getByText(/Hello/i)).toBeInTheDocument());

    await userEvent.click(screen.getByTestId("overlay"));

    expect(onClose).toBeCalledTimes(1);
  });

  test("closes Modal via updating open prop", async () => {
    createModalDirectory();

    const { rerender, unmount } = render(
      <Modal open maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() =>
      expect(screen.getByText(/Hello world!/i)).toBeInTheDocument()
    );

    rerender(
      <Modal open={false} maxWidth={30} onClose={onClose}>
        <h1>Hello world!</h1>
      </Modal>
    );

    await waitFor(() =>
      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument()
    );
  });
});
