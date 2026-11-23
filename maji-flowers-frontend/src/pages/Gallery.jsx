import { useMemo, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { PageIntro, Reveal } from '../components/UI'
import { useStore } from '../store'

export default function Gallery() {
  const { gallery } = useStore()
  const [category, setCategory] = useState('All work')
  const [active, setActive] = useState(null)
  const categories = ['All work', 'Weddings', 'Arrangements', 'Flowers']
  const items = useMemo(() => category === 'All work' ? gallery : gallery.filter(item => item.category === category), [category, gallery])
  return <div className="page-wrap"><PageIntro eyebrow="A visual diary" title={<>A little inspiration,<br/><em>in every detail.</em></>} description="Explore floral colours, forms and event settings to help you find the look you love. These images are inspiration references, not a verified record of Maji’s past work." image="https://trichyflowers.in/img/weddings.png" imageAlt="Floral wedding inspiration"/>
    <section className="gallery-page-section section-compact"><div className="gallery-filter-row"><div className="gallery-filters">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={category === c ? 'active' : ''}>{c}</button>)}</div><span>{items.length.toString().padStart(2, '0')} visual notes</span></div><div className="gallery-masonry">{items.map((item, i) => <Reveal key={item.id} delay={(i % 3) * 0.06}><button className={`gallery-tile gallery-tile-${i % 3}`} onClick={() => setActive(item)}><div className="gallery-tile-image"><img src={item.image} alt={item.title} loading="lazy"/><span className="gallery-expand"><ArrowUpRight size={18}/></span></div><div className="gallery-tile-meta"><span>{item.category}</span><span>0{i + 1}</span></div><h3>{item.title}</h3><p>{item.note}</p></button></Reveal>)}</div></section>
    {active && <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}><button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image"><X/></button><div className="lightbox-card" onClick={e => e.stopPropagation()}><img src={active.image} alt={active.title}/><div><span>{active.category}</span><h3>{active.title}</h3><p>{active.note}</p></div></div></div>}
    <section className="gallery-cta"><div><span>HAVE A REFERENCE IN MIND?</span><h2>Let’s create a look<br/><em>that feels like yours.</em></h2></div><a className="button button-dark" href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20I%20would%20like%20to%20discuss%20a%20floral%20design%20inspiration." target="_blank" rel="noreferrer">Share your idea <ArrowUpRight size={16}/></a></section>
  </div>
}
