import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flower2,
  ImagePlus,
  Sparkles,
} from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonLink, Eyebrow, PageIntro } from '../components/UI'
import { decorationAreas, eventTypes, themes } from '../data'
import { useStore } from '../store'

export const flowerCatalog = [
  { id: 'red-rose', name: 'Red Rose', teluguName: 'ఎరుపు గులాబీ', swatch: '#d62828', unit: 'bunches' },
  { id: 'pink-rose', name: 'Pink Rose', teluguName: 'గులాబీ పువ్వు', swatch: '#f48fb1', unit: 'bunches' },
  { id: 'yellow-rose', name: 'Yellow Rose', teluguName: 'పసుపు గులాబీ', swatch: '#fbc02d', unit: 'bunches' },
  { id: 'jasmine-buds', name: 'Jasmine Buds', teluguName: 'మల్లె మొగ్గలు', swatch: '#faf8f0', unit: 'kg / bunches' },
  { id: 'marigold', name: 'Marigold', teluguName: 'బంతి పూలు', swatch: '#f57c00', unit: 'kg' },
  { id: 'white-chrysanthemum', name: 'White Chrysanthemum', teluguName: 'తెల్ల చామంతి', swatch: '#eeeeee', unit: 'bunches' },
  { id: 'tuberose', name: 'Tuberose', teluguName: 'సంపంగి పూలు', swatch: '#9a1f40', unit: 'bunches' },
  { id: 'lotus', name: 'Lotus', teluguName: 'తామర పువ్వు', swatch: '#e57373', unit: 'pieces' },
  { id: 'orchid', name: 'Orchid', teluguName: 'ఆర్కిడ్ పూలు', swatch: '#ab47bc', unit: 'stems' },
  { id: 'gerbera', name: 'Gerbera', teluguName: 'జెర్బెరా పూలు', swatch: '#ffb74d', unit: 'bunches' },
  { id: 'carnation', name: 'Carnation', teluguName: 'కార్నేషన్ పూలు', swatch: '#e64a19', unit: 'bunches' },
  { id: 'gladiolus', name: 'Gladiolus', teluguName: 'గ్లాడియోలస్ పూలు', swatch: '#8e24aa', unit: 'stems' },
]

const steps = ['Your occasion', 'The styling', 'Flower selection', 'Event details', 'Review']

const occasionIcons = ['✳', '❋', '✿', '❁', '❀', '✽', '✧', '❃', '✺', '✴', '✳']

