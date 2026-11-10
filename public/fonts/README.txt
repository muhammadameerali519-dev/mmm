# Urdu Nastaleeq Font File Location

Placing your font file here:
Please copy or upload your font file as:
/public/fonts/JameelNooriNastaleeq.ttf

When running in Vite, any file inside the /public directory is served at the root path,
so /public/fonts/JameelNooriNastaleeq.ttf will be accessible at:
/fonts/JameelNooriNastaleeq.ttf

The CSS @font-face is already configured in src/index.css:
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('/fonts/JameelNooriNastaleeq.ttf') format('truetype');
  font-display: swap;
}

Note: A Google Web Font fallback ('Noto Nastaliq Urdu') is also loaded automatically
so the poetry renders in authentic Nastaleeq script immediately even before uploading the file.
