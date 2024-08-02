import { configureStore } from '@reduxjs/toolkit';
import auth from "./auth";
import login from "./login";
import disk from "./disk";
import logout from "./logout";
import users from "./users";
import postFile from "./postFile";
import user from "./user";
import download from "./download";
import reloadFile from "./reloadFile";

export const index = configureStore({
  reducer: {
    auth: auth,
    login: login,
    disk: disk,
    logout: logout,
    users: users,
    postFile: postFile,
    user: user,
    // deleteFile: deleteFile,
    download: download,
    reloadFile: reloadFile,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});
