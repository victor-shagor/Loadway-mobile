import { ProfileStackParamList } from ".";

export interface ProfileLinkProps {
  name: string;
  path: keyof ProfileStackParamList;
}

const profileLinks: ProfileLinkProps[] = [
  { name: "Account", path: "Account" },
  // { name: "User Management", path: "UserManagement" },
  // { name: "Settings", path: "Settings" },
];

export default profileLinks;
