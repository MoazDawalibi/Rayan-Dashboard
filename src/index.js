import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { IntlProviderWrapper } from "./utility/context/Internationalization";
import { Layout } from "./utility/context/Layout";
// import * as serviceWorker from "./serviceWorker";
import { store } from "./redux/storeConfig/store";
import Spinner from "./components/@vuexy/spinner/Fallback-spinner";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import AccessTokenProvider from "extensions/google-analytics/AccessTokenProvider";

const LazyApp = lazy(() => import("./App"));
// import LazyApp from "./App";

// configureDatabase()

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //TODO Remove retry: 0
      retry: 0,
      retryDelay: 3000,
    },
  },
});

ReactDOM.render(
  <AccessTokenProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Layout>
            <IntlProviderWrapper>
              <LazyApp />
              <ToastContainer />
            </IntlProviderWrapper>
          </Layout>
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </AccessTokenProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// if (module.hot) {
//   module.hot.accept();
// }
