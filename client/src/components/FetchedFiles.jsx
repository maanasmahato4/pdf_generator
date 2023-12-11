import {
  Container
} from "@mantine/core";
import {
  useEffect, useState
} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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

  console.log(files);
  return (
    <Container style={{ marginBlock: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Files</h1>
      {files.map(file => {
        return <span key={file.id}>{file.file_path}</span>
      })}
    </Container>
  )
}

export default FetchedFiles;