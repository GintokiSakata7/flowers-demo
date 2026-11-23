import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { PageIntro, ProductCard } from '../components/UI'
import { flowerCategories } from '../data'
import { useStore } from '../store'

export default function Shop() {
  const { products } = useStore()
  const [category, setCategory] = useState('All flowers')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const filtered = useMemo(() => {
    let rows = products.filter(p => (category === 'All flowers' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase()))
    if (sort === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'featured') rows = [...rows].sort((a, b) => Number(b.featured) - Number(a.featured))
    return rows
  }, [products, category, search, sort])
  return <div className="page-wrap">
    <PageIntro eyebrow="The flower counter" title={<>A fresh selection for<br/><em>every kind of day.</em></>} description="Browse our flower varieties and tell us what you need. We’ll confirm the freshest available selection and current pricing with you." image="/images/flower-market.webp" imageAlt="A variety of fresh flowers"/>
    <section className="shop-content section-compact">
      <div className="shop-toolbar"><div className="shop-count">{filtered.length} <span>flowers to explore</span></div><div className="shop-tools"><label className="search-field"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search flowers..."/><button onClick={() => setSearch('')} aria-label="Clear search">{search && <X size={15}/>}</button></label><button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16}/> Filters</button><select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured first</option><option value="name">Name A–Z</option></select></div></div>
      <div className={`category-pills ${showFilters ? 'show' : ''}`}>{flowerCategories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => { setCategory(item); setShowFilters(false) }}>{item}</button>)}</div>
      {filtered.length ? <div className="product-grid shop-grid">{filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i}/>)}</div> : <div className="empty-state"><span>✳</span><h3>No flowers found</h3><p>Try a different name or category.</p><button className="button button-outline" onClick={() => { setSearch(''); setCategory('All flowers') }}>Clear filters</button></div>}
      <div className="shop-note"><span>✳</span><p><strong>Need flowers in bulk?</strong> Share your varieties, quantities and required date. We’ll help you check availability and pricing.</p><a href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20I%20need%20a%20bulk%20flower%20quotation." target="_blank" rel="noreferrer">Request a bulk quote ↗</a></div>
    </section>
  </div>
}
