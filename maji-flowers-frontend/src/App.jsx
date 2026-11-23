import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Events from './pages/Events'
import Cart, { EnquirySent } from './pages/Cart'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFound() { return <div className="empty-state page-empty"><span>✳</span><h2>This page wandered off.</h2><p>Let’s get you back to the flowers.</p><Link to="/" className="button button-dark">Back home <ArrowUpRight size={16}/></Link></div> }

function PublicLayout({ children }) { return <Layout>{children}</Layout> }

export default function App() {
  return <Routes>
    <Route path="/" element={<PublicLayout><Home/></PublicLayout>}/>
    <Route path="/shop" element={<PublicLayout><Shop/></PublicLayout>}/>
    <Route path="/shop/:slug" element={<PublicLayout><Product/></PublicLayout>}/>
    <Route path="/events" element={<PublicLayout><Events/></PublicLayout>}/>
    <Route path="/cart" element={<PublicLayout><Cart/></PublicLayout>}/>
    <Route path="/enquiry-sent" element={<PublicLayout><EnquirySent/></PublicLayout>}/>
    <Route path="/gallery" element={<PublicLayout><Gallery/></PublicLayout>}/>
    <Route path="/about" element={<PublicLayout><About/></PublicLayout>}/>
    <Route path="/contact" element={<PublicLayout><Contact/></PublicLayout>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/admin/login" element={<Admin/>}/>
    <Route path="*" element={<PublicLayout><NotFound/></PublicLayout>}/>
  </Routes>
}
