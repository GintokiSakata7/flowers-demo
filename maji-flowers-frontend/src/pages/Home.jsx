import { ArrowDownRight, ArrowRight, ArrowUpRight, Flower2, Leaf, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink, Eyebrow, ProductCard, Reveal, SectionHeading, WhatsAppButton } from '../components/UI'
import { useStore } from '../store'

const heroImage = '/images/flower-market.webp'

export default function Home() {
  const { products, designs, gallery } = useStore()
  const featured = products.filter(p => p.featured).slice(0, 4)
  return <>
    <section className="home-hero">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="kicker-line"/> A little more beauty, every day</div>
        <h1>Flowers that make <em>moments</em> feel like memories.</h1>
        <p>Fresh blooms, thoughtful arrangements and floral settings for celebrations big and small. Made with care, chosen for you.</p>
        <div className="hero-actions"><ButtonLink to="/shop">Explore flowers</ButtonLink><Link to="/events" className="hero-secondary">Planning a celebration? <ArrowUpRight size={16}/></Link></div>
        <div className="hero-footnote"><span className="hero-footnote-icon"><Flower2 size={17}/></span><span>Fresh flower selection <b>·</b> Wholesale & retail <b>·</b> Event styling</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-main">
          <picture>
            <source srcSet="/images/flower-market.webp" type="image/webp" />
            <img src="/images/flower-market.jpg" alt="A colourful selection of fresh flowers" fetchpriority="high" decoding="async" />
          </picture>
          <div className="hero-image-shade"/>
        </div>
        <div className="hero-image-caption"><span>THE ART OF FLOWERS</span><span>01 / 04</span></div>
        <div className="hero-stamp"><span>FRESH</span><Flower2 size={24}/><span>WITH CARE</span></div>
        <div className="hero-floating-note"><span className="floating-note-mark">✳</span><div><strong>For every kind of moment</strong><small>Everyday flowers · Event florals</small></div></div>
      </div>
      <div className="hero-side-index">01 — FRESH FLOWERS / HYDERABAD</div>
    </section>

    <section className="trust-strip"><div className="trust-inner"><span><Leaf size={17}/> Fresh flower selection</span><i/><span><Flower2 size={17}/> Wholesale & retail</span><i/><span><Sparkles size={17}/> Custom event styling</span><i/><span><Truck size={17}/> Delivery enquiries</span></div></section>

    <section className="section section-featured"><div className="section-topline"><SectionHeading eyebrow="The flower edit" title={<>A few favourites, <em>freshly picked.</em></>} text="Explore a considered selection of flowers for gifting, rituals, arrangements and celebrations."/><ButtonLink to="/shop" variant="outline">View all flowers</ButtonLink></div><div className="product-grid">{featured.map((product, i) => <ProductCard key={product.id} product={product} index={i}/>)}</div></section>

    <section className="editorial-split"><div className="editorial-image"><picture><source srcSet="/images/wedding-mandap.webp" type="image/webp"/><img src="/images/wedding-mandap.jpg" alt="Traditional floral wedding mandap inspiration" decoding="async" fetchpriority="high"/></picture><span className="photo-index">A MOMENT TO REMEMBER · 02</span></div><div className="editorial-copy"><Eyebrow>Flowers for your occasion</Eyebrow><h2>Some moments deserve a little <em>more magic.</em></h2><p>From the first welcome at the entrance to the last detail on the stage, we help bring your celebration to life with flowers chosen around your style, space and plans.</p><ul className="check-list"><li>Wedding and reception floral décor</li><li>Engagement, haldi and mehendi styling</li><li>Function hall and venue arrangements</li><li>Custom bouquets, garlands and details</li></ul><ButtonLink to="/events">Explore event services</ButtonLink></div></section>

    <section className="section section-designs"><div className="section-topline"><SectionHeading eyebrow="A starting point" title={<>Find a look that feels <em>like you.</em></>} text="A few design directions to help you imagine the possibilities. Every detail can be tailored to your event."/><Link className="text-link" to="/events">Build a custom plan <ArrowUpRight size={15}/></Link></div><div className="design-grid">{designs.slice(0, 3).map((design, i) => <Reveal key={design.id} delay={i * 0.08}><Link to={`/events?design=${design.id}`} className="design-card"><div className="design-card-image"><img src={design.image} alt={design.title} loading="lazy"/><span className="design-arrow"><ArrowUpRight size={18}/></span></div><div className="design-card-meta"><span>{design.occasion} · {design.mood}</span><span>0{i + 1}</span></div><h3>{design.title}</h3><p>{design.label}</p></Link></Reveal>)}</div></section>

    <section className="quote-band"><div className="quote-band-inner"><span className="quote-mark">“</span><div><Eyebrow light>Our approach</Eyebrow><h2>Not just flowers.<br/><em>A feeling, thoughtfully arranged.</em></h2><p>Tell us what you’re celebrating, what you have in mind, and the flowers you love. We’ll help you work through the details.</p><ButtonLink to="/contact" variant="cream">Let’s talk</ButtonLink></div><div className="quote-band-flower">✳</div></div></section>

    <section className="section section-gallery"><div className="section-topline"><SectionHeading eyebrow="A little inspiration" title={<>Made of colour, shape & <em>feeling.</em></>} text="A visual moodboard of flowers and floral settings to help you find your direction."/><ButtonLink to="/gallery" variant="outline">Explore the gallery</ButtonLink></div><div className="home-gallery-grid">{gallery.slice(0, 3).map((item, i) => <Link key={item.id} to="/gallery" className={i === 0 ? "home-gallery-large" : "home-gallery-small"}><img src={item.image} alt={item.title} loading="lazy"/><span>{item.title} <ArrowUpRight size={17}/></span></Link>)}</div></section>

    <section className="home-cta"><div className="home-cta-copy"><Eyebrow>Have something in mind?</Eyebrow><h2>Let’s make it <em>bloom.</em></h2><p>Share your flower list, event date or an idea you’ve saved. We’ll take it from there.</p></div><div className="home-cta-actions"><ButtonLink to="/events">Plan your event</ButtonLink><WhatsAppButton variant="outline">Send an enquiry</WhatsAppButton></div><div className="cta-doodle">✳</div></section>
  </>
}
