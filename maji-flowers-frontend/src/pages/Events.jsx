import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flower2,
  Globe,
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
    localNames: { hi: 'लाल गुलाब', te: 'ఎరుపు గులాబీ', ta: 'சிகப்பு ரோஜா' },
    altPhonetic: 'Gulab / Roja',
    image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Classic · शादी स्पेशल',
  },
  {
    id: 'pink-rose',
    name: 'Pink Rose',
    localNames: { hi: 'गुलाबी गुलाब', te: 'గులాబీ పువ్వు', ta: 'ரோஸ்' },
    altPhonetic: 'Gulabi Gulab / Roja',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Soft · सुंदर लुक',
  },
  {
    id: 'yellow-rose',
    name: 'Yellow Rose',
    localNames: { hi: 'पीला गुलाब', te: 'పసుపు గులాబీ', ta: 'மஞ்சள் ரோஜா' },
    altPhonetic: 'Peela Gulab / Manjal Roja',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Bright · हल्दी स्पेशल',
  },
  {
    id: 'jasmine-buds',
    name: 'Jasmine Buds',
    localNames: { hi: 'मोगरा / चमेली', te: 'మల్లె మొగ్గలు', ta: 'மல்லிகை மொட்டு' },
    altPhonetic: 'Mogra / Malli',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80',
    unit: 'kg / bunches',
    tag: 'Fragrant · मंडप माला',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    localNames: { hi: 'गेंदा फूल', te: 'బంతి పూలు', ta: 'சாமந்தி' },
    altPhonetic: 'Genda / Banti / Samanthi',
    image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=600&q=80',
    unit: 'kg',
    tag: 'Festive · शुभ अवसर',
  },
  {
    id: 'white-chrysanthemum',
    name: 'White Chrysanthemum',
    localNames: { hi: 'सफ़ेद सेवंती', te: 'తెల్ల చామంతి', ta: 'வெள்ளை சாமந்தி' },
    altPhonetic: 'Sevanthi / Chamanti',
    image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Pure · पूजा व सजावट',
  },
  {
    id: 'tuberose',
    name: 'Tuberose',
    localNames: { hi: 'रजनीगंधा', te: 'సంపంగి', ta: 'சம்பங்கி' },
    altPhonetic: 'Rajnigandha / Sampangi',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'High Fragrance · महक',
  },
  {
    id: 'lotus',
    name: 'Lotus',
    localNames: { hi: 'कमल फूल', te: 'తామర పువ్వు', ta: 'தாமரை' },
    altPhonetic: 'Kamal / Thamara',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80',
    unit: 'pieces',
    tag: 'Devotional · पवित्र पूजा',
  },
  {
    id: 'orchid',
    name: 'Orchid',
    localNames: { hi: 'ऑर्किड', te: 'ఆర్కిడ్', ta: 'ஆர்க்கிட்' },
    altPhonetic: 'Orchid',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=600&q=80',
    unit: 'stems',
    tag: 'Premium · स्टेज डेकोर',
  },
  {
    id: 'gerbera',
    name: 'Gerbera',
    localNames: { hi: 'जरबेरा', te: 'జెర్బెరా', ta: 'ஜெர்பரா' },
    altPhonetic: 'Gerbera',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Vibrant · रंग-बिरंगा',
  },
  {
    id: 'carnation',
    name: 'Carnation',
    localNames: { hi: 'कारनेशन', te: 'కార్నేషన్', ta: 'கார்னேஷன்' },
    altPhonetic: 'Carnation',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80',
    unit: 'bunches',
    tag: 'Long Lasting · टिकाऊ',
  },
  {
    id: 'gladiolus',
    name: 'Gladiolus',
    localNames: { hi: 'ग्लैडियोलस', te: 'గ్లాడియోలస్', ta: 'கிளாடியோலஸ்' },
    altPhonetic: 'Gladiolus',
    image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=600&q=80',
    unit: 'stems',
    tag: 'Tall Stems · खंभे व गेट',
  },
]

