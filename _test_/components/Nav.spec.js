import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../node_modules/@testing-library/react";
import Nav from "../../components/Nav";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
} from "../../node_modules/next-auth/react";

jest.mock("next/link", () => {
  return {
    __esModule: true,
    default: jest.fn(({ children }) => children),
  };
});

jest.mock("next-auth/react", () => {
  return {
    signIn: jest.fn(),
    signOut: jest.fn(),
    useSession: jest.fn(),
    getProviders: jest.fn(),
  };
});

test("renders logo and navigation links", () => {
  useSession.mockReturnValueOnce({ data: null });
  render(<Nav />);

  const logo = screen.getByAltText("logo");
  expect(logo).toBeInTheDocument();

  const homeLink = screen.getByText("BrainWave");
  expect(homeLink).toBeInTheDocument();
});

test("renders create post and sign out links when user is signed in", () => {
  useSession.mockReturnValueOnce({
    data: { user: { image: "/path/to/image.png" } },
  });
  render(<Nav />);
  screen.debug();
  const createPostLink = screen.getByText("Create Post");
  expect(createPostLink).toBeInTheDocument();

  const signOutButton = screen.getByText("Sign Out");
  expect(signOutButton).toBeInTheDocument();

  const profileImage = screen.getByAltText("profile user");
  expect(profileImage).toBeInTheDocument();
});

test("navigates to profile when profile link is clicked", () => {
  useSession.mockReturnValueOnce({
    data: { user: { image: "/path/to/image.png" } },
  });

  render(<Nav />);
  screen.debug();
  const profileImage = screen.getByAltText("profile user");
  fireEvent.click(profileImage);

  const profileLink = screen.getByText("My Profile");
  expect(profileLink).toBeInTheDocument();

  fireEvent.click(profileLink);
});

test("signs out when sign out button is clicked", () => {
  useSession.mockReturnValueOnce({
    data: { user: { image: "/path/to/image.png" } },
  });
  render(<Nav />);

  const signOutButton = screen.getByText("Sign Out");
  fireEvent.click(signOutButton);

  expect(signOut).toHaveBeenCalled();
});
