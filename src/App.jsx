import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import PageLoader from "./Components/PageLoader"
import Login from "./Pages/Forms/Login"
import Register from "./Pages/Forms/Register"
import Dashboard from "./Pages/Dashboard"
import UserRoute from "./PrivateRoutes/UserRoute"
import NotFound from "./Pages/NotFound"
import UserBlog from './Pages/Blog/UserBlog';
import NewBlog from "./Pages/Blog/NewBlog"
import EditBlog from "./Pages/Blog/EditBlog"
import NormalRoute from "./PrivateRoutes/NormalRoute"
import BlogPageSingle from "./Pages/BlogPageSingle"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NormalRoute><PageLoader><Home /></PageLoader></NormalRoute>} />
      <Route path="/login" element={<PageLoader><Login /></PageLoader>} />
      <Route path="/register" element={<PageLoader><Register /></PageLoader>} />
      <Route path="/dashboard" element={ <UserRoute> <PageLoader> <Dashboard />  </PageLoader> </UserRoute>} />
      <Route path="/blog" element={<UserRoute> <PageLoader> <UserBlog />  </PageLoader> </UserRoute>} />
      <Route path="/blog/new" element={<UserRoute> <PageLoader> <NewBlog />  </PageLoader> </UserRoute>} />
      <Route path="/blog/edit/:slug/:id" element={<UserRoute> <PageLoader> <EditBlog />  </PageLoader> </UserRoute>} />
      <Route path="/blogs/:slug/:id" element={<NormalRoute> <PageLoader> <BlogPageSingle />  </PageLoader> </NormalRoute>} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
