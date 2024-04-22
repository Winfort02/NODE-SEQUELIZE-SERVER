export interface UserAttributes {
  id: string;
  name: string;
  username: string;
  email: string;
  userType: number;
  password: string;
}

export interface HistoryAttribute {
  id: string;
  action: string;
}

export interface HistoryAssingmentAttribute {
  historyId: string;
  userId: string;
}

export interface SignInAttribute {
  email: string;
  password: string;
}
