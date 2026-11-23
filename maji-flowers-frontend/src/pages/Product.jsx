import { useState } from 'react'
import { ArrowLeft, Check, Minus, Plus, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard, WhatsAppButton } from '../components/UI'
import { useStore } from '../store'

export default function Product() {
  const { slug } = useParams()
  const { products, addToCart } = useStore()
  const product = products.find(p => p.slug === slug)
  const [quantity, setQuantity] = useState(Number(product?.minOrderQty || 1))
  if (!product) return <div className="empty-state page-empty"><span>✳</span><h2>We couldn’t find that flower.</h2><Link className="button button-dark" to="/shop">Back to flowers</Link></div>
  const priceLabel = product.priceMode === 'fixed' && product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : product.priceMode === 'starting' && product.price ? `Starting from ₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on request'
  const related = products.filter(p => p.id !== product.id && (p.category === product.category || p.featured)).slice(0, 3)
  return <div className="product-detail-page">
    <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">Flowers</Link><span>/</span><b>{product.name}</b></div>
    <section className="product-detail"><div className="product-detail-image"><img src={product.image} alt={product.name}/><span>{product.category}</span></div><div className="product-detail-copy"><Link to="/shop" className="back-link"><ArrowLeft size={15}/> Back to all flowers</Link><div className="detail-eyebrow">MAJI FLOWERS · FRESH SELECTION</div><h1>{product.name}</h1><div className="request-price">{priceLabel} <span>·</span> per {product.unit}</div><p className="detail-description">{product.description}</p><div className="detail-availability"><span className="availability-dot"/>{product.availability}</div><div className="detail-divider"/><div className="detail-quantity"><div><b>Quantity</b><small>Choose how much you need</small></div><div className="quantity-stepper"><button onClick={() => setQuantity(Math.max(Number(product.minOrderQty || 1), quantity - 1))} aria-label="Decrease quantity"><Minus size={14}/></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div></div><button className="button button-dark add-wide" onClick={() => addToCart({ kind: 'product', productId: product.id, name: product.name, image: product.image, unit: product.unit, priceMode: product.priceMode || 'quote', price: product.price || '', minOrderQty: product.minOrderQty || 1, quantity })}>Add to enquiry basket <ArrowLeft className="button-arrow-right" size={16}/></button><WhatsAppButton variant="outline" message={`Hello Maji Flowers, I would like to enquire about ${product.name} (${quantity} ${product.unit}${quantity > 1 ? 's' : ''}). Please share today's availability and pricing.`} className="product-wa">Ask on WhatsApp</WhatsAppButton><div className="detail-promises"><span><Check size={15}/> Availability confirmed before order</span><span><ShieldCheck size={15}/> Pricing shared before confirmation</span></div><div className="detail-tags">{product.tags?.map(tag => <span key={tag}>{tag}</span>)}</div></div></section>
    {related.length > 0 && <section className="section related-section"><div className="section-topline"><div><div className="eyebrow"><span/>YOU MAY ALSO LIKE</div><h2>More to <em>discover.</em></h2></div><Link to="/shop" className="text-link">Explore all flowers ↗</Link></div><div className="product-grid">{related.map((p, i) => <ProductCard key={p.id} product={p} index={i}/>)}</div></section>}
  </div>
}
