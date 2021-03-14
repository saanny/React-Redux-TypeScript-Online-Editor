import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
  const [input, setInput] = useState("");

  const serviceRef = useRef<any>(null);
  const iframeRef = useRef<any>(null);
  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.52/esbuild.wasm",
    });
  };
  useEffect(() => {
    startService();
  }, []);
  const onClick = async () => {
    if (!serviceRef.current) {
      return;
    }
    iframeRef.current.srcdoc = html;
    const result = await serviceRef.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };
  const html = `
    <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message',(event)=>{
          try{
            eval(event.data);
          }catch(err){
            const root = document.querySelector("#root");
            root.innerHTML = '<div style="color:red;" ><h4>Runtime Error</h4>' + err + '</div>';
             console.error(err);
          }
        },false);
      </script>
    </body>
    </html>
  `;
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

      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
