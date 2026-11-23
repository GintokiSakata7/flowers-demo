import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flower2,
  ImagePlus,
  MessageCircle,
  Minus,
  Phone,
  PhoneCall,
  Plus,
  Sparkles,
  Volume2,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonLink, Eyebrow, PageIntro } from '../components/UI'
import { themes } from '../data'
import { useStore } from '../store'

export const flowerCatalog = [
  {
    id: 'red-rose',
    name: 'Red Rose',
    teluguName: 'ఎరుపు గులాబీ',
    phonetic: 'Erupu Gulabi',
    image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Classic · Wedding favourite',
  },
  {
    id: 'pink-rose',
    name: 'Pink Rose',
    teluguName: 'గులాబీ పువ్వు',
    phonetic: 'Gulabi Puvvu',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Soft · Romantic look',
  },
  {
    id: 'yellow-rose',
    name: 'Yellow Rose',
    teluguName: 'పసుపు గులాబీ',
    phonetic: 'Pasupu Gulabi',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Bright · Haldi special',
  },
  {
    id: 'jasmine-buds',
    name: 'Jasmine Buds',
    teluguName: 'మల్లె మొగ్గలు',
    phonetic: 'Malle Moggallu',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    unit: 'kg / bunches',
    tag: 'Fragrant · Mandap garlands',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    teluguName: 'బంతి పూలు',
    phonetic: 'Banti Poolu',
    image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=600&q=80',
    unit: 'kg',
    tag: 'Festive · Auspicious occasions',
  },
  {
    id: 'white-chrysanthemum',
    name: 'White Chrysanthemum',
    teluguName: 'తెల్ల చామంతి',
    phonetic: 'Tella Chamanti',
    image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Pure · Pooja & décor',
  },
  {
    id: 'tuberose',
    name: 'Tuberose',
    teluguName: 'సంపంగి పూలు',
    phonetic: 'Sampangi Poolu',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Rich fragrance · Garlands',
  },
  {
    id: 'lotus',
    name: 'Lotus',
    teluguName: 'తామర పువ్వు',
    phonetic: 'Thamara Puvvu',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    unit: 'pieces',
    tag: 'Devotional · Sacred pooja',
  },
  {
    id: 'orchid',
    name: 'Orchid',
    teluguName: 'ఆర్కిడ్ పూలు',
    phonetic: 'Orchid Poolu',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
    unit: 'stems',
    tag: 'Premium · Stage décor',
  },
  {
    id: 'gerbera',
    name: 'Gerbera',
    teluguName: 'జెర్బెరా పూలు',
    phonetic: 'Gerbera Poolu',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Vibrant · Colourful backdrop',
  },
  {
    id: 'carnation',
    name: 'Carnation',
    teluguName: 'కార్నేషన్ పూలు',
    phonetic: 'Carnation Poolu',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Long lasting · Table styling',
  },
  {
    id: 'gladiolus',
    name: 'Gladiolus',
    teluguName: 'గ్లాడియోలస్ పూలు',
    phonetic: 'Gladiolus Poolu',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    unit: 'stems',
    tag: 'Tall stems · Entrance arches',
  },
]

export const occasionList = [
  { name: 'Wedding', icon: '💍', label: 'Wedding' },
  { name: 'Engagement', icon: '🤝', label: 'Engagement' },
  { name: 'Reception', icon: '🥂', label: 'Reception' },
  { name: 'Haldi', icon: '💛', label: 'Haldi' },
  { name: 'Mehendi', icon: '🌿', label: 'Mehendi' },
  { name: 'Birthday', icon: '🎂', label: 'Birthday' },
  { name: 'Anniversary', icon: '💑', label: 'Anniversary' },
  { name: 'Housewarming', icon: '🏡', label: 'Housewarming' },
  { name: 'Religious function', icon: '🪔', label: 'Pooja / Religious function' },
  { name: 'Corporate event', icon: '🏢', label: 'Corporate event' },
  { name: 'Other celebration', icon: '🎉', label: 'Other celebration' },
]

