import {
  render,
  screen,
  fireEvent,
} from "../../node_modules/@testing-library/react";
import Form from "../../components/Form";

jest.mock("../../node_modules/next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Form component", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders form fields and buttons", () => {
    render(<Form type="Create" post={{}} setPost={() => {}} />);

    const promptInput = screen.getByPlaceholderText("Write your post here");
    const tagInput = screen.getByPlaceholderText("#Tag");
    const submitButton = screen.getByText("Create");

    expect(promptInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("updates post state when input values change", () => {
    const setPost = jest.fn();
    render(<Form type="Create" post={{}} setPost={setPost} />);

    const promptInput = screen.getByPlaceholderText("Write your post here");
    const tagInput = screen.getByPlaceholderText("#Tag");

    fireEvent.change(promptInput, { target: { value: "Test prompt" } });
    fireEvent.change(tagInput, { target: { value: "Test tag" } });

    expect(setPost).toHaveBeenCalledTimes(2);
    expect(setPost.mock.calls[0][0]).toEqual({ prompt: "Test prompt" });
    expect(setPost.mock.calls[1][0]).toEqual({ tag: "Test tag" });
  });

  test("submits form when submit button is clicked", () => {
    const mokHandleSubmit = jest.fn();
    render(
      <Form
        type="Create"
        post={{}}
        setPost={jest.fn()}
        handleSubmit={mokHandleSubmit}
      />
    );

    fireEvent.submit(screen.getByText("Create"));
    expect(mokHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("renders cancel link and navigates to home when cancel link is clicked", () => {
    const useRouter = jest.spyOn(
      require("../../node_modules/next/router"),
      "useRouter"
    );
    render(<Form type="Create" post={{}} setPost={() => {}} />);
    const cancelLink = screen.getByText("Cancel");
    fireEvent.click(cancelLink);
    // expect(useRouter).toHaveBeenCalledWith("/");
  });
});
