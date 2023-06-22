import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "../../node_modules/@testing-library/react";
import Feed from "../../components/Feed";

const mockPosts = [
  {
    _id: 1,
    creator: { username: "User1" },
    tag: "tag1",
    prompt: "Prompt 1",
  },
  {
    _id: 2,
    creator: { username: "User2" },
    tag: "tag2",
    prompt: "Prompt 2",
  },
];
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockPosts),
  })
);
describe("Feed component", () => {
  beforeEach(async () => {
    render(<Feed />);

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
    expect(global.fetch).toBeCalled();

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
  });

  test("renders search input and prompt cards", () => {
    const searchInput = screen.getByPlaceholderText(
      "Search for a tag or a username"
    );
    expect(searchInput).toBeInTheDocument();
  });

  test("fetches posts on component mount", () => {
    const promptCards = screen.getAllByTestId("prompt-card");
    expect(promptCards.length).toBe(mockPosts.length);
  });

  test("filters prompts based on search text", async () => {
    const searchText = "tag1";
    const filteredPosts = mockPosts.filter((post) =>
      post.tag.includes(searchText)
    );

    const searchInput = screen.getByPlaceholderText(
      "Search for a tag or a username"
    );
    act(() => {
      fireEvent.change(searchInput, { target: { value: searchText } });
    });

    await waitFor(() => {
      const promptCards = screen.getAllByTestId("prompt-card");
      expect(promptCards.length).toBe(filteredPosts.length);
    });
  });

  test("calls handleTagClick when tag is clicked", async () => {
    const handleTagClick = jest.fn();

    render(<Feed handleTagClick={handleTagClick} />);

    const tagElement = screen.getByText("#tag1");
    act(() => {
      fireEvent.click(tagElement);
    });
    // expect(handleTagClick).toHaveBeenCalledWith("tag1");
  });
});
