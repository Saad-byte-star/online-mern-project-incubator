
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer';
import Categories from './components/categories';
import About from './components/about';
import Home from './components/home';
import Contact from './components/contact';
import Navigationbar from './components/navbar';
import Detail from './components/detail';
import Userdashboard from './components/userdashboard';
import PostingDetail from './components/postingdetail';
import MainLayouts from './layouts/mainlayouts';


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
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/postingdetail" element={<PostingDetail/>} /> 
        </Route>
    {/* <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/postingdetail" element={<PostingDetail/>} />        */}
      </Routes>
      {/* <Footer />  */}
    </>
  );
}

export default App;
