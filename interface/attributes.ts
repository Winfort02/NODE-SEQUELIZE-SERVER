export interface UserAttributes {
	id: string;
	name: string;
	username: string;
	email: string;
	userType: number;
	password: string;
}

export interface SignInAttribute {
	email: string;
	password: string;
}

export interface RoleAttribute {
	id: string;
	roleName: string;
	userId?: string;
	policies?: PolicyAttribute[];
	assignedUsers: number[];
	assignedPolicies: number[];
}

export interface PolicyAttribute {
	id: string;
	policyName: string;
	isPolicyActive: boolean;
	roleId?: string;
}
