import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home.jsx'
import Blog from './Blog.jsx'
import Contact from './Contact.jsx'
import Post from './components/Post.jsx';
import Author from './components/Author.jsx'
import NewPost from './components/NewPost.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/new">Nuevo Post</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<Blog />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/blog/:id_post" element={<Post></Post>}></Route>
        <Route path="/author/:id_author" element={<Author></Author>}></Route>
        <Route path="/new" element={<NewPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App