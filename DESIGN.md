---
version: alpha
name: Seoul-Phoenix-FC-design
description: A bold, energetic sports club website built around a phoenix-fire color palette. Dark hero sections with red-to-gold accents create a dramatic, premium atmosphere. Content sections alternate between white and light-gray canvases for readability. The design language is modern, authoritative, and passionate — reflecting a Korean football club competing in Malaysia. Cards use subtle shadows and rounded corners, CTAs are filled rounded pills in brand-red, and typography uses Pretendard (Korean-optimized geometric sans) for both display and body text.

colors:
  brand-red: "#E63946"
  brand-red-dark: "#C1121F"
  brand-red-light: "#FF6B6B"
  brand-black: "#1D1D1D"
  brand-black-light: "#2B2B2B"
  brand-gold: "#F4A261"
  brand-gold-dark: "#E76F51"
  brand-gold-light: "#FFD166"
  brand-white: "#F8F9FA"
  brand-gray: "#6C757D"
  brand-gray-light: "#E9ECEF"
  brand-gray-dark: "#495057"
  on-brand: "#ffffff"
  on-dark: "#ffffff"
  on-light: "#171717"

typography:
  font-family: "'Pretendard', 'Noto Sans KR', system-ui, sans-serif"
  hero-display:
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-xl:
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  display-lg:
    fontSize: 40px
    fontWeight: 800
    lineHeight: 1.2
  display-md:
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
  display-sm:
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
  lead:
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-lg:
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  caption-strong:
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.5
  button:
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1

spacing:
  page-max-width: "1280px"
  content-max-width: "1024px"
  section-padding-y: "80px"
  section-padding-y-lg: "112px"
  card-padding: "24px"
  card-radius: "12px"
  button-radius: "9999px"

components:
  header:
    height: "64px"
    height-lg: "80px"
    background: "transparent → rgba(29,29,29,0.95) on scroll"
    text-color: "#ffffff"
    text-color-muted: "rgba(255,255,255,0.8)"
    active-color: "#FFD166"
    backdrop-filter: "blur(12px)"
    
  hero:
    min-height: "100vh"
    background: "#1D1D1D with radial gradients"
    overlay-gradient: "linear-gradient(to bottom right, rgba(230,57,70,0.2), transparent)"
    badge: "rounded-full bg-brand-red/20 border border-brand-red/30 text-brand-gold-light"
    
  card:
    background: "#ffffff"
    border: "1px solid #f0f0f0"
    border-radius: "12px"
    shadow: "0 1px 3px rgba(0,0,0,0.06)"
    shadow-hover: "0 10px 30px rgba(0,0,0,0.1)"
    transition: "all 0.3s ease"
    
  button:
    primary:
      background: "#E63946"
      hover: "#C1121F"
      text: "#ffffff"
      border-radius: "9999px"
      padding: "14px 32px"
      font-weight: 700
      transition: "all 0.2s ease"
      shadow: "0 4px 15px rgba(230,57,70,0.3)"
    secondary:
      background: "transparent"
      hover: "rgba(255,255,255,0.1)"
      text: "#ffffff"
      border: "1px solid rgba(255,255,255,0.3)"
      border-radius: "9999px"
      padding: "14px 32px"
      font-weight: 500

  filter-tabs:
    active-background: "#E63946"
    active-text: "#ffffff"
    inactive-text: "#6C757D"
    inactive-hover: "#1D1D1D"
    border-radius: "9999px"
    padding: "8px 20px"

  form:
    input-border: "#E9ECEF"
    input-focus-border: "#E63946"
    input-focus-ring: "rgba(230,57,70,0.2)"
    input-radius: "12px"
    input-padding: "12px 16px"

  footer:
    background: "#1D1D1D"
    text-color: "rgba(255,255,255,0.5)"
    text-color-hover: "#FFD166"
    divider: "rgba(255,255,255,0.1)"

layout:
  page-header:
    height: "80px (pt-20 for content)"
    background: "#1D1D1D with brand-red overlay gradient"
    title: "text-white text-4xl to 5xl font-extrabold"
    subtitle: "text-white/60 text-lg"
  
  grid-gap: "24px"
  section-spacing: "80px lg:112px"
  
  match-card:
    layout: "flex row on lg, stacked on mobile"
    team-names: "grid grid-cols-3 with VS badge in center"
    completed-scores: "inline-flex with larger font for winner"

animation:
  hero-fade-in: "fadeInUp 0.6s ease-out forwards"
  stagger-delays: "0.1s through 0.6s"
  pulse-glow: "2s ease-in-out infinite (for live indicators)"
  scroll-transition: "header bg appears after 20px scroll"
  hover-lift: "transform + shadow transition 0.3s ease"
  gradient-shimmer: "3s linear infinite for gold text"

iconography:
  style: "outline, stroke-width 1.5-2px"
  size-default: "24px"
  color: "currentColor with opacity for muted states"

imagery:
  style: "Placeholder gradients using brand colors"
  match-photos: "16:9 aspect ratio with gradient overlay"
  player-avatars: "circular, gradient border"
  gallery-thumbnails: "1:1 aspect ratio, rounded-xl"
  
patterns:
  section-alternation: "white → gray-50 → white → gray-50"
  cta-sections: "brand-black background with radial gradient overlay"
  decorative-circles: "large bordered circles with slow pulse animation"
  scroll-indicator: "centered at bottom of hero, bouncing dot in pill"
