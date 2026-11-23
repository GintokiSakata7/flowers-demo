import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialProducts, designPackages as initialDesigns, galleryItems as initialGallery, WHATSAPP_NUMBER } from './data'

const StoreContext = createContext(null)
const readJSON = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback }
}

const getInitialProducts = () => {
  const cached = readJSON('maji_products', initialProducts)
  if (!Array.isArray(cached) || !cached.length) return initialProducts
  const freshMap = Object.fromEntries(initialProducts.map(p => [p.id, p.image]))
  let updated = false
  const healed = cached.map(p => {
    if (freshMap[p.id] && (p.image?.includes('photo-1592750475338') || p.image?.includes('photo-1518709268805') || freshMap[p.id].startsWith('/images/'))) {
      if (p.image !== freshMap[p.id]) {
        updated = true
        return { ...p, image: freshMap[p.id] }
      }
    }
    return p
  })
  if (updated) {
    try { localStorage.setItem('maji_products', JSON.stringify(healed)) } catch {}
  }
  return healed
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(getInitialProducts)
  const [cart, setCart] = useState(() => readJSON('maji_cart', []))
  const [enquiries, setEnquiries] = useState(() => readJSON('maji_enquiries', []))
  const [designs, setDesigns] = useState(() => readJSON('maji_designs', initialDesigns))
  const [gallery, setGallery] = useState(() => readJSON('maji_gallery', initialGallery))
  const [toast, setToast] = useState('')

  useEffect(() => localStorage.setItem('maji_products', JSON.stringify(products)), [products])
  useEffect(() => localStorage.setItem('maji_cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('maji_enquiries', JSON.stringify(enquiries)), [enquiries])
  useEffect(() => localStorage.setItem('maji_designs', JSON.stringify(designs)), [designs])
  useEffect(() => localStorage.setItem('maji_gallery', JSON.stringify(gallery)), [gallery])

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__majiToastTimer)
    window.__majiToastTimer = window.setTimeout(() => setToast(''), 2600)
  }

  const addToCart = (item) => {
    setCart(current => {
      const key = item.kind === 'event' ? item.id : item.productId
      const existing = current.find(row => row.key === key && row.kind === item.kind)
      if (existing && item.kind !== 'event') return current.map(row => row === existing ? { ...row, quantity: row.quantity + (item.quantity || 1) } : row)
      return [...current, { ...item, key, quantity: item.quantity || 1, cartId: `${key}-${Date.now()}` }]
    })
    notify(item.kind === 'event' ? 'Event request added to your enquiry' : 'Added to your enquiry basket')
  }
  const updateQuantity = (cartId, quantity) => setCart(current => current.map(item => item.cartId === cartId ? { ...item, quantity: Math.max(Number(item.minOrderQty || 1), Number(quantity) || Number(item.minOrderQty || 1)) } : item))
  const removeFromCart = (cartId) => setCart(current => current.filter(item => item.cartId !== cartId))
  const clearCart = () => setCart([])
  const updateEnquiryStatus = (id, status) => setEnquiries(current => current.map(item => item.id === id ? { ...item, status } : item))
  const saveEnquiry = (details) => {
    const record = { id: `MF-${Date.now().toString().slice(-7)}`, date: new Date().toISOString(), status: 'New', ...details }
    setEnquiries(current => [record, ...current])
    return record
  }
  const upsertProduct = (product) => {
    setProducts(current => current.some(item => item.id === product.id) ? current.map(item => item.id === product.id ? product : item) : [product, ...current])
    notify('Catalogue saved')
  }
  const deleteProduct = (id) => { setProducts(current => current.filter(item => item.id !== id)); notify('Product removed') }
  const upsertDesign = (design) => { setDesigns(current => current.some(item => item.id === design.id) ? current.map(item => item.id === design.id ? design : item) : [design, ...current]); notify('Event design saved') }
  const deleteDesign = (id) => { setDesigns(current => current.filter(item => item.id !== id)); notify('Event design removed') }
  const upsertGalleryItem = (item) => { setGallery(current => current.some(row => row.id === item.id) ? current.map(row => row.id === item.id ? item : row) : [item, ...current]); notify('Gallery item saved') }
  const deleteGalleryItem = (id) => { setGallery(current => current.filter(item => item.id !== id)); notify('Gallery item removed') }
  const resetDemoData = () => { setProducts(initialProducts); setDesigns(initialDesigns); setGallery(initialGallery); setCart([]); setEnquiries([]); notify('Demo data restored') }

  const value = useMemo(() => ({
    products, setProducts, cart, addToCart, updateQuantity, removeFromCart, clearCart,
    enquiries, saveEnquiry, updateEnquiryStatus, upsertProduct, deleteProduct,
    designs, upsertDesign, deleteDesign, gallery, upsertGalleryItem, deleteGalleryItem, resetDemoData,
    toast, notify,
    whatsappUrl: (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  }), [products, cart, enquiries, designs, gallery, toast])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside StoreProvider')
  return context
}
