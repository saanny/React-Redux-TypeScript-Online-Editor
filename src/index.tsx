import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import CodeCell from "./components/code-cell";
import { Provider } from "react-redux";
import { store } from "./state";
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
      </div>
    </Provider>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
