import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
   const queryClient = new QueryClient();
   return (
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <AppRouter />
         </BrowserRouter>
      </QueryClientProvider>
   );
}

export default App;