export const occasionList = [
  { name: 'Wedding', icon: '💍', hi: 'शादी / विवाह', te: 'వివాహం', ta: 'திருமணம்' },
  { name: 'Engagement', icon: '🤝', hi: 'सगाई / रोका', te: 'నిశ్చితార్థం', ta: 'நிச்சயதார்த்தம்' },
  { name: 'Reception', icon: '🥂', hi: 'रिसेप्शन / दावत', te: 'విందు', ta: 'வரவேற்பு' },
  { name: 'Haldi', icon: '💛', hi: 'हल्दी समारोह', te: 'పసుపు వేడుక', ta: 'நலங்கு' },
  { name: 'Mehendi', icon: '🌿', hi: 'मेहंदी उत्सव', te: 'మెహెంది', ta: 'மெஹந்தி' },
  { name: 'Birthday', icon: '🎂', hi: 'जन्मदिन', te: 'పుట్టినరోజు', ta: 'பிறந்தநாள்' },
  { name: 'Anniversary', icon: '💑', hi: 'सालगिरह', te: 'వార్షికోత్సవం', ta: 'திருமண நாள்' },
  { name: 'Housewarming', icon: '🏡', hi: 'गृहप्रवेश', te: 'గృహప్రవేశం', ta: 'புதுமனை புகுவிழா' },
  { name: 'Religious function', icon: '🪔', hi: 'पूजा / अनुष्ठान', te: 'పూజా కార్యక్రమం', ta: 'பூஜை விழா' },
  { name: 'Corporate event', icon: '🏢', hi: 'ऑफिस कार्यक्रम', te: 'కార్పొరేట్ ఈవెంట్', ta: 'அலுவலக விழா' },
  { name: 'Other celebration', icon: '🎉', hi: 'अन्य उत्सव', te: 'ఇతర వేడుక', ta: 'மற்ற கொண்டாட்டம்' },
]

export const decorationAreaList = [
  { name: 'Main stage', icon: '🏛️', hi: 'मुख्य स्टेज / मंच', te: 'ప్రధాన వేదిక', ta: 'முக்கிய மேடை' },
  { name: 'Mandap', icon: '⛩️', hi: 'मंडप / वेदी', te: 'కళ్యాణ మండపం', ta: 'மணமேடை' },
  { name: 'Entrance / welcome gate', icon: '🚪', hi: 'स्वागत द्वार / मुख्य गेट', te: 'ప్రవేశ ద్వారం', ta: 'நுழைவு வாயில்' },
  { name: 'Aisle / walkway', icon: '🚶', hi: 'रास्ता / वॉकवे', te: 'నడక మార్గం', ta: 'நடைபாதை' },
  { name: 'Dining tables', icon: '🍽️', hi: 'खाने के टेबल', te: 'డైనింగ్ టేబుల్స్', ta: 'சாப்பாட்டு மேஜை' },
  { name: 'Photo backdrop', icon: '📸', hi: 'फोटो बैकड्रॉप / सेल्फी बूथ', te: 'ఫోటో కార్నర్', ta: 'போட்டோ பூத்' },
  { name: 'Car decoration', icon: '🚗', hi: 'गाड़ी सजावट', te: 'కారు డెకరేషన్', ta: 'கார் அலங்காரம்' },
  { name: 'Garlands', icon: '🌸', hi: 'वरमाला / फूल माला', te: 'పూల దండలు', ta: 'பூ மாலைகள்' },
  { name: 'Bouquets', icon: '💐', hi: 'गुलदस्ता / बुके', te: 'పూల గుత్తి', ta: 'பூங்கொத்து' },
  { name: 'Complete venue styling', icon: '🏰', hi: 'पूरा हॉल / वेन्यू सजावट', te: 'మొత్తం వేదిక', ta: 'முழு மண்டப அலங்காரம்' },
]

