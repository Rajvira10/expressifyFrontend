const Routes = {
  ADMIN_LOGIN: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
  ADMIN_LOGOUT: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/logout`,
  LIST_LEARNING_TRACKS: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learning-track/list`,
  ADD_LEARNING_TRACK: `${process.env.NEXT_PUBLIC_BACKEND_URL}/learning-track/store`,
  UPDATE_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learning-track/update/${id}`,
  DELETE_LEARNING_TRACK: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/learning-track/delete/${id}`,
  LIST_CATEGORIES: `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/list`,
  ADD_CATEGORY: `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/store`,
  UPDATE_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/update/${id}`,
  DELETE_CATEGORY: (id: number) =>
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/category/delete/${id}`,
};

export default Routes;
