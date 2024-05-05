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
}

export interface PolicyAttribute {
  id: string;
  policyName: string;
}
