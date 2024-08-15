import { SafeAreaView } from "../../components/layout/safeAreaView";
import DashboardHeader from "./header";
import RecentActivity from "./recentActivity";

const Home = () => {
  return (
    <SafeAreaView>
      <DashboardHeader />
      <RecentActivity />
    </SafeAreaView>
  );
};

export default Home;
