import { motion } from 'framer-motion'
import { ArrowUpRight, Flower2, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from '../data'

export function Reveal({ children, className = '', delay = 0, y = 24 }) {
  return <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

export function Eyebrow({ children, light = false }) { return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div> }
export function SectionHeading({ eyebrow, title, text, centered = false, light = false }) {
  return <div className={`section-heading ${centered ? 'centered' : ''} ${light ? 'on-dark' : ''}`}>{eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}<h2>{title}</h2>{text && <p>{text}</p>}</div>
}
export function ButtonLink({ to, children, variant = 'dark', className = '', ...props }) { return <Link to={to} className={`button button-${variant} ${className}`} {...props}>{children}<ArrowUpRight size={16}/></Link> }
export function WhatsAppButton({ children = 'Chat on WhatsApp', message = 'Hello Maji Flowers, I would like to know more about your flowers and services.', variant = 'light', className = '' }) {
  const { whatsappUrl } = useStore()
  return <a className={`button button-${variant} ${className}`} href={whatsappUrl(message)} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{children}<ArrowUpRight size={16}/></a>
}
export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useStore()
  const priceLabel = product.priceMode === 'fixed' && product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : product.priceMode === 'starting' && product.price ? `From ₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on request'
  return <Reveal delay={Math.min(index % 4, 3) * 0.06} className="product-card-wrap">
    <article className="product-card">
      <Link className="product-image" to={`/shop/${product.slug}`}><img src={product.image} alt={product.name} loading="lazy"/><span className="image-label">{product.category}</span></Link>
      <div className="product-card-body"><div><Link to={`/shop/${product.slug}`} className="product-name">{product.name}</Link><p>{priceLabel} · per {product.unit}</p></div><button className="round-action" onClick={() => addToCart({ kind: 'product', productId: product.id, name: product.name, image: product.image, unit: product.unit, priceMode: product.priceMode || 'quote', price: product.price || '', minOrderQty: product.minOrderQty || 1, quantity: Number(product.minOrderQty || 1) })} aria-label={`Add ${product.name} to enquiry`}><span>+</span></button></div>
    </article>
  </Reveal>
}
export function FlowerMark({ inverse = false }) { return <span className={`flower-mark ${inverse ? 'inverse' : ''}`}><Flower2 size={22} strokeWidth={1.5}/></span> }
export function PageIntro({ eyebrow, title, description, image, imageAlt = '' }) {
  return <section className="page-intro"><div className="page-intro-copy"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{description}</p></div>{image && <div className="page-intro-image"><img src={image} alt={imageAlt} /></div>}</section>
}
export function WhatsAppFloat() {
  const { whatsappUrl } = useStore()
  return <a className="whatsapp-float" href={whatsappUrl('Hello Maji Flowers, I have an enquiry.')} target="_blank" rel="noreferrer" aria-label="Chat with Maji Flowers on WhatsApp"><MessageCircle size={21}/><span>Let’s talk</span></a>
}
export function Toast() { const { toast } = useStore(); return <div className={`toast ${toast ? 'visible' : ''}`} role="status">{toast}</div> }
export function PhoneLink() { return <a href={`tel:+${WHATSAPP_NUMBER}`}>{DISPLAY_PHONE}</a> }
