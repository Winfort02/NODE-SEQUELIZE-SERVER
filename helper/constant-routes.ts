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
	POLICIES: {
		BASE: "/api/policies",
		BASE_WITH_ID: "/api/policies/:id",
		RESTORE: "/api/policies/restore/:id",
		DELETE_PERMANENT: "/api/policies/delete/:id",
	},
	ROLES: {
		BASE: "/api/roles",
		BASE_WITH_ID: "/api/roles/:id",
		RESTORE: "/api/roles/restore/:id",
		DELETE_PERMANENT: "/api/roles/delete/:id",
	},
};
