import Header from "./pages/common/Header";
import Sider from "./pages/common/Sider.jsx";
import categoryConstants from "./pages/common/categoryConstants";
import Topics from "./pages/Taas/Topics/Topics";
import CreateTopic from "./pages/Taas/Topics/CreateTopics/CreateTopic";
import Trash from "./pages/Taas/Trash/Trash";
import SubscriptionApprovals from "./pages/Taas/SubscriptionApprovals/SubscriptionApprovals";
import SubscriptionsNonProxy from "./pages/Taas/Subscriptions/SubscriptionsNonProxy/SubscriptionsNonProxy";
import CreateSubscriptionsNonProxy from "./pages/Taas/Subscriptions/SubscriptionsNonProxy/CreateSubscriptions/CreateSubscriptionsNonProxy";
import CreateSubscriptionsProxy from "./pages/Taas/Subscriptions/SubscriptionsProxy/CreateSubscriptions/CreateSubscriptionsProxy";
import SubscriptionsProxy from "./pages/Taas/Subscriptions/SubscriptionsProxy/SubscriptionsProxy";
import Applications from "./pages/Taas/Applications/Applications";
import UserRequests from "./pages/Taas/UserRequests/UserRequests";
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
                path={`kafka/${categoryConstants.TOPICS.toLowerCase()}/create`}
                element={<CreateTopic />}
              />
              <Route
                path={`kafka/${categoryConstants.TRASH.toLowerCase()}`}
                element={<Trash />}
              />
              <Route
                path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
                element={<SubscriptionsNonProxy />}
              />
              <Route
                path={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
                element={<CreateSubscriptionsNonProxy />}
              />
              <Route
                path={`/kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
                element={<CreateSubscriptionsProxy />}
              />
              <Route
                path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
                element={<SubscriptionsProxy />}
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
                path={`kafka/migrated-clusters`}
                element={<MigratedClusters />}
              />
              <Route
                path={`kafka/mps-clusters-subscriptions`}
                element={<Subscription />}
              />
              <Route
                path={`kafka/legacy-requests`}
                element={<UserRequestsLegacy />}
              />
              <Route
                path={`kafka/${categoryConstants.SUPPORT.toLowerCase()}`}
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
