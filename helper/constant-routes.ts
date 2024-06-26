export const API_ROUTES = {
  LOGIN: {
    BASE: "/api/login",
  },
  USER: {
    BASE: "/api/users",
    ARCHIVE: "/api/users/archive",
    BASE_WITH_ID: "/api/users/:id",
    RESTORE: "/api/users/restore/:id",
    DELETE_PERMANENT: "/api/users/delete/:id",
  },
};
