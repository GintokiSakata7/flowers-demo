import { useState } from 'react'
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Eyebrow, WhatsAppButton } from '../components/UI'
import { useStore } from '../store'

function buildMessage(cart, customer) {
  const lines = ['Hello Maji Flowers, I would like to enquire about the following:']
  cart.forEach((item, index) => {
    lines.push('')
    lines.push(`${index + 1}. ${item.name}${item.kind === 'event' ? ' (Custom event plan)' : ''}`)
    if (item.kind === 'product') {
      lines.push(`Quantity: ${item.quantity} ${item.unit}${item.quantity > 1 ? 's' : ''}`)
      if (item.priceMode === 'fixed' && item.price) lines.push(`Displayed price: ₹${Number(item.price).toLocaleString('en-IN')} per ${item.unit} (please confirm)`)
      else if (item.priceMode === 'starting' && item.price) lines.push(`Starting price: ₹${Number(item.price).toLocaleString('en-IN')} per ${item.unit} (please confirm)`)
    }
    if (item.kind === 'event') {
      const d = item.details || {}
      lines.push(`Occasion: ${d.eventType || 'Not shared'}`)
      lines.push(`Date: ${d.eventDate || 'Not shared'}${d.eventTime ? ` at ${d.eventTime}` : ''}`)
      lines.push(`Venue: ${d.venue || 'Not shared'}${d.location ? `, ${d.location}` : ''}`)
      lines.push(`Theme: ${d.theme || 'Not decided'}`)
      lines.push(`Decoration areas: ${(d.areas || []).join(', ') || 'To be discussed'}`)
      lines.push(`Flowers: ${(d.flowers || []).map(f => `${f}${d.quantities?.[f] ? ` (${d.quantities[f]})` : ''}`).join(', ') || 'Recommendations welcome'}`)
      lines.push(`Guests: ${d.guests || 'Not shared'}`)
      lines.push(`Budget: ${d.budget || 'To be discussed'}`)
      if (d.notes) lines.push(`Notes: ${d.notes}`)
      if (item.details?.referenceName) lines.push(`Reference image selected in website: ${item.details.referenceName} (please share the image separately on WhatsApp)`)
      lines.push(`Contact: ${d.name || customer.name || 'Not shared'} · ${d.phone || customer.phone || 'Not shared'}`)
    }
  })
  if (customer.name || customer.phone || customer.notes) {
    lines.push('', 'CUSTOMER DETAILS', `Name: ${customer.name || 'Not shared'}`, `Phone: ${customer.phone || 'Not shared'}`)
    if (customer.notes) lines.push(`Additional note: ${customer.notes}`)
  }
  lines.push('', 'Please confirm availability and share the current quotation. Thank you.')
  return lines.join('\n')
}

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, saveEnquiry, whatsappUrl } = useStore()
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const send = () => {
    if (!cart.length) return
    if (customer.phone && customer.phone.replace(/\D/g, '').length < 10) { setError('Please enter a valid contact number or leave it blank.'); return }
    setError('')
    const message = buildMessage(cart, customer)
    saveEnquiry({ type: cart.some(i => i.kind === 'event') ? 'Mixed / event enquiry' : 'Flower enquiry', customer, items: cart, message })
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    clearCart()
    navigate('/enquiry-sent')
  }
  return <div className="cart-page page-wrap"><div className="breadcrumb"><Link to="/">Home</Link><span>/</span><b>Your enquiry basket</b></div><div className="cart-heading"><div><Eyebrow>Almost there</Eyebrow><h1>Your enquiry <em>basket.</em></h1><p>Review your flowers and event requirements. We’ll confirm availability and pricing with you on WhatsApp.</p></div><span className="cart-count-large">{cart.length.toString().padStart(2, '0')} <small>items</small></span></div>
    {cart.length === 0 ? <div className="cart-empty"><div className="empty-bag"><ShoppingBag size={32}/></div><h2>Your basket is waiting to bloom.</h2><p>Add flowers or build a custom event plan to get started.</p><div className="empty-actions"><Link to="/shop" className="button button-dark">Explore flowers <ArrowRight size={16}/></Link><Link to="/events" className="button button-outline">Plan an event <ArrowRight size={16}/></Link></div></div> : <div className="cart-layout"><div className="cart-items-panel"><div className="cart-items-head"><b>Your selections <span>({cart.length})</span></b><button onClick={clearCart}>Clear basket</button></div>{cart.map(item => <div className="cart-item" key={item.cartId}><img src={item.image} alt=""/><div className="cart-item-info"><span className="cart-item-kind">{item.kind === 'event' ? 'CUSTOM EVENT PLAN' : 'FLOWER SELECTION'}</span><h3>{item.name}</h3><p>{item.kind === 'event' ? item.summary : item.priceMode === 'fixed' && item.price ? `₹${Number(item.price).toLocaleString('en-IN')} · per ${item.unit}` : item.priceMode === 'starting' && item.price ? `From ₹${Number(item.price).toLocaleString('en-IN')} · per ${item.unit}` : `Price on request · per ${item.unit}`}</p>{item.kind === 'event' && <span className="cart-event-detail">{item.details?.eventDate || 'Date to be confirmed'} · {item.details?.areas?.length || 0} areas selected</span>}</div><div className="cart-item-actions">{item.kind === 'product' ? <div className="quantity-stepper"><button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13}/></button></div> : <span className="custom-label">Custom</span>}<button className="remove-item" onClick={() => removeFromCart(item.cartId)} aria-label="Remove item"><Trash2 size={16}/></button></div></div>)}<Link to="/shop" className="continue-shopping"><ArrowLeft size={15}/> Continue exploring flowers</Link></div>
      <aside className="cart-summary"><div className="cart-summary-head"><span>YOUR ENQUIRY</span><h3>Let’s make it <em>happen.</em></h3><p>No payment is collected on this website. Send your selections and the team will respond with availability and pricing.</p></div><div className="cart-summary-lines"><div><span>Selections</span><b>{cart.length}</b></div><div><span>Pricing</span><b>To be confirmed</b></div><div><span>Order status</span><b>Enquiry only</b></div></div><div className="customer-details"><b>Your details <small>(optional)</small></b><label><span>Name</span><input value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Your name"/></label><label><span>Phone number</span><input value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} placeholder="Best number to reach you"/></label><label><span>Anything else?</span><textarea rows="2" value={customer.notes} onChange={e => setCustomer({ ...customer, notes: e.target.value })} placeholder="Delivery date, preferences..."/></label>{error && <p className="form-error">{error}</p>}</div><button className="button button-dark cart-send" onClick={send}>Send enquiry on WhatsApp <ArrowRight size={16}/></button><small className="cart-privacy">Your WhatsApp app will open with a pre-filled enquiry message.</small></aside></div>}
  </div>
}

export function EnquirySent() {
  return <div className="success-page"><div className="success-symbol">✳</div><Eyebrow>Thank you for reaching out</Eyebrow><h1>Your next beautiful<br/><em>moment starts here.</em></h1><p>Your enquiry has been saved in this browser’s demo admin panel. WhatsApp should have opened with your message. If it didn’t, you can contact the team directly.</p><div className="success-actions"><Link to="/" className="button button-dark">Back to Maji <ArrowRight size={16}/></Link><a href="https://wa.me/919491554114" target="_blank" rel="noreferrer" className="button button-outline">Open WhatsApp <ArrowRight size={16}/></a></div></div>
}
