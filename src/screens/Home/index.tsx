import { SafeAreaView } from "../../components/layout/safeAreaView";
import DashboardHeader from "./header";
import RecentActivity from "./recentActivity";
import ThemedModal from "@src/components/CustomModal";

const Home = () => {
  return (
    <SafeAreaView>
      <DashboardHeader />
      <RecentActivity />
    </SafeAreaView>
  );
};

export default Home;
