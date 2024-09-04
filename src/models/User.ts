export type User = {
  firstName: string;
  lastName: string;
  wallet: Wallet;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  profilePicture: string;
  activities: Activity[];
  address: string; // This is required on edit profile page
  duesSum: number;
  chats: [];
};

export type Wallet = {
  balance: number;
};

export type Activity = {
  activityType: ActivityType;
  title: string;
  createdAt: string;
};

export enum ActivityType {
  "COMPLAINT" = "COMPLAINT",
  "GATE_ACCESS" = "GATE_ACCESS",
  "WALLET" = "WALLET",
  "PASSWORD_CHANGE" = "PASSWORD_CHANGE",
}
