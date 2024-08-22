import { HomePage } from "./pages/home.page.js";

const App = async (): Promise<void> => {
  await HomePage();
}

App();