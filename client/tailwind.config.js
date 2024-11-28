/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors (for emphasis and CTA buttons)
        "primary-100": "#C56E04",  // A strong warm yellow-orange
        "primary-200": "#FF6D00",  // Vibrant orange, perfect for buttons

        // Secondary colors (for softer accents and backgrounds)
        "secondary-100": "#E89A06",  // Soft yellow-orange for headers or highlights
        "secondary-200": "#FBD305",  // Light yellow, for subtle highlights

        // Neutral tones for a balanced background
        "neutral-100": "#F4F4F4",  // Light gray for background or cards
        "neutral-200": "#E0E0E0",  // Slightly darker gray for borders or text
        "neutral-300": "#B0B0B0",  // Medium gray for text and icons

        // Accent colors for visual interest
        "accent-100": "#2B7A0B",  // Deep green for elements that need focus
        "accent-200": "#57A500",  // Soft green for secondary highlights or links

        // Additional tones for variety and balance
        "background-light": "#FFFFFF",  // Pure white for general background
        "background-dark": "#F1F1F1",  // Very light gray for card backgrounds
        "text-dark": "#333333",  // Darker text color for legibility
        "text-light": "#EAEAEA",  // Light text for lighter backgrounds
      },
    },
  },
  plugins: [],
}
