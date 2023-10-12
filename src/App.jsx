import html2canvas from "html2canvas";
import React from "react";

function urltoFile(url, filename, mimeType) {
  mimeType = mimeType || (url.match(/^data:([^;]+);/) || "")[1];
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType });
    });
}

export default function App() {
  const elemnetRef = React.useRef(null);

  const copyComponentToClipboard = () => {
    const element = elemnetRef.current;
    console.log("Debug_here element: ", element);
    html2canvas(element, {
      useCORS: true,
      width: 600,
      height: 600,
    }).then(canvas => {
      const base64Data = canvas.toDataURL();

      urltoFile(base64Data, "anh.png")
        .then(file => {
          navigator.clipboard.write([
            new ClipboardItem({
              [file.type]: file,
            }),
          ]);
        })
        .catch(err => {
          console.log("Debug_here err: ", err);
        });
    });
  };

  return (
    <div>
      <div ref={elemnetRef}>
        <div style={{ color: "black" }}>this is new component</div>
        <img
          style={{ width: 500, height: 500 }}
          src="https://images.unsplash.com/photo-1696543710864-fecad4bfbf62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
          alt="abcd "
        />
      </div>
      <button onClick={copyComponentToClipboard}>Click me</button>
    </div>
  );
}
