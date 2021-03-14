import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { useState } from "react";
import CodeEditor from "./components/code-editor";
import PreviewCode from "./components/PreviewCode";
import bundle from "./bundler";
const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const outPut = await bundle(input);
    setCode(outPut);
  };

  return (
    <div>
      <CodeEditor
        initialValue="let a = 5;"
        onChange={(value) => setInput(value)}
      />

      <div>
        {" "}
        <button onClick={onClick}>Submit</button>{" "}
      </div>
      <PreviewCode code={code} />
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
