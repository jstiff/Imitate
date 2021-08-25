import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
  const oAuth_reducer = useSelector((state) => state.oAuth_reducer);
  const { user_profile } = oAuth_reducer;

  return (
    <div>
      <h1 className="text-5xl">Profile Page {user_profile.name}</h1>
      <img
        src={user_profile.avatar_url}
        className="h-20 w-auto rounded-full inline-block rounded-md m-2"
      />
      <p className="text-2xl font-extralight">{user_profile.bio}</p>
      <p className="text-2xl font-extralight">
        You are fallowing {user_profile.followers} other GitHub users.
      </p>
    </div>
  );
};

export default ProfilePage;
