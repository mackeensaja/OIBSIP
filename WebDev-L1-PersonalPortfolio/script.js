
/* =========================================
   MACKEEN FATHIMA SAJA - PORTFOLIO
   Complete JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. DARK / LIGHT MODE
    // =====================================

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle?.querySelector("i");

    // Load previously selected theme
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    function updateThemeIcon() {
        if (!themeIcon) return;

        if (document.body.classList.contains("dark-mode")) {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const currentTheme =
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light";

        localStorage.setItem("portfolio-theme", currentTheme);

        updateThemeIcon();
    });


    // =====================================
    // 2. MOBILE NAVIGATION MENU
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const menuIcon = menuToggle?.querySelector("i");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu?.classList.remove("active");

        if (menuIcon) {
            menuIcon.className = "fas fa-bars";
        }

        menuToggle?.setAttribute("aria-expanded", "false");
    }

    menuToggle?.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        if (menuIcon) {
            menuIcon.className = isOpen
                ? "fas fa-times"
                : "fas fa-bars";
        }

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });


    // =====================================
    // 3. TYPING ANIMATION
    // =====================================

    const typingText = document.getElementById("typingText");

    const roles = [
        "Software Developer",
        "Web Developer",
        "Frontend Developer",
        "UI/UX Enthusiast",
        "IT Student"
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;

            if (characterIndex === currentRole.length) {
                deleting = true;
                setTimeout(typeEffect, 1400);
                return;
            }

        } else {

            typingText.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;

            if (characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }

        }

        setTimeout(typeEffect, deleting ? 45 : 100);
    }

    typeEffect();


    // =====================================
    // 4. CURRENT YEAR IN FOOTER
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 5. BACK TO TOP BUTTON
    // =====================================

    const backToTop = document.getElementById("backToTop");

    function handleScroll() {

        if (!backToTop) return;

        if (window.scrollY > 350) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleScroll);

    handleScroll();


    // =====================================
    // 6. ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // =====================================
    // 7. CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    contactForm?.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        // Check empty fields
        if (!name || !email || !subject || !message) {

            formStatus.textContent = "Please fill in all fields.";
            return;

        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formStatus.textContent = "Please enter a valid email address.";
            return;

        }

        // Prepare email content
        const recipient = "mackeensaja16@gmail.com";

        const emailSubject = encodeURIComponent(subject);

        const emailBody = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message
        );

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        formStatus.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;

    });


    // =====================================
    // 8. SMOOTH SCROLL FOR INTERNAL LINKS
    // =====================================

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =====================================
    // 9. CONSOLE MESSAGE
    // =====================================

    console.log(
        "%cWelcome to Mackeen Fathima Saja's Portfolio!",
        "color: #635bff; font-size: 16px; font-weight: bold;"
    );

});
