# SMJ Profaith Printing Services – Company Website

## Project Overview

This website was developed by us, BSIS students, as part of our Web Development course. It presents the business information, products, services, price lists, updates, and contact details of SMJ Profaith Printing Services, a local printing business located in Tunasan, Muntinlupa.

## Purpose

To provide SMJ Profaith Printing Services with an informational website where customers can easily view the business background, available products and services, price lists, announcements, frequently asked questions, and contact information. The website complements the business's existing walk-in and online communication channels (Facebook, Messenger, Instagram, and email).

## Team Members & Roles

| Role | Name |
|---|---|
| Project Manager | Jehaia Bless D. Seva |
| Designer | Jazmine B. Borja |
| Content Writer | Mark Neo D. Mendoza |
| Developer | Cecilio Emil J. Mendez |
| Researcher | John Paul A. Bañez |

## Tools Used

- HTML
- CSS
- JavaScript
- Visual Studio Code
- Git and GitHub
- GitHub Pages

## Site Structure

| File | Page | Contents |
|---|---|---|
| `index.html` | Home | Company introduction, services at a glance with a View Price Lists button, and reasons to choose the business |
| `about.html` | About Us | Behind the business, mission and vision, and objectives |
| `services.html` | Products & Services | Products, service highlights, four-step order process, and price lists |
| `blog.html` | Blog/Updates | Printing tips, promotions and announcements, and community engagement |
| `faqs.html` | FAQs | Common customer questions, service guidelines, and information about payment, pickup, and delivery |
| `contact.html` | Contact Us | Inquiry form, contact details and business hours, social media links, and location map |

### Project Structure

```text
SMJ-ProFaith_Printing-Services/
├── assets/
│   ├── products/          # Product photos
│   ├── service-rates/     # Price list images
│   ├── fb-cover.jpg       # About Us cover image
│   ├── logo.png
│   ├── services-1.jpg     # Our Services at a Glance photos
│   ├── services-2.jpg
│   └── services-3.jpg
├── css/
│   ├── base.css
│   ├── home.css
│   ├── pages.css
│   └── services.css
├── about.html
├── blog.html
├── contact.html
├── faqs.html
├── index.html
├── services.html
├── script.js
├── README.md
└── .gitignore
```

## Features

- Responsive layout for desktop, tablet, and mobile devices
- Hamburger navigation menu on smaller screens
- Inquiry form with client-side validation for required fields, email format, and Philippine mobile number format
- Price list gallery on the Products & Services page, with a "See more" button
- View Price Lists button on the Home page that leads to the price lists
- Business hours, contact details, and embedded Google Map on the Contact page
- FAQ accordion for displaying frequently asked questions
- Image lightbox for viewing the logo on the Home page
- Scroll-reveal animations, with reduced-motion support
- Semantic HTML5 elements such as `header`, `nav`, `main`, `section`, `article`, and `footer`

## Design Concept

- **Color Scheme:** Pink, white, and black, based on the company's logo

  | Color | Hex | Use |
  |---|---|---|
  | Brand pink | `#f25c7a` | Page banners, buttons, and highlights |
  | Dark pink | `#d43f60` | Hover states and emphasis |
  | Soft pink | `#fde4ec` | Section backgrounds |
  | White | `#ffffff` | Cards and content backgrounds |
  | Black | `#111111` | Headings, body text, buttons, and footer |
  | Gray | `#4a4a4a` | Secondary text |

- **Typography:** Playfair Display for headings (Times New Roman as fallback); Montserrat and Roboto for navigation, labels, buttons, and body text
- **Design Principles:** Contrast, repetition, alignment, and proximity
- **Layout:** Consistent page layouts and responsive elements for easier navigation across different screen sizes

## Running Locally

1. Open the project folder in **Visual Studio Code**.
2. Install the recommended **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.

No build tools or additional installation are required. The website uses HTML, CSS, and JavaScript.

## Deployment

- **GitHub Repository:** https://github.com/sevajehaiabless06/SMJ-ProFaith_Printing-Services
- **Live Site:** https://sevajehaiabless06.github.io/SMJ-ProFaith_Printing-Services

The website is deployed using GitHub Pages from the `main` branch (root folder). Pushing changes to `main` updates the live site.

## Lessons Learned

Through this project, the team gained experience in:

- Collaborating and managing project files using Git and GitHub.
- Developing a multi-page website using HTML, CSS, and JavaScript.
- Applying responsive design to make the website accessible on different screen sizes.
- Organizing business information into separate pages for easier navigation.
- Deploying a website through GitHub Pages.

## Timeline

| Phase | Task | Date |
|---|---|---|
| Proposal | Project planning and initial presentation | September 30, 2026 |
| Development | Website design, coding, and revisions | October–November 2026 |
| Deployment | GitHub setup and website deployment | November 2026 |
| Final Submission | Final documentation and presentation | November 27, 2026 |

## Notes for Maintenance

- The inquiry form validates visitor input in the browser only. It does not automatically send or store submissions. Customers can use the provided contact options to reach the business.
- Payment, pickup, and delivery arrangements are not handled by the website. The FAQs page directs customers to contact the business directly.
- Shared colors are defined in `css/base.css` so the website's color scheme can be updated in one place.
- The website is an informational front-end project and does not include a backend, database, online checkout, or automatic order management.

---

**BSIS – 3C**
**Instructor:** Dr. Mary Joy Daniel Viñas
