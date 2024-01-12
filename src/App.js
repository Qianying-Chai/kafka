import Header from "./pages/common/Header";
import Sider from "./pages/common/Sider.jsx";
import categoryConstants from "./pages/common/categoryConstants";
import Topics from "./pages/Taas/Topics/Topics";
import Trash from "./pages/Taas/Trash";
import SubscriptionApprovals from "./pages/Taas/SubscriptionApprovals";
import SubscriptionsNonProxy from "./pages/Taas/Subscriptions/SubscriptionsNonPoxy";
import SubscriptionsProxy from "./pages/Taas/Subscriptions/SuscriptionsProxy";
import Applications from "./pages/Taas/Applications";
import UserRequests from "./pages/Taas/UserRequests";
import Clusters from "./pages/Cluster/Clusters/Clusters";
import MigratedClusters from "./pages/Cluster/MigratedClusters/MigratedClusters";
import Subscription from "./pages/Cluster/Subscription/Subscription";
import UserRequestsLegacy from "./pages/Cluster/UserRequestsLegacy";
import Support from "./pages/Resources/Support";
import Footer from "./pages/common/Footer";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import CreateTopics from "./pages/Taas/Topics/CreateTopic";
import CreateSubscriptionsNonProxy from "./pages/Taas/Subscriptions/CreateSubscriptions/CreateSubscriptionsNonProxy";
import CreateSubscriptionsProxy from "./pages/Taas/Subscriptions/CreateSubscriptions/CreateSubscriptionsProxy";
import CreateClusters from "./pages/Cluster/Clusters/CreateClusters";
import CreateSubscription from "./pages/Cluster/Subscription/CreateSubscription";
import CreateMigratedClusters from "./pages/Cluster/MigratedClusters/CreateMigratedClusters";

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Layout>
          <Sider />
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
              path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy`}
              element={<SubscriptionsNonProxy />}
            />
            <Route
              path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy`}
              element={<SubscriptionsProxy />}
            />
            <Route
              path={`kafka/${categoryConstants.SUBSCRIPTIONS_APPROVALS.toLowerCase()}`}
              element={<SubscriptionApprovals />}
            />
            <Route
              path={`kafka/${categoryConstants.APPLICATIONS.toLowerCase()}`}
              element={<Applications />}
            />
            <Route
              path={`kafka/${categoryConstants.USER_REQUESTS.toLowerCase()}`}
              element={<UserRequests />}
            />
            <Route
              path={`kafka/${categoryConstants.CLUSTERS.toLowerCase()}`}
              element={<Clusters />}
            />
            <Route
              path={`kafka/${categoryConstants.MIGRATED_CLUSTERS.toLowerCase()}`}
              element={<MigratedClusters />}
            />
            <Route
              path={`kafka/mps-clusters-${categoryConstants.SUBSCRIPTION.toLowerCase()}`}
              element={<Subscription />}
            />
            <Route
              path={`kafka/${categoryConstants.USERE_REQUESTS_LEGACY.toLowerCase()}`}
              element={<UserRequestsLegacy />}
            />
            <Route
              path={`kafka/${categoryConstants.SUPPORT.toLowerCase()}`}
              element={<Support />}
            />
            <Route
              path={`kafka/${categoryConstants.TOPICS.toLowerCase()}/create`}
              element={<CreateTopics />}
            />
            <Route
              path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=nonProxy/create`}
              element={<CreateSubscriptionsNonProxy />}
            />
            <Route
              path={`kafka/${categoryConstants.SUBSCRIPTIONS.toLowerCase()}_active_tab=proxy/create`}
              element={<CreateSubscriptionsProxy />}
            />
            <Route
              path={`kafka/${categoryConstants.CLUSTERS.toLowerCase()}/create`}
              element={<CreateClusters />}
            />
            <Route
              path={`kafka/mps-clusters-${categoryConstants.SUBSCRIPTION.toLowerCase()}/create`}
              element={<CreateSubscription />}
            />
            <Route
              path={`kafka/${categoryConstants.MIGRATED_CLUSTERS.toLowerCase()}/create`}
              element={<CreateMigratedClusters />}
            />
          </Routes>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
