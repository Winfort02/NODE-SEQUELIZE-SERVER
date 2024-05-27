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
	id: number;
	roleName: string;
	policies?: PolicyAttribute[];
}

export interface PolicyAttribute {
	id: number;
	policyName: string;
	isPolicyActive: boolean;
}
