import { 
  BrowserRouter as Router ,
  Route,
  Routes
} from 'react-router-dom';
import HomePage from './components/HomePage';
import Header from './components/Header';
import BookDescriptionPage from './components/BookDesciptionPage';
import AccountPage from './components/UserAccountPage';
import LoginPage from './components/LoginPage';
import BookList from './components/BookList';
import SearchPage from './components/SearchPage';
import { Provider } from 'react-redux'
import store from './redux/store'
import BookCarousel from './components/BookCarousel'

function App() {
  return (
    <Provider store = { store }>
      <Header/>
      <Routes>
          <Route exact path = '/login' element = {<LoginPage/>}/> 
          <Route path = '/' element = {<BookCarousel/>}/>
          <Route path = '/category/:id' element = {<BookList/>}/>
          <Route path = '/description/:id' element = {<BookDescriptionPage/>}/> 
          <Route path = '/myaccount' element = {<AccountPage/>}/>
          <Route path = '/search/:name' element ={<SearchPage/>}/>
      </Routes>
    </Provider>
  )
}

export default App;
