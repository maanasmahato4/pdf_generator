import axios from "axios";
import {
  Button,
  Container
} from "@mantine/core";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Parser } from 'htmlparser2';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

function extractTags(html) {
  let extractedDataArray = [], currentTag = null, currentAttributes = {}, currentText = "";
  const handler = new Parser({
    onopentag(name, attribs) {
      currentTag = name;
      currentAttributes = { ...attribs };
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
    const response = await axios.post("http://localhost:3000/api/", { content: extractedHtml });
    console.log(response);
  };

  return (
    <Container style={{ marginBlock: "2rem", height: "100vh" }}>
      <h1 style={{ textAlign: "center" }}>editor</h1>
      <ReactQuill style={{ height: "60vh", marginBlock: "1rem" }} modules={modules} theme="snow" onChange={setValue} placeholder="Content goes here..." />
      <Button style={{ marginBlock: "4rem" }} type="button" onClick={handleSubmit}>Submit</Button>
    </Container>
  )
}

export default TextEditor;