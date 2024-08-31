module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
    "./src/**/*.html",
    "./src/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        'texto': '#848c9f',        // Color para modo claro
        'fondo': '#454E5F',        // Color para modo claro
        'dark-texto': '#d1d5db',   // Color para modo oscuro
        'dark-fondo': '#1f2937',   // Color para modo oscuro
        'dark-input': '#374151',   // Color de fondo de input en modo oscuro
        'dark-input-text': '#e5e7eb', // Color de texto de input en modo oscuro
        'dark-button': '#2563eb',  // Color de fondo de botón en modo oscuro
        'dark-button-text': '#ffffff', // Color de texto de botón en modo oscuro
      },
    },
  },
  plugins: [],
};
