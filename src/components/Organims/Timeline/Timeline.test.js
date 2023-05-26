import { render, screen } from "@testing-library/react";
import Timeline from "./Timeline";

describe("Timeline Rendering", () => {
  test("Timeline Renders", () => {
    const dummyPosts = [];
    render(<Timeline posts={dummyPosts} />);
    // Assert
    const outputElement = screen.getByText("Timeline");
    expect(outputElement).toBeInTheDocument();
  });

  test("Renders posts if they are any", async () => {
    const dummyPosts = [
      {
        id: "p1",
        date_posted: 1684515361763,
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        name: "Alice",
        user_id: "a1",
        is_from_user: true,
      },
      {
        id: "p2",
        date_posted: 1684515361763,
        message: "Aenean vestibulum est in facilisis aliquet.",
        name: "Pedro",
        user_id: "a2",
      },
    ];

    render(<Timeline posts={dummyPosts} />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
  test("Render warning for no post if no data send", async () => {
    const dummyPosts = [];
    render(<Timeline posts={dummyPosts} />);

    const outputElement = screen.getByText(
      "Oops looks like they are no post, nothing to see here"
    );
    expect(outputElement).toBeInTheDocument();
  });
});
