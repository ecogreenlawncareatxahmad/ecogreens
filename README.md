# EcoGreens Lawn Care Website

A modern, responsive website for EcoGreens Lawn Care services in Austin, Texas.

## Features

- **Modern Design**: Clean, professional design with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **All Services Listed**: Includes all 12 services from the original website
- **Contact Information**: Complete contact details including email, phone, and WhatsApp
- **Portfolio Section**: Gallery section ready for project photos
- **Contact Form**: Functional contact form (ready to connect to backend)

## Services Included

1. Masonry Service
2. Pruning
3. Core Aeration
4. Bush Trimming
5. Mulching Service
6. Landscape Maintenance
7. Seasonal Cleanup
8. Leaf Removal
9. Wooden
10. Home Fences
11. Wood Decks/Pergola
12. Concrete Works

## How to Add Images

### Hero Section Background
Replace the gradient background in the hero section by modifying `styles.css`:

```css
.slide {
    background: url('path/to/your/hero-image.jpg') center/cover;
}
```

Or add an image directly in the HTML:

```html
<div class="slide active">
    <img src="images/hero-bg.jpg" alt="Lawn Care" style="width: 100%; height: 100%; object-fit: cover;">
    <div class="slide-overlay"></div>
</div>
```

### Service Cards
Replace the placeholder divs in `index.html`:

```html
<div class="service-image">
    <img src="images/masonry-service.jpg" alt="Masonry Service">
</div>
```

### Portfolio/Gallery
Replace the placeholder divs:

```html
<div class="portfolio-image">
    <img src="images/portfolio-1.jpg" alt="Project Name" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### About Section
Replace the placeholder:

```html
<div class="about-image">
    <img src="images/about-photo.jpg" alt="About Us" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
</div>
```

## Recommended Image Sizes

- **Hero Background**: 1920x1080px or larger
- **Service Cards**: 400x300px
- **Portfolio Items**: 600x600px (square)
- **About Section**: 600x800px

## Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2d8659;  /* Main green color */
    --primary-dark: #1f5d3f;   /* Darker green */
    --secondary-color: #f4a261; /* Accent color */
}
```

### Contact Information
Update contact details in `index.html`:
- Email addresses
- Phone number
- Location
- WhatsApp link

## Form Submission

The contact form currently shows an alert on submission. To make it functional:

1. Set up a backend service (e.g., Formspree, EmailJS, or your own server)
2. Update the form submission handler in `script.js`
3. Add proper error handling and success messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Deployment

Simply upload all files to your web hosting service. No build process required!

## License

© 2024 EcoGreens Lawn Care. All rights reserved.

