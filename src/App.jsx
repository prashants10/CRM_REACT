import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import MainRoutes from "./routes/MainRoutes";
import store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainRoutes />
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