export const decorationAreaList = [
  { name: 'Main stage', icon: '🏛️', label: 'Main stage' },
  { name: 'Mandap', icon: '⛩️', label: 'Mandap' },
  { name: 'Entrance / welcome gate', icon: '🚪', label: 'Entrance / welcome gate' },
  { name: 'Aisle / walkway', icon: '🚶', label: 'Aisle / walkway' },
  { name: 'Dining tables', icon: '🍽️', label: 'Dining tables' },
  { name: 'Photo backdrop', icon: '📸', label: 'Photo backdrop' },
  { name: 'Car decoration', icon: '🚗', label: 'Car decoration' },
  { name: 'Garlands', icon: '🌸', label: 'Garlands' },
  { name: 'Bouquets', icon: '💐', label: 'Bouquets' },
  { name: 'Complete venue styling', icon: '🏰', label: 'Complete venue styling' },
]

const steps = ['Your occasion', 'The styling', 'Flower selection', 'Event details', 'Review']

export default function Events() {
  const [searchParams] = useSearchParams()
  const { addToCart, notify, designs } = useStore()
  const navigate = useNavigate()
  const initialDesign = designs.find(d => d.id === searchParams.get('design'))
  const [step, setStep] = useState(2) // Default to step 2 (Flower selection) or 0
  const [form, setForm] = useState({
    eventType: initialDesign?.occasion || 'Wedding',
    eventDate: '',
    eventTime: '',
    venue: '',
    location: '',
    guests: '',
    budget: '',
    theme: initialDesign?.mood || 'Traditional',
    design: initialDesign?.id || '',
    areas: initialDesign?.areas || ['Main stage', 'Mandap', 'Entrance / welcome gate'],
    flowers: initialDesign?.flowers || [],
    quantities: {},
    name: '',
    phone: '',
    email: '',
    notes: '',
  })
  const [referenceName, setReferenceName] = useState('')
  const [referencePreview, setReferencePreview] = useState('')
  const [errors, setErrors] = useState({})

  const speak = (text, lang = 'en-IN') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.92
      window.speechSynthesis.speak(utterance)
    } catch {
      // Speech synthesis error fallback
    }
  }

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const toggle = (key, value) => update(key, form[key].includes(value) ? form[key].filter(item => item !== value) : [...form[key], value])
  const selectDesign = (design) => setForm(current => ({ ...current, design: design.id, eventType: design.occasion, theme: design.mood, areas: design.areas, flowers: design.flowers }))

  const toggleFlower = (name) => {
    const exists = form.flowers.includes(name)
    setForm(current => ({
      ...current,
      flowers: exists ? current.flowers.filter(f => f !== name) : [...current.flowers, name],
    }))
  }

  const setQuantity = (flower, value) => {
    setForm(current => ({
      ...current,
      quantities: { ...current.quantities, [flower]: Math.max(0, Number(value) || 0) },
    }))
  }

  const selectedDesign = designs.find(d => d.id === form.design)
  const selectedQuantities = useMemo(() => {
    return form.flowers.map(name => {
      const match = flowerCatalog.find(f => f.name === name)
      return {
        name,
        teluguName: match?.teluguName || '',
        quantity: form.quantities[name] || '',
        unit: match?.unit || (name === 'Marigold' ? 'kg' : name === 'Lotus' ? 'pieces' : name === 'Orchid' || name === 'Gladiolus' ? 'stems' : 'bunches'),
      }
    })
  }, [form.flowers, form.quantities])

  const validateStep = () => {
    const nextErrors = {}
    if (step === 0 && !form.eventType) nextErrors.eventType = 'Please choose an occasion to continue.'
    if (step === 1 && form.areas.length === 0) nextErrors.areas = 'Please select at least one area to decorate.'
    if (step === 3) {
      if (!form.eventDate) nextErrors.eventDate = 'Please select an event date.'
      if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
      if (!form.phone.trim()) nextErrors.phone = 'Please enter a contact number.'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const next = () => { if (validateStep()) setStep(s => Math.min(4, s + 1)) }
  const previous = () => { setErrors({}); setStep(s => Math.max(0, s - 1)) }

  const addRequest = () => {
    const flowerListSummary = form.flowers.length ? form.flowers.join(', ') : 'Florist recommendation'
    const summary = `${form.eventType} · ${form.theme} styling · ${form.areas.length} decoration areas · ${flowerListSummary}`
    addToCart({
      kind: 'event',
      id: `event-${Date.now()}`,
      name: `${form.eventType} floral styling`,
      summary,
      image: selectedDesign?.image || '/images/wedding-mandap.webp',
      details: { ...form, referenceName },
      quantity: 1,
    })
    notify('Your event plan has been added to your enquiry basket')
    navigate('/cart')
  }

  return (
    <div className="page-wrap accessible-events-page">
      <PageIntro
        eyebrow="Weddings · Functions · Celebrations"
        title={<>Your day, your way.<br /><em>Let’s plan the flowers.</em></>}
        description="Start with an occasion, choose the details that matter and share your vision. We’ll help refine the plan and confirm a quotation with you."
        image="/images/reception-decor.webp"
        imageAlt="Floral event decoration inspiration"
      />

      <section className="event-planner-section">
        {/* Assistance banner */}
        <div className="planner-top-toolbar">
          <div className="uneducated-assist-bar">
            <div className="assist-icon-box"><PhoneCall size={20} /></div>
            <div className="assist-text">
              <b>Need help choosing?</b>
              <p>Finding it difficult to fill? Call or WhatsApp us directly — our friendly florist will take care of everything for you!</p>
            </div>
            <div className="assist-actions">
              <a href="tel:+919491554114" className="assist-btn assist-btn-call" title="Call directly">
                <Phone size={15} /> <span>Call Now: 94915 54114</span>
              </a>
              <a href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20please%20help%20me%20plan%20event%20flowers." target="_blank" rel="noreferrer" className="assist-btn assist-btn-wa">
                <MessageCircle size={15} /> <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>

        <div className="planner-layout">
          {/* Sidebar */}
          <aside className="planner-sidebar">
            <div className="planner-progress">
              <span>YOUR PLAN</span>
              <b>0{step + 1} <small>/ 05</small></b>
              <div className="progress-track"><i style={{ width: `${(step + 1) * 20}%` }} /></div>
            </div>
            <div className="planner-steps">
              {steps.map((label, i) => (
                <button
                  key={label}
                  className={`planner-step ${i === step ? 'current' : ''} ${i < step ? 'done' : ''}`}
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  type="button"
                >
                  <span className="step-badge">{i < step ? <Check size={16} strokeWidth={3} /> : `0${i + 1}`}</span>
                  <div className="step-labels">
                    <b className="step-main-title">{label}</b>
                    <small className="step-sub-title">Step 0{i + 1}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="planner-help">
              <Flower2 size={24} />
              <b>Need a little help?</b>
              <p>Start with your occasion and we’ll guide you through the options. Just call or message us.</p>
              <a href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20I%20need%20help%20planning%20event%20flowers." target="_blank" rel="noreferrer">
                Direct WhatsApp ↗
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="planner-main">
            {/* STEP 0: OCCASION */}
            {step === 0 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">01 — THE OCCASION</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak("Step 1: What are we celebrating? Please choose your occasion.")}>
                      <Volume2 size={18} />
                      <span>Listen to guide</span>
                    </button>
                  </div>
                  <h3>What are we celebrating?</h3>
                  <p>Choose the occasion so we can suggest the right floral direction and style.</p>
                </div>

                <div className="occasion-grid-accessible">
                  {occasionList.map((item) => {
                    const isSelected = form.eventType === item.name
                    return (
                      <button
                        key={item.name}
                        type="button"
                        className={`occasion-card-rich ${isSelected ? 'selected' : ''}`}
                        onClick={() => update('eventType', item.name)}
                      >
                        <div className="occasion-icon-large">{item.icon}</div>
                        <div className="occasion-text-block">
                          <b className="occasion-eng-name">{item.name}</b>
                        </div>
                        <span className={`select-indicator-accessible ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <Check size={16} strokeWidth={3} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.eventType && <p className="form-error-prominent">{errors.eventType}</p>}

                <div className="planner-tip">
                  <Sparkles size={20} />
                  <span>You can change your selections anytime before sending the enquiry.</span>
                </div>
              </div>
            )}

            {/* STEP 1: STYLING & AREAS */}
            {step === 1 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">02 — THE STYLING</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak("Step 2: Which spaces should bloom? Select the areas you want us to decorate.")}>
                      <Volume2 size={18} />
                      <span>Listen to guide</span>
                    </button>
                  </div>
                  <h3>Which spaces should bloom?</h3>
                  <p>Select every area you’d like us to consider. We can help you decide the rest.</p>
                </div>

                <div className="areas-grid-accessible">
                  {decorationAreaList.map((area) => {
                    const isSelected = form.areas.includes(area.name)
                    return (
                      <button
                        key={area.name}
                        type="button"
                        className={`area-tile-accessible ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggle('areas', area.name)}
                      >
                        <div className="area-icon-wrap">{area.icon}</div>
                        <div className="area-text-wrap">
                          <b className="area-primary-name">{area.name}</b>
                        </div>
                        <span className={`select-indicator-accessible ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <Check size={16} strokeWidth={3} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.areas && <p className="form-error-prominent">{errors.areas}</p>}

                {/* Design direction chips */}
                <div className="field-label-row-accessible">
                  <label>Colour & Styling Theme</label>
                  <span>Optional · choose a starting point</span>
                </div>
                <div className="theme-chips-accessible">
                  {themes.map(theme => (
                    <button
                      key={theme}
                      type="button"
                      className={form.theme === theme ? 'active' : ''}
                      onClick={() => update('theme', theme)}
                    >
                      {theme}
                    </button>
                  ))}
                </div>

                {/* Recommended Curated Inspiration */}
                <div className="recommended-designs">
                  <div className="recommended-title">
                    <span>CURATED DECORATION IDEAS</span>
                    <small>Tap any photo to select</small>
                  </div>
                  <div className="recommended-row-accessible">
                    {designs.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        className={`mini-design-accessible ${form.design === d.id ? 'selected' : ''}`}
                        onClick={() => selectDesign(d)}
                      >
                        <img src={d.image} alt={d.title} />
                        <span>{d.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FLOWER SELECTION (ENGLISH INTERFACE + TELUGU FLOWER NAMES) */}
            {step === 2 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">03 — THE FLOWERS</span>
                    <button
                      type="button"
                      className="step-audio-guide-btn"
                      onClick={() => speak("Step 3: What flowers would you love to see? Look at the photos and tap the flowers you like. If you're not sure, choose let our florist decide.")}
                    >
                      <Volume2 size={18} />
                      <span>Listen to guide</span>
                    </button>
                  </div>
                  <h3>What flowers would you love to see?</h3>
                  <p>Pick flower varieties you have in mind. Look at the pictures and tap the flowers you like.</p>
                </div>

                {/* Florist Recommendation Card */}
                <div
                  className={`recommend-banner ${form.flowers.length === 0 ? 'active' : ''}`}
                  onClick={() => update('flowers', [])}
                  role="button"
                  tabIndex={0}
                >
                  <div className="recommend-badge-icon">
                    <Sparkles size={28} />
                  </div>
                  <div className="recommend-info">
                    <b>✨ Not sure which flowers to pick? Let our Florist decide!</b>
                    <p>No stress! Tap here and our floral experts will handpick the freshest, best-suited flowers for your event.</p>
                  </div>
                  <div className="recommend-action">
                    <span className={`recommend-pill ${form.flowers.length === 0 ? 'selected' : ''}`}>
                      {form.flowers.length === 0 ? '✓ Florist Choice Selected' : '+ Tap: Let Florist Choose'}
                    </span>
                  </div>
                </div>

                {/* Flower Photo Cards Grid with English Titles & Telugu Names */}
                <div className="flower-photo-grid">
                  {flowerCatalog.map((flower) => {
                    const isSelected = form.flowers.includes(flower.name)
                    return (
                      <div
                        key={flower.name}
                        className={`flower-card-rich ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleFlower(flower.name)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="flower-card-img-wrap">
                          <img src={flower.image} alt={flower.name} loading="lazy" />
                          <span className={`flower-check-badge ${isSelected ? 'checked' : ''}`}>
                            {isSelected ? <Check size={18} strokeWidth={3} /> : <span className="empty-circle-badge" />}
                          </span>
                          {isSelected && <span className="flower-selected-tag">✓ Selected</span>}
                        </div>

                        <div className="flower-card-info">
                          <div className="flower-name-row">
                            <b className="flower-primary-name">{flower.name}</b>
                            <button
                              type="button"
                              className="flower-audio-btn"
                              title="Hear name pronunciation / వినండి"
                              onClick={(e) => {
                                e.stopPropagation()
                                speak(`${flower.name}. ${flower.teluguName}.`, 'te-IN')
                              }}
                            >
                              <Volume2 size={17} />
                            </button>
                          </div>
                          {/* Telugu Flower Name */}
                          <div className="flower-vernacular-name">
                            <span className="vernacular-native">{flower.teluguName}</span>
                            <span className="vernacular-phonetic">({flower.phonetic})</span>
                          </div>
                          <div className="flower-card-meta">
                            <span className="flower-tag-pill">{flower.tag}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Optional Quantity Stepper if user selected specific flowers */}
                {form.flowers.length > 0 && (
                  <div className="quantity-editor-friendly">
                    <div className="quantity-editor-head">
                      <div>
                        <h4>Your Selected Flowers & Quantities (Optional)</h4>
                        <p>Quantity is optional. If not sure, leave it as is — our florist will discuss it with you.</p>
                      </div>
                      <span className="selected-count-pill">
                        🌸 {form.flowers.length} selected
                      </span>
                    </div>

                    <div className="quantity-cards-grid">
                      {selectedQuantities.map((item) => {
                        const flowerObj = flowerCatalog.find(f => f.name === item.name)
                        const currentQty = form.quantities[item.name] || 0
                        return (
                          <div className="qty-card-row" key={item.name}>
                            <img src={flowerObj?.image} alt={item.name} className="qty-thumb" />
                            <div className="qty-info">
                              <b>{item.name}</b>
                              <small>{item.teluguName}</small>
                            </div>
                            <div className="friendly-stepper">
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setQuantity(item.name, Math.max(0, currentQty - 1))}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="stepper-val">
                                {currentQty > 0 ? `${currentQty} ${item.unit}` : `Any qty (${item.unit})`}
                              </span>
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => setQuantity(item.name, currentQty + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: EVENT DETAILS */}
            {step === 3 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">04 — EVENT DETAILS</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak("Step 4: Please enter your event date, name and contact number.")}>
                      <Volume2 size={18} />
                      <span>Listen to guide</span>
                    </button>
                  </div>
                  <h3>Tell us a little more.</h3>
                  <p>These details help us understand the celebration and prepare a relevant quotation.</p>
                </div>

                <div className="form-grid-accessible">
                  <label className="form-field-accessible">
                    <span>📅 Event Date *</span>
                    <input
                      type="date"
                      value={form.eventDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={e => update('eventDate', e.target.value)}
                    />
                    {errors.eventDate && <small className="form-error-prominent">{errors.eventDate}</small>}
                  </label>

                  <label className="form-field-accessible">
                    <span>⏰ Event Time</span>
                    <input
                      type="time"
                      value={form.eventTime}
                      onChange={e => update('eventTime', e.target.value)}
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>📍 Venue / Function Hall</span>
                    <input
                      value={form.venue}
                      onChange={e => update('venue', e.target.value)}
                      placeholder="e.g. Royal Palace / Taj Hall"
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>🏙️ Venue Location / City</span>
                    <input
                      value={form.location}
                      onChange={e => update('location', e.target.value)}
                      placeholder="e.g. Hyderabad, Mehdipatnam, Gudimalkapur"
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>👤 Your Name *</span>
                    <input
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="How should we address you?"
                    />
                    {errors.name && <small className="form-error-prominent">{errors.name}</small>}
                  </label>

                  <label className="form-field-accessible">
                    <span>📞 Phone Number *</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="Your 10-digit mobile number"
                    />
                    {errors.phone && <small className="form-error-prominent">{errors.phone}</small>}
                  </label>

                  <label className="form-field-accessible form-field-full">
                    <span>💰 Approx. Floral Budget (Optional)</span>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                      <option value="">Not decided yet / Discuss on call</option>
                      <option>Below ₹15,000</option>
                      <option>₹15,000 – ₹30,000</option>
                      <option>₹30,000 – ₹60,000</option>
                      <option>₹60,000 – ₹1,20,000</option>
                      <option>Above ₹1,20,000</option>
                    </select>
                  </label>

                  <label className="form-field-accessible form-field-full">
                    <span>📝 Any special note or instruction</span>
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      placeholder="Colours, timing, garland length, or any special flower requirements..."
                    />
                  </label>

                  {/* Photo upload for reference */}
                  <div className="form-field-accessible form-field-full">
                    <span>📸 Photo Reference (Optional)</span>
                    <label className="upload-area-accessible">
                      <ImagePlus size={24} />
                      <span>{referenceName || 'Tap here to upload an inspiration or decoration photo'}</span>
                      <small>Upload photo from your phone or computer</small>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={e => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setReferenceName(file.name)
                            setReferencePreview(URL.createObjectURL(file))
                          }
                        }}
                      />
                    </label>
                    {referencePreview && (
                      <div className="reference-preview-accessible">
                        <img src={referencePreview} alt="Reference" />
                        <button type="button" onClick={() => { setReferenceName(''); setReferencePreview('') }}>
                          Remove photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {step === 4 && (
              <div className="planner-step-content review-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">05 — YOUR PLAN</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak("Step 5: Review your plan. Tap the button to send your enquiry on WhatsApp.")}>
                      <Volume2 size={18} />
                      <span>Listen to guide</span>
                    </button>
                  </div>
                  <h3>Here is what you selected.</h3>
                  <p>Check your choices below. Tap the button to send this plan to Maji Flowers on WhatsApp.</p>
                </div>

                <div className="review-card-accessible">
                  <div className="review-head-accessible">
                    <div>
                      <span className="review-eyebrow">OCCASION</span>
                      <h4>{form.eventType}</h4>
                    </div>
                    <button type="button" className="review-edit-btn" onClick={() => setStep(0)}>
                      Edit
                    </button>
                  </div>

                  <div className="review-divider-accessible" />

                  <div className="review-row-accessible">
                    <span>Spaces to decorate</span>
                    <b>{form.areas.join(', ')}</b>
                  </div>

                  <div className="review-row-accessible">
                    <span>Theme / Style</span>
                    <b>{form.theme}</b>
                  </div>

                  <div className="review-row-accessible review-flowers-block">
                    <span>Flowers</span>
                    {form.flowers.length > 0 ? (
                      <div className="review-flowers-summary">
                        {form.flowers.map(f => {
                          const flowerObj = flowerCatalog.find(cat => cat.name === f)
                          return (
                            <div key={f} className="review-flower-chip">
                              <img src={flowerObj?.image} alt={f} />
                              <span>{f} ({flowerObj?.teluguName}) {form.quantities[f] ? `— ${form.quantities[f]}` : ''}</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <b>✨ Florist expert recommendation</b>
                    )}
                  </div>

                  <div className="review-divider-accessible" />

                  <div className="review-row-accessible">
                    <span>Event Date</span>
                    <b>{form.eventDate || 'To be decided'}</b>
                  </div>

                  <div className="review-row-accessible">
                    <span>Venue</span>
                    <b>{form.venue || 'To be shared on call'}</b>
                  </div>

                  <div className="review-row-accessible">
                    <span>Contact Person</span>
                    <b>{form.name} ({form.phone})</b>
                  </div>

                  {form.notes && (
                    <div className="review-row-accessible">
                      <span>Special Note</span>
                      <p className="review-notes-text">“{form.notes}”</p>
                    </div>
                  )}
                </div>

                <div className="review-note-accessible">
                  <Sparkles size={20} />
                  <span>
                    No advance payment required now! Our florist will call or WhatsApp you directly to discuss fresh flower rates and final arrangements.
                  </span>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="planner-controls-accessible">
              {step > 0 ? (
                <button type="button" className="btn-step-nav btn-step-back" onClick={previous}>
                  <ArrowLeft size={20} />
                  <span>Back</span>
                </button>
              ) : (
                <span className="planner-note-small">✨ Free consultation · No payment needed</span>
              )}

              {step < 4 ? (
                <button type="button" className="btn-step-nav btn-step-next" onClick={next}>
                  <span>Continue</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button type="button" className="btn-step-nav btn-step-submit" onClick={addRequest}>
                  <span>Send Enquiry via WhatsApp</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration section at bottom */}
      <section className="event-aftercare">
        <div>
          <Eyebrow>Need inspiration?</Eyebrow>
          <h2>Start with a design.<br /><em>Make it your own.</em></h2>
        </div>
        <p>Explore curated directions, then adjust the spaces, flowers and details to suit your celebration.</p>
        <ButtonLink to="/gallery" variant="outline">Browse the gallery</ButtonLink>
      </section>
    </div>
  )
}
