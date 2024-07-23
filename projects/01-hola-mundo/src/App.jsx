import { useState } from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export function App() {
  const users = [
    {
      username: "midudev",
      userFullName: "Miguel Angel Duran",
      isFollowing: true,
    },
    {
      username: "TMChein",
      userFullName: "Tomas",
      isFollowing: false,
    },
    {
      username: "pheralb",
      userFullName: "Pablo H.",
      isFollowing: false,
    },
  ];
  return (
    <section className="App">
      {users.map(({ username, userFullName, isFollowing }) => (
        <TwitterFollowCard
          key={username}
          username={username}
          initialIsFollowing={isFollowing}
        >
          {userFullName}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
