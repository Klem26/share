import {
  render,
  screen,
  fireEvent,
} from "../../node_modules/@testing-library/react";
import PromptCard from "../../components/PromptCard";

describe("PromptCard component", () => {
  const mockPost = {
    _id: 1,
    creator: {
      username: "User1",
      email: "user1@example.com",
      image: "/_next/image?url=%2F&w=96&q=75",
    },
    tag: "tag1",
    prompt: "Prompt 1",
  };

  test("renders the post information", () => {
    render(<PromptCard post={mockPost} />);

    const usernameElement = screen.getByText("User1");
    const emailElement = screen.getByText("user1@example.com");
    const promptElement = screen.getByText("Prompt 1");
    const tagElement = screen.getByText("#tag1");

    expect(usernameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(promptElement).toBeInTheDocument();
    expect(tagElement).toBeInTheDocument();
  });

  test("triggers handleTagClick when tag is clicked", () => {
    const mockHandleTagClick = jest.fn();
    render(<PromptCard post={mockPost} handleTagClick={mockHandleTagClick} />);

    const tagElement = screen.getByText("#tag1");
    fireEvent.click(tagElement);

    expect(mockHandleTagClick).toHaveBeenCalledTimes(1);
    expect(mockHandleTagClick).toHaveBeenCalledWith("tag1");
  });

  test("triggers handleEdit when edit button is clicked", () => {
    const mockHandleEdit = jest.fn();
    render(<PromptCard post={mockPost} handleEdit={mockHandleEdit} />);

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    expect(mockHandleEdit).toHaveBeenCalledTimes(1);
  });

  test("triggers handleDelete when delete button is clicked", () => {
    const mockHandleDelete = jest.fn();
    render(<PromptCard post={mockPost} handleDelete={mockHandleDelete} />);

    const deleteButton = screen.getByTestId("Delete");
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });
});
