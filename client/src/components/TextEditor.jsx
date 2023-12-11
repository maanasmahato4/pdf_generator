import axios from "axios";
import {
  Button,
  Container
} from "@mantine/core";
import { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Parser } from 'htmlparser2';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image"]
  ]
};

function extractTags(html) {
  let extractedDataArray = [], currentTag = null, currentAttributes = {}, currentText = "";
  const handler = new Parser({
    onopentag(name, attribs) {
      if (name === "br") {
        currentTag = name;
        currentAttributes = { ...attribs };
        currentText = "\n"
      } else {
        currentTag = name;
        currentAttributes = { ...attribs };
      }
    },
    ontext(text) {
      currentText = text;
    },
    onclosetag(tagname) {
      if (tagname === currentTag) {
        extractedDataArray.push({
          tag: currentTag,
          attributes: currentAttributes,
          text: currentText
        });
        currentTag = null;
        currentAttributes = [];
        currentText = ""
      };
    }
  }, { decodeEntities: true });

  handler.write(html);
  handler.end();
  return extractedDataArray;
};



function TextEditor() {
  const [value, setValue] = useState("");
  const [extractedHtml, setExtractedHtml] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExtractedHtml(extractTags(value));

  };

  useEffect(() => {
    if (extractedHtml.length > 0) {
      console.log(extractedHtml);
      axios.post("http://localhost:3000/api/", { content: extractedHtml })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    };
  }, [extractedHtml]);

  return (
    <Container style={{ marginBlock: "2rem", height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>editor</h1>
      <ReactQuill style={{ height: "60vh", marginBlock: "1rem" }} modules={modules} theme="snow" onChange={setValue} placeholder="Content goes here..." />
      <Button style={{ marginBlock: "4rem" }} type="button" onClick={handleSubmit}>Submit</Button>
    </Container>
  )
}

export default TextEditor;