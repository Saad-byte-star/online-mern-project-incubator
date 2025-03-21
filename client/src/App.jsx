
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Footer from './components/footer';
import Categories from './components/categories';
import About from './components/about';
import Home from './components/home';
import Contact from './components/contact';
// import Navigationbar from './components/navbar';
import Detail from './components/detail';
import Userdashboard from './components/userdashboard';
// import PostingDetail from './components/postingdetail';
import MainLayouts from './layouts/mainlayouts';
import SearchResults from './components/searchResult';

function App() {
  return (
    <>    
      {/* <Navigationbar />  */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<MainLayouts />} >
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="search-results" element={<SearchResults/>}/>
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/posting/:id" element={<Detail/>} /> 
        <Route path="/category/:cid/posts" element={<Categories/>} /> 
        </Route>
    </Routes>

    </>
  );
}

export default App;
