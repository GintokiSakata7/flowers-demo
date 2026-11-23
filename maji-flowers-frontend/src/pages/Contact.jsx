import { useState } from 'react'
import { ArrowUpRight, Clock3, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageIntro, Eyebrow } from '../components/UI'
import { useStore } from '../store'
import { BUSINESS_AREA, DISPLAY_PHONE } from '../data'

export default function Contact() {
  const { whatsappUrl } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', topic: 'Flower enquiry', message: '' })
  const [error, setError] = useState('')
  const send = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) { setError('Please add your name, phone number and a short message.'); return }
    if (form.phone.replace(/\D/g, '').length < 10) { setError('Please enter a valid contact number.'); return }
    setError('')
    const message = `Hello Maji Flowers,\n\nName: ${form.name}\nPhone: ${form.phone}\nEnquiry: ${form.topic}\n\n${form.message}\n\nPlease get back to me. Thank you.`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }
  return <div className="page-wrap"><PageIntro eyebrow="We’d love to hear from you" title={<>Have a flower in mind?<br/><em>Let’s make it happen.</em></>} description="Whether you’re looking for fresh flowers, a bulk requirement or floral styling for a celebration, tell us a little about it." image="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85" imageAlt="Fresh flowers in soft tones"/>
    <section className="contact-layout"><div className="contact-info"><Eyebrow>Reach Maji Flowers</Eyebrow><h2>Let’s start with<br/><em>a conversation.</em></h2><p>Share your requirements and our team can help you check flower availability, discuss event details or work through a custom request.</p><div className="contact-detail"><span><Phone size={18}/></span><div><small>CALL US</small><a href="tel:+919491554114">{DISPLAY_PHONE}</a></div><a className="contact-detail-arrow" href="tel:+919491554114"><ArrowUpRight size={16}/></a></div><div className="contact-detail"><span><MessageCircle size={18}/></span><div><small>WHATSAPP</small><a href="https://wa.me/919491554114" target="_blank" rel="noreferrer">Chat with our team</a></div><a className="contact-detail-arrow" href="https://wa.me/919491554114" target="_blank" rel="noreferrer"><ArrowUpRight size={16}/></a></div><div className="contact-detail"><span><MapPin size={18}/></span><div><small>OUR AREA</small><b>{BUSINESS_AREA}</b><p>Exact shop address and directions can be confirmed with the team.</p></div></div><div className="contact-detail"><span><Clock3 size={18}/></span><div><small>AVAILABILITY</small><b>Message us for current timings</b><p>Flower availability and delivery options vary by day.</p></div></div><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Gudimalkapur+Flower+Market+Hyderabad" target="_blank" rel="noreferrer">Explore the area on Google Maps <ArrowUpRight size={16}/></a></div>
      <form className="contact-form" onSubmit={send}><div className="contact-form-header"><span>01 / SEND AN ENQUIRY</span><h3>What can we help you<br/><em>bring to life?</em></h3></div><label className="form-field"><span>Your name *</span><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your name"/></label><label className="form-field"><span>Phone number *</span><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Your contact number"/></label><label className="form-field"><span>What is this about?</span><select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })}><option>Flower enquiry</option><option>Bulk / wholesale order</option><option>Wedding / event decoration</option><option>Custom arrangement</option><option>Delivery enquiry</option><option>Something else</option></select></label><label className="form-field"><span>Your message *</span><textarea rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us what you have in mind..."/></label>{error && <p className="form-error">{error}</p>}<button className="button button-dark contact-submit" type="submit">Send via WhatsApp <ArrowUpRight size={16}/></button><small className="form-privacy">This form opens WhatsApp with your message. No payment or booking is made here.</small></form>
    </section>
  </div>
}
