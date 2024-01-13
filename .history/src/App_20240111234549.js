import Header from "./pages/common/Header";
import Sider from "./pages/common/Sider.jsx";
import categoryConstants from "./pages/common/categoryConstants";
import Topics from "./pages/Taas/Topics";
import Trash from "./pages/Taas/Trash";
import SubscriptionApprovals from "./pages/Taas/SubscriptionApprovals";
import Subscriptions from "./pages/Taas/Subscriptions";
import Applications from "./pages/Taas/Applications";
import UserRequests from "./pages/Taas/UserRequests";
import Clusters from "./pages/Cluster/Clusters";
import MigratedClusters from "./pages/Cluster/MigratedClusters";
import Subscription from "./pages/Cluster/Subscription";
import UserRequestsLegacy from "./pages/Cluster/UserRequestsLegacy";
import Support from "./pages/Resources/Support";
import Breadcrumb from "./pages/common/Breadcrumb";
import Footer from "./pages/common/Footer";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Layout>
          <Sider />
          <Layout
            style={{
              padding: "0 24px 24px",
              height: "fit-content",
            }}
          >
            <Breadcrumb />
            <Routes>
              <Route
                path={categoryConstants.TOPICS.toLowerCase()}
                element={<Topics />}
              />
              <Route
                path={categoryConstants.TRASH.toLowerCase()}
                element={<Trash />}
              />
              <Route
                path={categoryConstants.SUBSCRIPTIONS.toLowerCase()}
                element={<Subscriptions />}
              />
              <Route
                path={categoryConstants.SUBSCRIPTIONS_APPROVALS.toLowerCase()}
                element={<SubscriptionApprovals />}
              />
              <Route
                path={categoryConstants.APPLICATIONS.toLowerCase()}
                element={<Applications />}
              />
              <Route
                path={categoryConstants.USER_REQUESTS.toLowerCase()}
                element={<UserRequests />}
              />
              <Route
                path={categoryConstants.CLUSTERS.toLowerCase()}
                element={<Clusters />}
              />
              <Route
                path={categoryConstants.MIGRATED_CLUSTERS.toLowerCase()}
                element={<MigratedClusters />}
              />
              <Route
                path={categoryConstants.SUBSCRIPTION.toLowerCase()}
                element={<Subscription />}
              />
              <Route
                path={categoryConstants.USERE_REQUESTS_LEGACY.toLowerCase()}
                element={<UserRequestsLegacy />}
              />
              <Route
                path={categoryConstants.SUPPORT.toLowerCase()}
                element={<Support />}
              />
            </Routes>
          </Layout>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
