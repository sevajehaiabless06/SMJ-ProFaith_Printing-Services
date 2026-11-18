/* ==========================================================================
   SMJ Profaith Printing Services - Main JavaScript

   Features:
   1. Current year in footer
   2. Mobile navigation toggle
   3. Scroll-reveal animations
   4. Inquiry form validation
   5. FAQ accordion
   6. Hero logo lightbox
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    setupMobileMenu();
    setupScrollReveal();
    setupInquiryForm();
    setupFaqAccordion();
    setupLogoLightbox();
    setupFeaturedWorksLightbox();
    setupPriceListToggle();
});


/* ==========================================================================
   1. FOOTER YEAR
   Automatically updates the copyright year.
   ========================================================================== */

function setCurrentYear() {
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}


/* ==========================================================================
   2. MOBILE NAVIGATION
   Opens and closes the navigation menu on smaller screens.
   ========================================================================== */

function setupMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after selecting a navigation link.
    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close the menu when Escape is pressed.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}


/* ==========================================================================
   3. SCROLL REVEAL
   Displays elements when they enter the visible screen area.
   ========================================================================== */

function setupScrollReveal() {
    const items = document.querySelectorAll(".reveal");

    if (!items.length) return;

    // Show all elements if IntersectionObserver is not supported.
    if (!("IntersectionObserver" in window)) {
        items.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");

                    // Animate each element only once.
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    items.forEach((element) => {
        observer.observe(element);
    });
}


/* ==========================================================================
   4. INQUIRY FORM VALIDATION
   Checks required fields, email format, and Philippine mobile number format.

   IMPORTANT:
   This is front-end validation only. The form is not connected to an email
   service or backend, so it cannot actually send inquiries yet.
   ========================================================================== */

function setupInquiryForm() {
    const form = document.getElementById("inquiry-form");

    if (!form) return;

    const statusElement = document.getElementById("form-status");

    const rules = {
        name: {
            validate: (value) => value.trim().length >= 2,
            message: "Please enter your name (at least 2 characters)."
        },

        email: {
            validate: (value) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),

            message: "Please enter a valid email address."
        },

        phone: {
            // Phone number is optional.
            // Accepts Philippine mobile formats:
            // 09XXXXXXXXX
            // +639XXXXXXXXX
            // 639XXXXXXXXX

            validate: (value) => {
                const phone = value.replace(/[\s-]/g, "");

                if (phone === "") return true;

                return /^(09\d{9}|\+639\d{9}|639\d{9})$/.test(phone);
            },

            message: "Please enter a valid Philippine mobile number."
        },

        service: {
            validate: (value) => value !== "",
            message: "Please select the service you need."
        },

        details: {
            validate: (value) => value.trim().length >= 10,
            message: "Please describe your project (at least 10 characters)."
        }
    };


    // Displays or clears an individual field error.
    function setFieldError(field, message) {
        const errorElement = document.getElementById(
            `${field.name}-error`
        );

        if (message) {
            field.classList.add("invalid");
            field.setAttribute("aria-invalid", "true");

            if (errorElement) {
                errorElement.textContent = message;
            }

        } else {
            field.classList.remove("invalid");
            field.removeAttribute("aria-invalid");

            if (errorElement) {
                errorElement.textContent = "";
            }
        }
    }


    // Validates one form field.
    function validateField(field) {
        const rule = rules[field.name];

        if (!rule) return true;

        const isValid = rule.validate(field.value);

        setFieldError(field, isValid ? "" : rule.message);

        return isValid;
    }


    // Adds validation feedback when a visitor leaves a field.
    Object.keys(rules).forEach((fieldName) => {
        const field = form.elements[fieldName];

        if (!field) return;

        field.addEventListener("blur", () => {
            validateField(field);
        });

        field.addEventListener("input", () => {
            if (field.classList.contains("invalid")) {
                validateField(field);
            }
        });

        field.addEventListener("change", () => {
            if (field.classList.contains("invalid")) {
                validateField(field);
            }
        });
    });


    // Handles form submission.
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let firstInvalidField = null;

        Object.keys(rules).forEach((fieldName) => {
            const field = form.elements[fieldName];

            if (!field) return;

            const isValid = validateField(field);

            if (!isValid && !firstInvalidField) {
                firstInvalidField = field;
            }
        });


        // Stop submission if there are invalid fields.
        if (firstInvalidField) {
            if (statusElement) {
                statusElement.textContent =
                    "Please correct the highlighted fields.";

                statusElement.className = "form-status error";
            }

            firstInvalidField.focus();

            return;
        }


        // Validation passed, but the form is not connected to a backend.
        if (statusElement) {
            statusElement.textContent =
                "Your information passed validation. Please contact SMJ Profaith Printing Services directly using the contact details provided on this page to send your inquiry.";

            statusElement.className = "form-status success";
        }

        // Do not reset the form because no actual submission has occurred.
    });
}


/* ==========================================================================
   5. FAQ ACCORDION
   Opens the selected FAQ answer and closes the others.
   ========================================================================== */

