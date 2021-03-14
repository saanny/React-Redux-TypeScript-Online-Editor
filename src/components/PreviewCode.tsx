import { useRef, useEffect } from "react";
import "./preview.css";
interface PreviewCodeProps {
  code: string;
}
const html = `
    <html>
    <head>
    <style>
    html{
      background-color:white;
    }
    </style>
    </head>
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
const PreviewCode: React.FC<PreviewCodeProps> = ({ code }) => {
  const iframeRef = useRef<any>(null);

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframeRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};
export default PreviewCode;
