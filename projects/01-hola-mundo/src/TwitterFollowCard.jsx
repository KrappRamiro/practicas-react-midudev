import "./TwitterFollowCard.css";
import { useState } from "react";

export function TwitterFollowCard({
  children,
  username = "username-not-provided",
  initialIsFollowing,
}) {
  //* --- States --- //
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  console.log("[TwitterFollowCard]: username is: ", username);

  //* These change based on isFollowing
  const btnText = isFollowing ? "Siguiendo" : "Seguir";
  const btnClassName = isFollowing
    ? "tw-FollowCard-button is-following"
    : "tw-FollowCard-button";

  //* --- Event Handlers --- //
  const handleClick = () => setIsFollowing(!isFollowing);

  //* --- The component --- //
  return (
    <article className="tw-FollowCard">
      <header className="tw-FollowCard-header">
        <img
          className="tw-FollowCard-avatar"
          src={`https://unavatar.io/${username}`}
          alt="El avatar de midudev"
        />
        <div className="tw-FollowCard-info">
          <strong className="tw-FollowCard-userFullName">{children}</strong>
          <span className="tw-FollowCard-username">@{username}</span>
        </div>
      </header>
      <aside>
        <button className={btnClassName} onClick={handleClick}>
          <span className="tw-FollowCard-text">{btnText}</span>
          <span className="tw-FollowCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
