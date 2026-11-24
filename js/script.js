// Display a welcome message based on the visitor's local time
function updateGreeting() {
    const greetingElement = document.getElementById("timeGreeting");
    if (!greetingElement) return;

    const currentHour = new Date().getHours();
    let timeOfDayGreeting = "Good evening";

    if (currentHour < 12) {
        timeOfDayGreeting = "Good morning";
    } else if (currentHour < 18) {
        timeOfDayGreeting = "Good afternoon";
    }

    greetingElement.textContent = `${timeOfDayGreeting}, visitor! Welcome to my site.`;
}

//Toggle between light mode and dark mode on button click
function initThemeToggle() {
    const toggleButton = document.getElementById("themeToggleBtn");
    if (!toggleButton) return;

    toggleButton.addEventListener("click", function () {
        const isDarkMode = document.body.classList.toggle("dark-mode");
        toggleButton.setAttribute("aria-pressed", String(isDarkMode));
        toggleButton.textContent = isDarkMode
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
    });
}

//Dynamically create and append a new row to the Skills table
function initAddSkillRow() {
    const skillForm = document.getElementById("addSkillForm");
    const tableBody = document.querySelector("#skillsTable tbody");
    if (!skillForm || !tableBody) return;

    skillForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const skillNameInput = document.getElementById("skillName");
        const skillLevelInput = document.getElementById("skillLevel");
        const skillGoalInput = document.getElementById("skillGoal");

        const skillName = skillNameInput.value.trim();
        const skillLevel = skillLevelInput.value;
        const skillGoal = skillGoalInput.value.trim();

        if (!skillName || !skillGoal) return;

        // Create table row and cell elements dynamically
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = skillName;

        const levelCell = document.createElement("td");
        levelCell.textContent = skillLevel;

        const goalCell = document.createElement("td");
        goalCell.textContent = skillGoal;

        row.append(nameCell, levelCell, goalCell);
        tableBody.appendChild(row);

        // Reset form fields and return focus to skill input
        skillForm.reset();
        skillNameInput.focus();
    });
}

// Show or hide additional project details on button click
function initProjectDetailsToggle() {
    const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
    const projectDetails = document.getElementById("projectDetails");
    if (!toggleDetailsBtn || !projectDetails) return;

    toggleDetailsBtn.addEventListener("click", function () {
        const isNowHidden = projectDetails.classList.toggle("hidden");
        const isExpanded = !isNowHidden;

        toggleDetailsBtn.setAttribute("aria-expanded", String(isExpanded));
        toggleDetailsBtn.textContent = isExpanded
            ? "Hide Project Details"
            : "Show Project Details";
    });
}

//Live character counter for the contact message textarea
function initCharacterCounter() {
    const messageTextarea = document.getElementById("visitorMessage");
    const counterDisplay = document.getElementById("charCounter");
    if (!messageTextarea || !counterDisplay) return;

    const maxLength = messageTextarea.maxLength || 200;

    function updateCounterText() {
        const remaining = maxLength - messageTextarea.value.length;
        counterDisplay.textContent = `${remaining} characters remaining`;
    }

    messageTextarea.addEventListener("input", updateCounterText);
    updateCounterText();
}

// Retrieve and display current browser window dimensions on resize
function initWindowSizeDisplay() {
    const sizeDisplay = document.getElementById("windowSizeDisplay");
    if (!sizeDisplay) return;

    function renderWindowDimensions() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        sizeDisplay.textContent = `Current viewport size: ${width}px × ${height}px`;
    }

    window.addEventListener("resize", renderWindowDimensions);
    renderWindowDimensions();
}

// Back-to-top button visibility and smooth scroll behavior
function initBackToTopButton() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", function () {
        backToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Handle contact form submission and show confirmation text
function initContactFormSubmission() {
    const contactForm = document.getElementById("contactForm");
    const contactStatus = document.getElementById("contactStatus");
    const counterDisplay = document.getElementById("charCounter");
    const messageTextarea = document.getElementById("visitorMessage");
    if (!contactForm || !contactStatus) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("visitorName");
        const visitorName = nameInput ? nameInput.value.trim() : "Visitor";

        contactStatus.textContent = `Thank you, ${visitorName}! Your message has been received.`;
        contactForm.reset();

        // Reset character counter back to full limit after form reset
        if (counterDisplay && messageTextarea) {
            const maxLength = messageTextarea.maxLength || 200;
            counterDisplay.textContent = `${maxLength} characters remaining`;
        }
    });
}

// Initialize all interactive features when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    updateGreeting();
    initThemeToggle();
    initAddSkillRow();
    initProjectDetailsToggle();
    initCharacterCounter();
    initWindowSizeDisplay();
    initBackToTopButton();
    initContactFormSubmission();
});