const UI_TEXT = {
  en: {
    steps: ['Your occasion', 'The styling', 'Flower selection', 'Event details', 'Review'],
    audioVoiceLang: 'en-IN',
    needHelpTitle: 'Need help choosing?',
    needHelpDesc: 'Call or WhatsApp us directly. Our friendly florist will take care of everything for you!',
    callNow: 'Call Now',
    chatWa: 'WhatsApp Us',
    step0Badge: '01 — THE OCCASION',
    step0Title: 'What are we celebrating?',
    step0Sub: 'Tap on your celebration. We will suggest the right flowers and style for you.',
    step0Audio: 'Step 1: What are we celebrating? Please tap your occasion like wedding, birthday, or puja.',
    step1Badge: '02 — THE STYLING',
    step1Title: 'Which spaces should bloom?',
    step1Sub: 'Select the areas you want us to decorate. Tap as many as you need.',
    step1Audio: 'Step 2: Which spaces should bloom? Tap the areas like main stage, mandap, entrance gate, or car decoration.',
    step2Badge: '03 — THE FLOWERS',
    step2Title: 'What flowers would you love to see?',
    step2Sub: 'Look at the pictures and tap the flowers you like. You can pick multiple flowers.',
    step2Audio: 'Step 3: What flowers would you love to see? Look at the photos and tap the flowers you like. If you are not sure, choose let florist decide.',
    step3Badge: '04 — EVENT DETAILS',
    step3Title: 'Tell us a little more',
    step3Sub: 'Your contact details help our florist call you with exact prices and advice.',
    step3Audio: 'Step 4: Please enter your event date, name and phone number so our florist can call you.',
    step4Badge: '05 — YOUR PLAN',
    step4Title: 'Here is what you selected',
    step4Sub: 'Check your choices below. Tap the green button to send this plan to us on WhatsApp.',
    step4Audio: 'Step 5: Review your plan. Tap the button to send your request on WhatsApp.',
    recommendBannerTitle: 'Not sure which flowers to pick? Let our Florist decide!',
    recommendBannerSub: 'No stress! Tap here and our floral experts will choose the freshest and best-suited flowers for your event.',
    recommendSelected: '✓ Florist Choice Selected',
    recommendNotSelected: '+ Tap: Let Florist Choose',
    selectedFlowersHead: 'Your Selected Flowers & Quantities (Optional)',
    selectedFlowersSub: 'Quantity is optional. If not sure, leave it as is — our florist will discuss it with you.',
    back: 'Back',
    continue: 'Continue',
    addToBasket: 'Send Enquiry via WhatsApp',
    listenBtn: 'Listen to instructions',
    selectedCount: 'selected',
  },
  hi: {
    steps: ['समारोह का प्रकार', 'सजावट की जगह', 'फूलों का चुनाव', 'तारीख व संपर्क', 'योजना की जांच'],
    audioVoiceLang: 'hi-IN',
    needHelpTitle: 'मदद चाहिए?',
    needHelpDesc: 'सीधे कॉल या व्हाट्सएप करें। हमारे विशेषज्ञ सब कुछ आसानी से नोट कर लेंगे!',
    callNow: 'कॉल करें',
    chatWa: 'व्हाट्सएप करें',
    step0Badge: '01 — अवसर',
    step0Title: 'किस उत्सव की तैयारी है?',
    step0Sub: 'अपने उत्सव की फोटो या नाम पर टैप करें। हम सही फूल और सजावट का सुझाव देंगे।',
    step0Audio: 'चरण 1: किस उत्सव की तैयारी है? शादी, जन्मदिन या पूजा पर टैप करें।',
    step1Badge: '02 — सजावट की जगहें',
    step1Title: 'कहाँ-कहाँ फूल सजाने हैं?',
    step1Sub: 'जिन जगहों को सजाना है उन पर टैप करें। आप एक से ज्यादा जगहें भी चुन सकते हैं।',
    step1Audio: 'चरण 2: कहाँ-कहाँ फूल सजाने हैं? स्टेज, मंडप, स्वागत गेट या गाड़ी पर टैप करें।',
    step2Badge: '03 — फूलों का चुनाव',
    step2Title: 'आपको कौन से फूल पसंद हैं?',
    step2Sub: 'फूलों की फोटो देखें और जो फूल चाहिए उस पर टैप करें। एक से ज्यादा भी चुन सकते हैं।',
    step2Audio: 'चरण 3: आपको कौन से फूल पसंद हैं? फोटो देखकर फूल पर टैप करें। अगर समझ न आए, तो विशेषज्ञ द्वारा चुनने वाला विकल्प दबाएं।',
    step3Badge: '04 — तारीख व संपर्क',
    step3Title: 'समारोह की जानकारी दें',
    step3Sub: 'अपना नाम और फोन नंबर लिखें ताकि हमारे फूल विशेषज्ञ आपको कॉल करके समझा सकें।',
    step3Audio: 'चरण 4: कृपया तारीख, अपना नाम और फोन नंबर लिखें ताकि हम आपको कॉल कर सकें।',
    step4Badge: '05 — आपकी योजना',
    step4Title: 'आपने क्या-क्या चुना है',
    step4Sub: 'अपनी पसंद जांचें। हरे बटन पर टैप करके इसे सीधे व्हाट्सएप पर भेजें।',
    step4Audio: 'चरण 5: अपनी योजना देखें और हरे बटन पर टैप करके व्हाट्सएप पर भेजें।',
    recommendBannerTitle: '✨ समझ नहीं आ रहा कौन सा फूल लें? (हम चुनेंगे)',
    recommendBannerSub: 'बिल्कुल चिंता न करें! इस पर टैप करें और हमारे अनुभवी कारीगर आपके कार्यक्रम के लिए सबसे ताज़ा और सही फूल चुनेंगे।',
    recommendSelected: '✓ विशेषज्ञ का चुनाव चुना गया',
    recommendNotSelected: '+ टैप करें: हमारे विशेषज्ञ चुनेंगे',
    selectedFlowersHead: 'चुने गए फूल व मात्रा (ऐच्छिक)',
    selectedFlowersSub: 'मात्रा तय नहीं है तो चिंता न करें, हम फोन पर बात कर लेंगे।',
    back: 'पीछे जाएं',
    continue: 'आगे बढ़ें',
    addToBasket: 'व्हाट्सएप पर भेजें',
    listenBtn: 'बोलकर सुनें',
    selectedCount: 'चुने गए',
  },
  te: {
    steps: ['వేడుక రకం', 'అలంకరణ ప్రదేశాలు', 'పూల ఎంపిక', 'వివరాలు & ఫోన్', 'సమీక్ష'],
    audioVoiceLang: 'te-IN',
    needHelpTitle: 'సహాయం కావాలా?',
    needHelpDesc: 'నేరుగా కాల్ లేదా వాట్సాప్ చేయండి. మా నిపుణులు మీకు సులభంగా సహాయం చేస్తారు!',
    callNow: 'కాల్ చేయండి',
    chatWa: 'వాట్సాప్',
    step0Badge: '01 — వేడుక రకం',
    step0Title: 'మీరు ఏ వేడుక చేసుకుంటున్నారు?',
    step0Sub: 'మీ వేడుకపై నొక్కండి. మేము సరైన పూలను సూచిస్తాము.',
    step0Audio: 'స్టెప్ 1: మీ వేడుక ఏమిటి? పెళ్లి, పుట్టినరోజు లేదా పూజ పై నొక్కండి.',
    step1Badge: '02 — ప్రదేశాలు',
    step1Title: 'ఏ ప్రదేశాలను అలంకరించాలి?',
    step1Sub: 'స్టేజ్, మండపం, ప్రవేశ ద్వారం లాంటి ప్రదేశాలను ఎంచుకోండి.',
    step1Audio: 'స్టెప్ 2: ఏ ప్రదేశాలను అలంకరించాలి? వేదిక లేదా మండపం ఎంచుకోండి.',
    step2Badge: '03 — పూల ఎంపిక',
    step2Title: 'మీకు ఏ పూలు కావాలి?',
    step2Sub: 'ఫోటోలను చూసి మీకు నచ్చిన పూలపై నొక్కండి. ఒకటి కంటే ఎక్కువ కూడా ఎంచుకోవచ్చు.',
    step2Audio: 'స్టెప్ 3: మీకు ఏ పూలు కావాలి? ఫోటోలను చూసి నొక్కండి.',
    step3Badge: '04 — వివరాలు',
    step3Title: 'మీ వివరాలు తెలపండి',
    step3Sub: 'తేదీ మరియు ఫోన్ నంబర్ ఇవ్వండి. మా నిపుణులు మీకు కాల్ చేస్తారు.',
    step3Audio: 'స్టెప్ 4: దయచేసి తేదీ మరియు ఫోన్ నంబర్ నమోదు చేయండి.',
    step4Badge: '05 — సమీక్ష',
    step4Title: 'మీరు ఎంచుకున్న వివరాలు',
    step4Sub: 'మీ ఎంపికలను తనిఖీ చేసి, వాట్సాప్‌లో పంపడానికి ఆకుపచ్చ బటన్‌ను నొక్కండి.',
    step4Audio: 'స్టెప్ 5: వివరాలను తనిఖీ చేసి వాట్సాప్‌లో పంపండి.',
    recommendBannerTitle: '✨ ఏ పూలు ఎంచుకోవాలో తెలియదా? (మా నిపుణులు ఎంచుకుంటారు)',
    recommendBannerSub: 'ఆందోళన వద్దు! ఇక్కడ నొక్కండి, మీ శుభకార్యానికి సరిపోయే తాజా పూలను మేము ఎంచుకుంటాము.',
    recommendSelected: '✓ నిపుణుల ఎంపిక ఎంచుకోబడింది',
    recommendNotSelected: '+ నొక్కండి: నిపుణులు ఎంచుకుంటారు',
    selectedFlowersHead: 'ఎంచుకున్న పూలు & పరిమాణం (ఐచ్ఛికం)',
    selectedFlowersSub: 'పరిమాణం తెలియకపోతే పర్వాలేదు, మేము ఫోన్‌లో మాట్లాడుకుంటాము.',
    back: 'వెనుకకు',
    continue: 'ముందుకు',
    addToBasket: 'వాట్సాప్‌లో పంపండి',
    listenBtn: 'వినండి',
    selectedCount: 'ఎంచుకున్నారు',
  },
  ta: {
    steps: ['நிகழ்வு வகை', 'அலங்கார இடங்கள்', 'பூக்கள் தேர்வு', 'விவரங்கள் & எண்', 'சரிபார்த்தல்'],
    audioVoiceLang: 'ta-IN',
    needHelpTitle: 'உதவி தேவையா?',
    needHelpDesc: 'நேரடியாக அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும். நாங்கள் அனைத்தையும் கவனித்துக் கொள்வோம்!',
    callNow: 'அழைக்கவும்',
    chatWa: 'வாட்ஸ்அப்',
    step0Badge: '01 — நிகழ்வு',
    step0Title: 'என்ன விசேஷம் கொண்டாடுகிறீர்கள்?',
    step0Sub: 'உங்கள் விசேஷத்தைத் தொடவும். நாங்கள் சிறந்த பூக்களை பரிந்துரைப்போம்.',
    step0Audio: 'படி 1: உங்கள் விசேஷம் என்ன? திருமணம், பிறந்தநாள் அல்லது பூஜை என்பதைத் தொடவும்.',
    step1Badge: '02 — இடங்கள்',
    step1Title: 'எந்த இடங்களை அலங்கரிக்க வேண்டும்?',
    step1Sub: 'மேடை, மணமேடை, நுழைவு வாயில் போன்ற இடங்களைத் தேர்வு செய்யவும்.',
    step1Audio: 'படி 2: எந்த இடங்களை அலங்கரிக்க வேண்டும்? இடங்களைத் தொடவும்.',
    step2Badge: '03 — பூக்கள் தேர்வு',
    step2Title: 'எந்த பூக்கள் உங்களுக்கு வேண்டும்?',
    step2Sub: 'புகைப்படங்களை பார்த்து உங்களுக்கு பிடித்த பூக்களைத் தொடவும். பல பூக்களையும் தேர்வு செய்யலாம்.',
    step2Audio: 'படி 3: புகைப்படங்களை பார்த்து பூக்களைத் தொடவும். தெரியாவிட்டால் நிபுணர் தேர்வு என்பதைத் தொடவும்.',
    step3Badge: '04 — விவரங்கள்',
    step3Title: 'விவரங்களை உள்ளிடவும்',
    step3Sub: 'தேதி மற்றும் தொலைபேசி எண்ணை உள்ளிடவும். எங்கள் குழுவினர் உங்களை அழைப்பார்கள்.',
    step3Audio: 'படி 4: உங்கள் தேதி மற்றும் தொலைபேசி எண்ணை உள்ளிடவும்.',
    step4Badge: '05 — சரிபார்த்தல்',
    step4Title: 'நீங்கள் தேர்வு செய்தவை',
    step4Sub: 'பச்சை நிற பொத்தானைத் தொட்டு இதை வாட்ஸ்அப்பில் அனுப்பவும்.',
    step4Audio: 'படி 5: விவரங்களை சரிபார்த்து வாட்ஸ்அப்பில் அனுப்பவும்.',
    recommendBannerTitle: '✨ எந்த பூக்களை தேர்வு செய்வது என்று தெரியவில்லையா? (நாங்கள் தேர்வு செய்வோம்)',
    recommendBannerSub: 'கவலை வேண்டாம்! இதைத் தொடவும், உங்கள் விழாவுக்கு ஏற்ற சிறந்த புதிய பூக்களை நாங்களே தேர்வு செய்வோம்.',
    recommendSelected: '✓ நிபுணர் தேர்வு செய்யப்பட்டது',
    recommendNotSelected: '+ தொடவும்: நிபுணர்கள் தேர்வு செய்ய',
    selectedFlowersHead: 'தேர்வு செய்யப்பட்ட பூக்கள் & அளவு (விருப்பமானது)',
    selectedFlowersSub: 'அளவு தெரியாவிட்டால் பரவாயில்லை, நாங்கள் பேசி முடிவு செய்வோம்.',
    back: 'பின்னால்',
    continue: 'தொடரவும்',
    addToBasket: 'வாட்ஸ்அப்பில் அனுப்பவும்',
    listenBtn: 'குரல் உதவி',
    selectedCount: 'தேர்வு செய்யப்பட்டது',
  },
}

