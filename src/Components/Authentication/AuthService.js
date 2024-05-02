import Parse from "parse";

// create new user account on Parse 
export const createUser = async (newUser) => {
  const user = new Parse.User();
  // set user properties based on the data provided during registration
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);
  user.set("UID", newUser.contr_uid); // Storing additional information (if necessary)

  try {
    const newUserSaved = await user.signUp();
    console.log("User created: ", newUserSaved);
    return newUserSaved; // On success, return the newly created user
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null; // On failure, return null
  }
};

// login using existing user info
export const loginUser = async (currUser) => {
  try {
    const currUserSaved = await Parse.User.logIn(currUser.email, currUser.password);
    console.log("User logged in: ", currUserSaved);
    return currUserSaved; // On success, return the logged-in user
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null; // On failure, return null
  }
};

// checks if there is a current authorized user
export const checkUser = async () => {
  const currentUser = await Parse.User.currentAsync();
  return !!currentUser; // Use double-negation to convert truthy/falsy to a proper boolean
};

export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
    return true; // Logout successful
  } catch (error) {
    console.error(`Error while logging out: ${error}`);
    return false; // Logout failed
  }
};