function setupFaqAccordion() {
    const questions = document.querySelectorAll(".faq-question");

    if (!questions.length) return;

    questions.forEach((question) => {
        question.addEventListener("click", () => {
            const faqItem = question.closest(".faq-item");

            const isOpen =
                question.getAttribute("aria-expanded") === "true";


            // Close all FAQ items first.
            questions.forEach((otherQuestion) => {
                const otherItem = otherQuestion.closest(".faq-item");

                otherQuestion.setAttribute("aria-expanded", "false");

                if (otherItem) {
                    otherItem.classList.remove("open");
                }
            });


            // Open the selected FAQ item if it was previously closed.
            if (!isOpen) {
                question.setAttribute("aria-expanded", "true");

                if (faqItem) {
                    faqItem.classList.add("open");
                }
            }
        });
    });
}


/* ==========================================================================
   6. HERO LOGO LIGHTBOX
   Opens the company logo in a larger preview when clicked.
   ========================================================================== */

function setupLogoLightbox() {
    const heroCard = document.querySelector(".hero-card");
    const heroLogo = heroCard
        ? heroCard.querySelector("img")
        : null;

    if (!heroLogo) return;


    // Create the lightbox container.
    const lightbox = document.createElement("div");

    lightbox.className = "logo-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <div
            class="logo-lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label="SMJ Profaith logo preview"
        >

            <button
                class="logo-lightbox-close"
                type="button"
                aria-label="Close logo preview"
            >
                &times;
            </button>

            <img
                src="${heroLogo.src}"
                alt="${heroLogo.alt || "SMJ Profaith Printing Services logo"}"
            >

        </div>
    `;

    document.body.appendChild(lightbox);


    const closeButton = lightbox.querySelector(
        ".logo-lightbox-close"
    );

    if (!closeButton) return;


    let previouslyFocusedElement = null;


    // Opens the logo preview.
    function openLogoLightbox() {
        previouslyFocusedElement = document.activeElement;

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }


    // Closes the logo preview.
    function closeLogoLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }


    // Open when the logo is clicked.
    heroLogo.addEventListener("click", openLogoLightbox);


    // Make the logo accessible through keyboard navigation.
    heroLogo.setAttribute("tabindex", "0");

    heroLogo.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLogoLightbox();
        }
    });


    // Close button.
    closeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        closeLogoLightbox();
    });


    // Close when the visitor clicks outside the logo preview.
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLogoLightbox();
        }
    });


    // Prevent clicks inside the preview from closing it.
    const lightboxContent = lightbox.querySelector(
        ".logo-lightbox-content"
    );

    lightboxContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });


    // Close when Escape is pressed.
    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {
            closeLogoLightbox();
        }
    });
}

/* ==========================================================================
   7. FEATURED PRINTING WORKS LIGHTBOX
   Opens featured printing images in a larger preview.
   ========================================================================== */

function setupFeaturedWorksLightbox() {
    const imageButtons = document.querySelectorAll(
        ".featured-image-button"
    );

    if (!imageButtons.length) return;

    const lightbox = document.createElement("div");

    lightbox.className = "featured-lightbox";
    lightbox.setAttribute("aria-hidden", "true");

    lightbox.innerHTML = `
        <div
            class="featured-lightbox-content"
            role="dialog"
            aria-modal="true"
            aria-label="Featured printing image preview"
        >
            <button
                class="featured-lightbox-close"
                type="button"
                aria-label="Close image preview"
            >
                &times;
            </button>

            <img src="" alt="">
        </div>
    `;

    document.body.appendChild(lightbox);

    const previewImage = lightbox.querySelector("img");
    const closeButton = lightbox.querySelector(
        ".featured-lightbox-close"
    );

    let previouslyFocusedElement = null;

    function openLightbox(button) {
        const image = button.querySelector("img");

        if (!image) return;

        previouslyFocusedElement = button;

        previewImage.src = image.src;
        previewImage.alt = image.alt;

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        previewImage.src = "";
        previewImage.alt = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    imageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openLightbox(button);
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {
            closeLightbox();
        }
    });
}


/* ==========================================================================
   8. PRICE LIST TOGGLE
   Shows the first four price cards by default and toggles the rest.
   ========================================================================== */

function setupPriceListToggle() {
    const grid = document.getElementById("rate-card-grid");
    const toggle = document.getElementById("rate-list-toggle");

    if (!grid || !toggle) return;

    const cards = grid.querySelectorAll(".rate-card");

    if (cards.length <= 4) {
        toggle.hidden = true;
        return;
    }

    const hiddenCards = Array.from(cards).slice(4);
    hiddenCards.forEach((card) => {
        card.classList.add("rate-card-hidden");
    });

    toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";

        hiddenCards.forEach((card) => {
            card.classList.toggle("rate-card-hidden", isExpanded);
        });

        toggle.setAttribute("aria-expanded", String(!isExpanded));
        toggle.textContent = isExpanded ? "See more" : "See less";
    });
}