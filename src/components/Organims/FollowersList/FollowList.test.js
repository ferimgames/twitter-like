import { render, screen } from "@testing-library/react";
import FollowList from "./FollowList";

describe("Follower List Tests", () => {
  test("Follower List renders Renders", async() => {
    const dummyUsers = [    {
      id: "a1",
      name: "Alice",
    },
    {
      id: "a2",
      name: "Bob",
    }
  ];
    render(<FollowList userList={dummyUsers} label="Dummy List" />);
    // Assert

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });

});
