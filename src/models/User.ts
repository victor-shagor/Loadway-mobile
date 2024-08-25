export type User = {
    firstName: string;
    lastName: string;
    wallet: Wallet;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    profilePicture: string;
    activities: Activity[];
    duesSum: number
  };

  export type Wallet = {
    balance: number
  }

  export type Activity = {
    activityType: string;
    title: string;
    createdAt: string;
  }
  