export default function Events() {
  const [searchParams] = useSearchParams()
  const { addToCart, notify, designs } = useStore()
  const navigate = useNavigate()
  const initialDesign = designs.find(d => d.id === searchParams.get('design'))
  const [step, setStep] = useState(2) // Default to step 2 (Flower selection) or 0
  const [language, setLanguage] = useState('en')
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

  const t = UI_TEXT[language] || UI_TEXT.en

  const speak = (text, customLang) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    try {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = customLang || t.audioVoiceLang || 'en-IN'
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
        quantity: form.quantities[name] || '',
        unit: match?.unit || (name === 'Marigold' ? 'kg' : name === 'Lotus' ? 'pieces' : name === 'Orchid' || name === 'Gladiolus' ? 'stems' : 'bunches'),
      }
    })
  }, [form.flowers, form.quantities])

  const validateStep = () => {
    const nextErrors = {}
    if (step === 0 && !form.eventType) nextErrors.eventType = 'Choose an occasion to continue.'
    if (step === 1 && form.areas.length === 0) nextErrors.areas = 'Select at least one area to decorate.'
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
    const summary = `${form.eventType} · ${form.theme} styling · ${form.areas.length} decoration areas · ${form.flowers.length ? form.flowers.join(', ') : 'Florist recommendation'}`
    addToCart({
      kind: 'event',
      id: `event-${Date.now()}`,
      name: `${form.eventType} floral styling`,
      summary,
      image: selectedDesign?.image || 'https://trichyflowers.in/img/weddings.png',
      details: { ...form, referenceName },
      quantity: 1,
    })
    notify('Your custom event plan is ready in the enquiry basket')
    navigate('/cart')
  }

  return (
    <div className="page-wrap accessible-events-page">
      <PageIntro
        eyebrow="Weddings · Functions · Celebrations"
        title={<>Your day, your way.<br /><em>Let’s plan the flowers.</em></>}
        description="Choose what flowers and styling you love. Easy to pick, with photos, voice help, and direct WhatsApp support."
        image="https://static.wixstatic.com/media/7bfb6f_5989b95a3f294edf9c60110876d8f2cf~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85/7bfb6f_5989b95a3f294edf9c60110876d8f2cf~mv2.jpg"
        imageAlt="Floral event decoration inspiration"
      />

      <section className="event-planner-section">
        {/* Language selector and quick audio banner */}
        <div className="planner-top-toolbar">
          <div className="planner-lang-switch">
            <span className="lang-switch-label"><Globe size={18} /> <b>Language / भाषा / மொழி / భాష:</b></span>
            <div className="lang-buttons">
              <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
              <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}>हिंदी (Hindi)</button>
              <button type="button" className={language === 'te' ? 'active' : ''} onClick={() => setLanguage('te')}>తెలుగు (Telugu)</button>
              <button type="button" className={language === 'ta' ? 'active' : ''} onClick={() => setLanguage('ta')}>தமிழ் (Tamil)</button>
            </div>
          </div>

          <div className="uneducated-assist-bar">
            <div className="assist-icon-box"><PhoneCall size={20} /></div>
            <div className="assist-text">
              <b>{t.needHelpTitle}</b>
              <p>{t.needHelpDesc}</p>
            </div>
            <div className="assist-actions">
              <a href="tel:+919491554114" className="assist-btn assist-btn-call" title="Call directly">
                <Phone size={15} /> <span>{t.callNow}: 94915 54114</span>
              </a>
              <a href="https://wa.me/919491554114?text=Hello%20Maji%20Flowers%2C%20please%20help%20me%20plan%20event%20flowers." target="_blank" rel="noreferrer" className="assist-btn assist-btn-wa">
                <MessageCircle size={15} /> <span>{t.chatWa}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="planner-layout">
          {/* Sidebar */}
          <aside className="planner-sidebar">
            <div className="planner-progress">
              <span>YOUR PLAN / प्रगति</span>
              <b>0{step + 1} <small>/ 05</small></b>
              <div className="progress-track"><i style={{ width: `${(step + 1) * 20}%` }} /></div>
            </div>
            <div className="planner-steps">
              {t.steps.map((label, i) => (
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
              <b>Need a helping hand?</b>
              <p>Just tap the WhatsApp button or call us. We will note your requirements directly.</p>
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
                    <span className="step-serial-tag">{t.step0Badge}</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak(t.step0Audio)}>
                      <Volume2 size={18} />
                      <span>{t.listenBtn}</span>
                    </button>
                  </div>
                  <h3>{t.step0Title}</h3>
                  <p>{t.step0Sub}</p>
                </div>

                <div className="occasion-grid-accessible">
                  {occasionList.map((item) => {
                    const isSelected = form.eventType === item.name
                    const localTitle = item[language] || item.hi
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
                          <span className="occasion-local-name">{localTitle}</span>
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
                  <span>You can change your choices anytime before sending.</span>
                </div>
              </div>
            )}

            {/* STEP 1: STYLING & AREAS */}
            {step === 1 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">{t.step1Badge}</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak(t.step1Audio)}>
                      <Volume2 size={18} />
                      <span>{t.listenBtn}</span>
                    </button>
                  </div>
                  <h3>{t.step1Title}</h3>
                  <p>{t.step1Sub}</p>
                </div>

                <div className="areas-grid-accessible">
                  {decorationAreaList.map((area) => {
                    const isSelected = form.areas.includes(area.name)
                    const localTitle = area[language] || area.hi
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
                          <span className="area-local-name">{localTitle}</span>
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
                  <label>Colour & Styling Theme / रंग और थीम</label>
                  <span>Optional</span>
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
                    <span>CURATED DECORATION IDEAS / सुझाई गई सजावट</span>
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

            {/* STEP 2: FLOWER SELECTION (THE MAIN PAGE IN SCREENSHOT) */}
            {step === 2 && (
              <div className="planner-step-content">
                <div className="step-heading">
                  <div className="step-heading-top">
                    <span className="step-serial-tag">{t.step2Badge}</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak(t.step2Audio)}>
                      <Volume2 size={18} />
                      <span>{t.listenBtn}</span>
                    </button>
                  </div>
                  <h3>{t.step2Title}</h3>
                  <p>{t.step2Sub}</p>
                </div>

                {/* Big Florist Recommendation Card (Great for uneducated / unsure users) */}
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
                    <b>{t.recommendBannerTitle}</b>
                    <p>{t.recommendBannerSub}</p>
                  </div>
                  <div className="recommend-action">
                    <span className={`recommend-pill ${form.flowers.length === 0 ? 'selected' : ''}`}>
                      {form.flowers.length === 0 ? t.recommendSelected : t.recommendNotSelected}
                    </span>
                  </div>
                </div>

                {/* High-visibility Flower Photo Cards Grid */}
                <div className="flower-photo-grid">
                  {flowerCatalog.map((flower) => {
                    const isSelected = form.flowers.includes(flower.name)
                    const localName = flower.localNames[language] || flower.localNames.hi
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
                          {isSelected && <span className="flower-selected-tag">✓ {t.selectedCount}</span>}
                        </div>

                        <div className="flower-card-info">
                          <div className="flower-name-row">
                            <b className="flower-primary-name">{flower.name}</b>
                            <button
                              type="button"
                              className="flower-audio-btn"
                              title="Hear name pronunciation / आवाज सुनें"
                              onClick={(e) => {
                                e.stopPropagation()
                                const phrase = `${flower.name}. ${localName}.`
                                speak(phrase)
                              }}
                            >
                              <Volume2 size={17} />
                            </button>
                          </div>
                          <div className="flower-vernacular-name">
                            <span className="vernacular-native">{localName}</span>
                            <span className="vernacular-phonetic">({flower.altPhonetic})</span>
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
                        <h4>{t.selectedFlowersHead}</h4>
                        <p>{t.selectedFlowersSub}</p>
                      </div>
                      <span className="selected-count-pill">
                        🌸 {form.flowers.length} {t.selectedCount}
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
                              <small>{flowerObj?.localNames[language] || flowerObj?.localNames.hi}</small>
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
                    <span className="step-serial-tag">{t.step3Badge}</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak(t.step3Audio)}>
                      <Volume2 size={18} />
                      <span>{t.listenBtn}</span>
                    </button>
                  </div>
                  <h3>{t.step3Title}</h3>
                  <p>{t.step3Sub}</p>
                </div>

                <div className="form-grid-accessible">
                  <label className="form-field-accessible">
                    <span>📅 Event Date * / तारीख</span>
                    <input
                      type="date"
                      value={form.eventDate}
                      min={new Date().toISOString().slice(0, 10)}
                      onChange={e => update('eventDate', e.target.value)}
                    />
                    {errors.eventDate && <small className="form-error-prominent">{errors.eventDate}</small>}
                  </label>

                  <label className="form-field-accessible">
                    <span>⏰ Event Time / समय</span>
                    <input
                      type="time"
                      value={form.eventTime}
                      onChange={e => update('eventTime', e.target.value)}
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>📍 Venue / Function Hall / हॉल का नाम</span>
                    <input
                      value={form.venue}
                      onChange={e => update('venue', e.target.value)}
                      placeholder="e.g. Royal Palace / Taj Hall"
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>🏙️ Location / City / शहर या इलाका</span>
                    <input
                      value={form.location}
                      onChange={e => update('location', e.target.value)}
                      placeholder="e.g. Hyderabad, Trichy, Mehdipatnam"
                    />
                  </label>

                  <label className="form-field-accessible">
                    <span>👤 Your Name * / आपका नाम</span>
                    <input
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      placeholder="How should we call you?"
                    />
                    {errors.name && <small className="form-error-prominent">{errors.name}</small>}
                  </label>

                  <label className="form-field-accessible">
                    <span>📞 Phone Number * / मोबाइल नंबर</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="Your 10-digit mobile number"
                    />
                    {errors.phone && <small className="form-error-prominent">{errors.phone}</small>}
                  </label>

                  <label className="form-field-accessible form-field-full">
                    <span>💰 Approx Floral Budget / बजट (Optional)</span>
                    <select value={form.budget} onChange={e => update('budget', e.target.value)}>
                      <option value="">Not decided yet / अभी तय नहीं</option>
                      <option>Below ₹15,000</option>
                      <option>₹15,000 – ₹30,000</option>
                      <option>₹30,000 – ₹60,000</option>
                      <option>₹60,000 – ₹1,20,000</option>
                      <option>Above ₹1,20,000</option>
                    </select>
                  </label>

                  <label className="form-field-accessible form-field-full">
                    <span>📝 Any special note or instruction / कोई खास बात</span>
                    <textarea
                      rows="3"
                      value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      placeholder="Colors preferred, timing, garland length, or any special flower requirements..."
                    />
                  </label>

                  {/* Photo upload for reference */}
                  <div className="form-field-accessible form-field-full">
                    <span>📸 Photo Reference / प्रेरणा फोटो (Optional)</span>
                    <label className="upload-area-accessible">
                      <ImagePlus size={24} />
                      <span>{referenceName || 'Tap here to upload a photo of decoration you like'}</span>
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
                    <span className="step-serial-tag">{t.step4Badge}</span>
                    <button type="button" className="step-audio-guide-btn" onClick={() => speak(t.step4Audio)}>
                      <Volume2 size={18} />
                      <span>{t.listenBtn}</span>
                    </button>
                  </div>
                  <h3>{t.step4Title}</h3>
                  <p>{t.step4Sub}</p>
                </div>

                <div className="review-card-accessible">
                  <div className="review-head-accessible">
                    <div>
                      <span className="review-eyebrow">OCCASION / उत्सव</span>
                      <h4>{form.eventType}</h4>
                    </div>
                    <button type="button" className="review-edit-btn" onClick={() => setStep(0)}>
                      Change / बदलें
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
                              <span>{f} {form.quantities[f] ? `(${form.quantities[f]})` : ''}</span>
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
                      <span>Note</span>
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
                  <span>{t.back}</span>
                </button>
              ) : (
                <span className="planner-note-small">✨ Free consultation · No payment needed</span>
              )}

              {step < 4 ? (
                <button type="button" className="btn-step-nav btn-step-next" onClick={next}>
                  <span>{t.continue}</span>
                  <ArrowRight size={20} />
                </button>
              ) : (
                <button type="button" className="btn-step-nav btn-step-submit" onClick={addRequest}>
                  <span>{t.addToBasket}</span>
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
