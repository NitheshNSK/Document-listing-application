import logo from './logo.svg';
import './App.css';
import DocumentList from './components/DocumentList';
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider autoHideDuration={1000}>
        <header className="App-header">
          <DocumentList />
        </header>
      </SnackbarProvider>
    </div>
  );
}

export default App;
