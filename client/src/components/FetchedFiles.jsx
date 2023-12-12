import {
  Container
} from "@mantine/core";
import {
  useEffect, useState
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function FetchedFiles() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function getPdfs() {
      try {
        const response = await axios.get("http://localhost:3000/api/");
        setFiles(response.data);
      } catch (error) {
        console.log(error);
      };
    };

    getPdfs();
  }, []);
  return (
    <Container style={{ marginBlock: "2rem", textAlign: "center" }}>
      <h1 style={{ textAlign: "center" }}>Files</h1>
      {files.map((file, idx) => {
        const fileSegments = file.file_path.split(/[/\\]/).filter(segment => !!segment);
        const fileName = fileSegments[fileSegments.length - 1];
        return <div style={{ marginBlock: "0.5rem" }} key={file.id}>
          <span>{idx + 1}.</span><Link style={{ marginBlock: "0.5rem" }} to={file.file_path} target="_blank" >{fileName}</Link>
        </div>
      })}
    </Container>
  )
}

export default FetchedFiles;