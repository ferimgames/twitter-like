import { getAuthToken } from "./auth";
import { generateHash } from "./utility";
//Dummy  databases adress
export const userDB = "users_db";
export const postDB = "posts_db";

//Loads the initial state of this dummy database with some users already created and post 
export const initialStateLoader = () => {
  const posts = [
    {
      id: "p1",
      date_posted: 1684515361763,
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      name: "Alice",
      user_id: "a1",
    },
    {
      id: "p2",
      date_posted: 1684515361763,
      message: "Aenean vestibulum est in facilisis aliquet.",
      name: "Alice",
      user_id: "a1",
    },
    {
      id: "p3",
      date_posted: 1684515361763,
      message:
        "In hac habitasse platea dictumst. In hac habitasse platea dictumst.",
      name: "Bob",
      user_id: "a2",
    },
    {
      id: "p4",
      date_posted: 1684515361763,
      message: "In hac habitasse platea dictumst.",
      name: "Megan",
      user_id: "a4",
    },
  ];
  const users = [
    {
      id: "a1",
      email: "alice@my.email",
      following: ["a2", "a4"],
      name: "Alice",
      password: "asdf1234",
      posts: ["p1", "p2"],
    },
    {
      id: "a2",
      email: "bob@my.email",
      following: ["a3"],
      name: "Bob",
      password: "asdf1234",
      posts: ["p3"],
    },
    {
      id: "a3",
      email: "petra@my.email",
      following: [],
      name: "Petra",
      password: "asdf1234",
      posts: [],
    },
    {
      id: "a4",
      following: ["a1", "a2", "a3", "a4"],
      name: "Megan",
      posts: ["p4"],
    },
    {
      id: "super1",
      email: "my@amazing.email.com",
      following: ["a1", "a4", "a2"],
      name: "William",
      password: "asdf1234",
      posts: [],
    },
  ];

  localStorage.setItem(postDB, JSON.stringify(posts));
  localStorage.setItem(userDB, JSON.stringify(users));
};

/**
 * Get an specific item using the {id} from the specify {db}
 * @param {db} param Target dabase 
 * @param {id} param Id of the document that wants to be return 
 * @returns 
 */
const getItem = ({ db, id }) => {
  return getAllItems({ db }).find((item) => item.id === id);
};

/**
 * Get all documents from specific db
 * @param {db} param Target database 
 * @returns 
 */
const getAllItems = ({ db }) => {
  return JSON.parse(localStorage.getItem(db));
};
/**
 * Insert {data} to the specify {db}
 * @param {db} param Target databse
 * @param {data} param Object with all the information to be inserted 
 */
const postItem = ({ db, data }) => {
  const updatedDb = getAllItems({ db });
  updatedDb.push(data);
  localStorage.setItem(db, JSON.stringify(updatedDb));
};

/**
 * Update specific item from a target {db}
 * @param {db} param Targeted database
 * @param {id} param Id of the document to be updated
 * @param {data} param Comple new data 
 */
const updateItem = ({ db, id, data }) => {
  let updatedDb = getAllItems({ db });
  const itemIndex = updatedDb.findIndex((item) => item.id === id);
  updatedDb[itemIndex] = data;
  localStorage.setItem(db, JSON.stringify(updatedDb));
};
/**
 * Insert to login a new follower
 * @param {userIDtoFollow} param Id of the user to be inserted 
 */

export const addFollower = ({ userIDtoFollow }) => {
  const userID = getAuthToken();
  const user = getItem({ db: userDB, id: userID });

  const updatedUserItem = {
    ...user,
    following: [...user.following, userIDtoFollow],
  };

  updateItem({ db: userDB, id: userID, data: updatedUserItem });
};

/**
 * Removes to loging user a target follower
 * @param {userIDtoUnFollow} param 
 */
export const removeFollower = ({ userIDtoUnFollow }) => {
  const userID = getAuthToken();
  const user = getItem({ db: userDB, id: userID });
  const updatedUserItem = {
    ...user,
    following: user.following.filter(
      (userIDFollow) => userIDFollow !== userIDtoUnFollow
    ),
  };
  updateItem({ db: userDB, id: userID, data: updatedUserItem });
};

/**
 * Adds new post with the user information to the post_db and updates the user post information with the resulting id
 * @param {content} param0 
 */

export const addPost = ({ content }) => {
  const userID = getAuthToken();
  const user = getItem({ db: userDB, id: userID });

  const currentDate = new Date();
  const timestamp = currentDate.getTime();

  const newPostID = "p" + generateHash();
  const updatedUserItem = {
    ...user,
    posts: [...user.posts, newPostID],
  };
  updateItem({ db: userDB, id: userID, data: updatedUserItem });

  postItem({
    db: postDB,
    data: {
      id: newPostID,
      date_posted: timestamp,
      message: content,
      name: user.name,
      user_id: user.id,
    },
  });
};
/**
 * Created a new user into the users_db with their info
 * @param {email} param
 * @param {password} param
 * @param {name} param
 * @returns 
 */
export const addUser = ({ email, password, name }) => {
  const userID = "a" + generateHash();
  const allUsers = getAllItems({ db: userDB });
  const userIndex = allUsers.findIndex(
    (user) => user.email === email
  );

  if (userIndex === -1) {


    postItem({
      db: userDB,
      data: {
        id: userID,
        email,
        name,
        password,
        following: [],
        posts: [],
      },
    });
  
    return { ok: true, token: userID };
  } else {
    return { ok: false, reason: "Email already in use", status: 401 };
  }


};
/**
 * Gets all the post from post_db and will flag the unes form the {userID} with a is_from_user true 
 * @param {userID} param Target user id
 * @returns 
 */
export const getAllPosts = ({ userID }) => {
  const user = getItem({ db: userDB, id: userID });
  const followerList = [...user.following, userID];
  const allPosts = getAllItems({ db: postDB }).filter((post) =>
    followerList.includes(post.user_id)
  );
  allPosts.forEach((post) => {
      if (post.user_id === userID) {
        post.is_from_user = true;
      }
    });
  return allPosts;
};
/**
 * Returns two Arrays with the followers and potencial followes of a user
 * @param {userID} param
 * @returns 
 */
export const getFollowerslists = ({ userID }) => {
  const user = getItem({ db: userDB, id: userID });
  const followerList = user.following;
  const following = getAllItems({ db: userDB }).filter((user) =>
    followerList.includes(user.id)
  );
  const notFollowing = getAllItems({ db: userDB }).filter(
    (user) => !followerList.includes(user.id) && user.id !== userID
  );
  return { following, notFollowing };
};
/**
 * Takes email and password and check if the credenctials are okay 
 * @param {password} param0 
 * @param {email} param0 
 * @returns 
 */
export const loginUser = ({ email, password }) => {
  const allUsers = getAllItems({ db: userDB });
  const userIndex = allUsers.findIndex(
    (user) => user.email === email && user.password === password
  );

  if (userIndex === -1) {
    return { ok: false, reason: "Password or email wrong", status: 401 };
  } else {
    return { ok: true, token: allUsers[userIndex].id };
  }
};
/**
 * Get the user information from their browser token
 * @returns 
 */
export const getUserInfo = () => {
  return getItem({ db: userDB, id: getAuthToken() });
};
