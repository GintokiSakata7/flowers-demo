import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, Menu, ShoppingBag, X } from 'lucide-react'
import { FlowerMark, Toast, WhatsAppFloat, PhoneLink } from './UI'
import { useStore } from '../store'
import { BUSINESS_AREA } from '../data'

const navItems = [
  { label: 'Home', to: '/' }, { label: 'Flowers', to: '/shop' }, { label: 'Weddings & events', to: '/events' }, { label: 'Our work', to: '/gallery' }, { label: 'Our story', to: '/about' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { cart } = useStore()
  const location = useLocation()
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const close = () => setOpen(false)
  return <>
    <div className="announcement"><span>Flowers for everyday moments & once-in-a-lifetime celebrations</span><span className="announcement-right">Gudimalkapur · Hyderabad <span className="announcement-dot">✳</span></span></div>
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" onClick={close}><FlowerMark/><span><strong>maji</strong><small>FLOWERS & CELEBRATIONS</small></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}</nav>
        <div className="nav-actions"><Link className="nav-cart" to="/cart" aria-label="Open enquiry basket"><ShoppingBag size={19}/><span>Basket</span>{count > 0 && <i>{count}</i>}</Link><Link to="/contact" className="nav-contact">Get in touch <ArrowUpRight size={15}/></Link></div>
        <button className="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X/> : <Menu/>}</button>
      </div>
      {open && <div className="mobile-nav">{navItems.map(item => <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={close}>{item.label}<ArrowUpRight size={15}/></NavLink>)}<Link to="/cart" onClick={close}>Your enquiry basket <ShoppingBag size={16}/></Link><Link to="/contact" onClick={close}>Contact Maji <ArrowUpRight size={15}/></Link></div>}
    </header>
  </>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main"><div className="footer-brand-block"><Link to="/" className="brand brand-footer"><FlowerMark inverse/><span><strong>maji</strong><small>FLOWERS & CELEBRATIONS</small></span></Link><p>Thoughtful flowers for everyday gestures and the moments that deserve to be remembered.</p><a href={`https://wa.me/919491554114?text=${encodeURIComponent('Hello Maji Flowers, I would like to make an enquiry.')}`} target="_blank" rel="noreferrer" className="footer-whatsapp">Start a conversation <ArrowUpRight size={16}/></a></div>
      <div className="footer-col"><span className="footer-label">Explore</span><Link to="/shop">Shop flowers</Link><Link to="/events">Weddings & events</Link><Link to="/gallery">Our work</Link><Link to="/about">Our story</Link></div>
      <div className="footer-col"><span className="footer-label">Get in touch</span><Link to="/contact">Contact & location</Link><a href="tel:+919491554114">+91 94915 54114</a><a href="https://wa.me/919491554114" target="_blank" rel="noreferrer">WhatsApp us</a><span className="footer-location">{BUSINESS_AREA}</span></div>
      <div className="footer-note"><span className="footer-label">A note from us</span><p>Flower availability and pricing can change with the season. Send us your requirements and we’ll help you plan the right selection.</p><Link to="/contact" className="text-link">Plan something beautiful <ArrowUpRight size={15}/></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Maji Flowers. All rights reserved.</span><span>Fresh blooms. Meaningful moments.</span><Link to="/admin/login">Admin access</Link></div>
  </footer>
}

export default function Layout({ children }) {
  const location = useLocation()
  return <div className="app-shell"><Header/><main key={location.pathname}>{children}</main><Footer/><WhatsAppFloat/><Toast/></div>
}
