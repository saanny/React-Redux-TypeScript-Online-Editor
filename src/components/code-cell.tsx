import { useState } from "react";
import CodeEditor from "./code-editor";
import PreviewCode from "./PreviewCode";
import bundle from "../bundler";
import Resizable from "./resizable";
const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const outPut = await bundle(input);
    setCode(outPut);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <PreviewCode code={code} />
      </div>
    </Resizable>
  );
};
export default CodeCell;
