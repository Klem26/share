import {
  render,
  screen,
  fireEvent,
} from "../../node_modules/@testing-library/react";
import Profile from "../../components/Profile";

describe("Profile component", () => {
  const data = [
    { _id: 1, title: "Prompt 1" },
    { _id: 2, title: "Prompt 2" },
    { _id: 3, title: "Prompt 3" },
  ];

  const handleDelete = jest.fn();
  const handleEdit = jest.fn();

  beforeEach(() => {
    render(
      <Profile
        name="John"
        desc="Profile description"
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    );
  });

  test("renders profile name and description", () => {
    expect(screen.getByText("John Profile")).toBeInTheDocument();
    expect(screen.getByText("Profile description")).toBeInTheDocument();
  });

  test("renders prompt cards", () => {
    expect(screen.getAllByTestId("prompt-card")).toHaveLength(data.length);
  });

  test("calls handleDelete when delete button is clicked", () => {
    fireEvent.click(screen.getAllByTestId("Delete")[0]);
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(data[0]);
  });

  test("calls handleEdit when edit button is clicked", () => {
    fireEvent.click(screen.getAllByTestId("edit-button")[0]);
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(data[0]);
  });
});