export default function Events() {
  const [searchParams] = useSearchParams()
  const { addToCart, notify, designs } = useStore()
  const navigate = useNavigate()
  const initialDesign = designs.find(d => d.id === searchParams.get('design'))
  const [step, setStep] = useState(0)
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
    const flowerListSummary = form.flowers.length ? form.flowers.join(', ') : 'Florist recommendations welcome'
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
    <div className="page-wrap">
      <PageIntro
        eyebrow="Weddings · Celebrations · Events"
        title={<>Your day, your way.<br /><em>Let’s plan the flowers.</em></>}
        description="Choose what you have in mind. We’ll help refine the floral plan and confirm availability with you."
        image="/images/reception-decor.webp"
        imageAlt="Floral event decoration inspiration"
      />

      <section className="event-planner-section">
        <div className="planner-heading">
          <div>
            <Eyebrow>Made around your celebration</Eyebrow>
            <h2>Build your floral <em>plan.</em></h2>
            <p>There’s no need to know every detail yet. Choose what you know and leave the rest for a conversation.</p>
          </div>
          <div className="planner-time">
            <Sparkles size={16} />
            <span>Takes 2–3 minutes</span>
          </div>
        </div>

        <div className="planner-layout">
          {/* Elegant Minimal Sidebar */}
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
                  <span className="step-badge">{i < step ? <Check size={13} strokeWidth={2.5} /> : `0${i + 1}`}</span>
                  <span className="step-name">{label}</span>
                </button>
              ))}
            </div>

            <div className="planner-help">
              <Flower2 size={20} />
              <b>Need a little help?</b>
              <p>Start with your occasion and we’ll guide you through the options.</p>
              <a
                href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20I%20need%20help%20planning%20event%20flowers."
                target="_blank"
                rel="noreferrer"
              >
                TALK TO OUR TEAM ↗
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="planner-main">
            {/* STEP 0: OCCASION */}
            {step === 0 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <span>01 — THE OCCASION</span>
                  <h3>What are we celebrating?</h3>
                  <p>Choose an occasion so we can suggest the right floral direction.</p>
                </div>

                <div className="occasion-grid">
                  {eventTypes.map((type, i) => {
                    const isSelected = form.eventType === type
                    return (
                      <button
                        key={type}
                        type="button"
                        className={`occasion-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => update('eventType', type)}
                      >
                        <span className="occasion-icon">{occasionIcons[i % occasionIcons.length]}</span>
                        <b>{type}</b>
                        <span className="select-indicator">
                          {isSelected && <Check size={13} strokeWidth={2.5} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.eventType && <p className="form-error">{errors.eventType}</p>}

                <div className="planner-tip">
                  <Sparkles size={16} />
                  <span>You can adjust any detail later with our florist before finalizing.</span>
                </div>
              </div>
            )}

            {/* STEP 1: STYLING & AREAS */}
            {step === 1 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <span>02 — THE STYLING</span>
                  <h3>Which spaces should bloom?</h3>
                  <p>Select the areas you’d like us to style. Choose as many as you need.</p>
                </div>

                <div className="selection-grid">
                  {decorationAreas.map((area) => {
                    const isSelected = form.areas.includes(area)
                    return (
                      <button
                        key={area}
                        type="button"
                        className={`selection-tile ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggle('areas', area)}
                      >
                        <b>{area}</b>
                        <span className="select-indicator">
                          {isSelected && <Check size={13} strokeWidth={2.5} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
                {errors.areas && <p className="form-error">{errors.areas}</p>}

                {/* Theme selection */}
                <div className="theme-select-block">
                  <div className="section-sub-head">
                    <label>Design direction</label>
                    <span>Optional starting point</span>
                  </div>
                  <div className="theme-chips">
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
                </div>

                {/* Curated designs */}
                <div className="curated-designs-block">
                  <div className="section-sub-head">
                    <label>Curated inspiration</label>
                    <span>Tap to use as a starting direction</span>
                  </div>
                  <div className="curated-designs-grid">
                    {designs.map(d => (
                      <button
                        key={d.id}
                        type="button"
                        className={`mini-design ${form.design === d.id ? 'selected' : ''}`}
                        onClick={() => selectDesign(d)}
                      >
                        <img src={d.image} alt={d.title} loading="lazy" />
                        <span>{d.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: FLOWER SELECTION (AS SHOWN IN USER SCREENSHOT) */}
            {step === 2 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <span>03 — THE FLOWERS</span>
                  <h3>What would you love to see?</h3>
                  <p>Pick flower varieties you have in mind. Quantities are optional at this stage.</p>
                </div>

                {/* 3-column flower cards matching screenshot */}
                <div className="flower-select-grid">
                  {flowerCatalog.map((flower) => {
                    const isSelected = form.flowers.includes(flower.name)
                    return (
                      <button
                        key={flower.id}
                        type="button"
                        className={`flower-select ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleFlower(flower.name)}
                      >
                        <span
                          className="flower-swatch"
                          style={{ backgroundColor: flower.swatch }}
                        />
                        <div className="flower-select-name">
                          <span className="flower-en-name">{flower.name}</span>
                          <span className="flower-te-name">({flower.teluguName})</span>
                        </div>
                        <span className="select-indicator">
                          {isSelected && <Check size={13} strokeWidth={2.5} />}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* "I'm open to recommendations" box matching screenshot */}
                <button
                  type="button"
                  className={`help-me-decide ${form.flowers.length === 0 ? 'selected' : ''}`}
                  onClick={() => update('flowers', [])}
                >
                  <span className="help-icon">✳</span>
                  <div>
                    <b>I’m open to recommendations</b>
                    <small>Let Maji suggest suitable flowers for my event.</small>
                  </div>
                  <span className="select-indicator">
                    {form.flowers.length === 0 && <Check size={13} strokeWidth={2.5} />}
                  </span>
                </button>

                {/* Clean, subtle Quantity Editor (only when flowers selected) */}
                {form.flowers.length > 0 && (
                  <div className="quantity-editor">
                    <div className="quantity-editor-heading">
                      <b>Add quantities (optional)</b>
                      <span>Approximate amounts are fine — our florist will discuss final counts with you</span>
                    </div>
                    {selectedQuantities.map((item) => (
                      <div className="quantity-editor-row" key={item.name}>
                        <div className="quantity-editor-label">
                          <span className="qty-name-en">{item.name}</span>
                          <span className="qty-name-te">({item.teluguName})</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          value={form.quantities[item.name] || ''}
                          onChange={e => setQuantity(item.name, e.target.value)}
                          placeholder="—"
                        />
                        <small>{item.unit}</small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: EVENT DETAILS */}
            {step === 3 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <span>04 — EVENT DETAILS</span>
                  <h3>Tell us a little more.</h3>
                  <p>These details help us understand the celebration and prepare an accurate proposal.</p>
                </div>

                <div className="form-grid">
                  <label className="form-field">
                    <span>Event date *</span>
                    <input
                      type="date"
                      value={form.eventDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={e => update('eventDate', e.target.value)}
                    />
                    {errors.eventDate && <small className="form-error">{errors.eventDate}</small>}
                  </label>

                  <label className="form-field">
                    <span>Event time</span>
                    <input
                      type="time"
                      value={form.eventTime}
                      onChange={e => update('eventTime', e.target.value)}
                    />
                  </label>

                  <label className="form-field">
                    <span>Venue / function hall</span>
                    <input
                      value={form.venue}
                      onChange={e => update('venue', e.target.value)}
                      placeholder="e.g. Royal Palace / Taj Hall"
                    />
                  </label>

                  <label className="form-field">
                    <span>Venue location / Area</span>
                    <input
                      value={form.location}
                      onChange={e => update('location', e.target.value)}
                      placeholder="e.g. Hyderabad, Mehdipatnam"
                    />
                  </label>

                  <label className="form-field">
                    <span>Estimated guest count (optional)</span>
                    <input
                      value={form.guests}
                      onChange={e => update('guests', e.target.value)}
                      placeholder="e.g. 500 guests"
                    />
                  </label>

                  <label className="form-field">
                    <span>Approx. floral budget (optional)</span>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                      <option value="">Select a range / Discuss on call</option>
                      <option>Below ₹15,000</option>
                      <option>₹15,000 – ₹30,000</option>
                      <option>₹30,000 – ₹60,000</option>
                      <option>₹60,000 – ₹1,20,000</option>
                      <option>Above ₹1,20,000</option>
                      <option>Not sure yet</option>
                    </select>
                  </label>

                  <label className="form-field">
                    <span>Your name *</span>
                    <input
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="Your full name"
                    />
                    {errors.name && <small className="form-error">{errors.name}</small>}
                  </label>

                  <label className="form-field">
                    <span>Phone number *</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <small className="form-error">{errors.phone}</small>}
                  </label>

                  <label className="form-field form-field-full">
                    <span>Email address (optional)</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="form-field form-field-full">
                    <span>Special requirements or notes</span>
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      placeholder="Preferred colors, garland length, setup timings..."
                    />
                  </label>

                  <div className="form-field form-field-full">
                    <span className="upload-label">Reference photo (optional)</span>
                    <label className="upload-area">
                      <ImagePlus size={20} />
                      <span>{referenceName || 'Choose a reference photo'}</span>
                      <small>JPG, PNG or WEBP</small>
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
                      <div className="reference-preview">
                        <img src={referencePreview} alt="Reference" />
                        <button type="button" onClick={() => { setReferenceName(''); setReferencePreview('') }}>
                          Remove
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
                  <span>05 — YOUR PLAN</span>
                  <h3>Here’s what you have in mind.</h3>
                  <p>Review your selections below. You can send this plan to Maji on WhatsApp.</p>
                </div>

                <div className="review-card">
                  <div className="review-card-head">
                    <div>
                      <span>OCCASION</span>
                      <h4>{form.eventType}</h4>
                    </div>
                    <button type="button" onClick={() => setStep(0)}>
                      Edit
                    </button>
                  </div>

                  <div className="review-divider" />

                  <div className="review-row">
                    <span>Design direction</span>
                    <b>{form.theme}</b>
                  </div>

                  {selectedDesign && (
                    <div className="review-design">
                      <img src={selectedDesign.image} alt={selectedDesign.title} />
                      <span>{selectedDesign.title}</span>
                    </div>
                  )}

                  <div className="review-row review-top">
                    <span>Decoration areas</span>
                    <b>{form.areas.length} selected</b>
                  </div>
                  <div className="review-tags">
                    {form.areas.length ? (
                      form.areas.map(a => <span key={a}>{a}</span>)
                    ) : (
                      <span>To be discussed</span>
                    )}
                  </div>

                  <div className="review-row review-top">
                    <span>Flowers</span>
                    <b>{form.flowers.length ? `${form.flowers.length} varieties` : 'Recommendations welcome'}</b>
                  </div>
                  <div className="review-tags">
                    {form.flowers.length > 0 ? (
                      form.flowers.map(f => {
                        const match = flowerCatalog.find(c => c.name === f)
                        return (
                          <span key={f}>
                            {f} ({match?.teluguName})
                            {form.quantities[f] ? ` · ${form.quantities[f]}` : ''}
                          </span>
                        )
                      })
                    ) : (
                      <span>Florist recommendations welcome</span>
                    )}
                  </div>

                  <div className="review-divider" />

                  <div className="review-row">
                    <span>Event date</span>
                    <b>{form.eventDate || 'To be decided'}</b>
                  </div>

                  <div className="review-row">
                    <span>Venue</span>
                    <b>{form.venue || 'To be confirmed'}</b>
                  </div>

                  <div className="review-row">
                    <span>Location</span>
                    <b>{form.location || 'Not shared'}</b>
                  </div>

                  <div className="review-row">
                    <span>Contact</span>
                    <b>{form.name} · {form.phone}</b>
                  </div>

                  {form.notes && (
                    <p className="review-notes">“{form.notes}”</p>
                  )}
                </div>

                <div className="review-note">
                  <Sparkles size={16} />
                  <span>
                    No advance payment required. Availability and final pricing will be discussed with our florist directly on WhatsApp or phone.
                  </span>
                </div>
              </div>
            )}

            {/* Minimal, Professional Controls */}
            <div className="planner-controls">
              {step > 0 ? (
                <button type="button" className="back-step" onClick={previous}>
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
              ) : (
                <span className="planner-control-note">No payment required to send an enquiry.</span>
              )}

              {step < 4 ? (
                <button type="button" className="button button-dark" onClick={next}>
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button type="button" className="button button-dark" onClick={addRequest}>
                  <span>Send Enquiry via WhatsApp</span>
                  <ArrowRight size={16} />
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
