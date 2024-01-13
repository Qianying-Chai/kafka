import Header from "./pages/common/Header";
import Sider from "./pages/common/Sider.jsx";
import categoryConstants from "./pages/common/categoryConstants";
import Topics from "./pages/Taas/Topics/Topics";
import Trash from "./pages/Taas/Trash/Trash";
import SubscriptionApprovals from "./pages/Taas/SubscriptionApprovals";
import Subscriptions from "./pages/Taas/Subscriptions";
import Applications from "./pages/Taas/Applications";
import UserRequests from "./pages/Taas/UserRequests";
import Clusters from "./pages/Cluster/Clusters";
import MigratedClusters from "./pages/Cluster/MigratedClusters";
import Subscription from "./pages/Cluster/Subscription";
import UserRequestsLegacy from "./pages/Cluster/UserRequestsLegacy";
import Support from "./pages/Resources/Support";
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
            <Routes>
              <Route
                path={`kafka/${categoryConstants.TOPICS.toLowerCase()}`}
                element={<Topics />}
              />
              <Route
                path={`kafka/${categoryConstants.TRASH.toLowerCase()}`}
                element={<Trash />}
              />
              <Route
                path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}`}
                element={<Subscriptions />}
              />
              <Route
                path={`kafka/subscriptionRequests`}
                element={<SubscriptionApprovals />}
              />
              <Route
                path={`kafka/${categoryConstants.APPLICATIONS.toLowerCase()}`}
                element={<Applications />}
              />
              <Route path={`kafka/requests`} element={<UserRequests />} />
              <Route
                path={`kafka/${categoryConstants.CLUSTERS.toLowerCase()}`}
                element={<Clusters />}
              />
              <Route
                path={`kafka/mps-clusters-subscriptions`}
                element={<MigratedClusters />}
              />
              <Route
                path={`kafka/legacy-requests`}
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
