import { SettingsStackParamList } from ".";

export interface SettingsLinkProps {
  name: string;
  path: keyof SettingsStackParamList;
}

const settingsLinks: SettingsLinkProps[] = [
  { name: "Notification Preferences", path: "Notifications" },
  { name: "Communication Preferences", path: "Communication" },
  { name: "Password & Security", path: "Security" },
  { name: "App Preferences", path: "AppPreferences" },
  { name: "Help & Support", path: "Support" },
];

export default settingsLinks;
