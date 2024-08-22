import { HomePage } from './pages/home.page.js'

const App = async (): Promise<void> => {
  const page = await HomePage()
  console.log(page)
  document.querySelector('#app')!.appendChild(page)
}

App()
