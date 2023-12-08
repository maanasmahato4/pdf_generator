import {
  Container
} from "@mantine/core";
import TextEditor from "./components/TextEditor";
import FetchedFiles from "./components/FetchedFiles";

function App() {
  return (
    <Container>
      <TextEditor />
      <FetchedFiles />
    </Container>
  )
}

export default App;