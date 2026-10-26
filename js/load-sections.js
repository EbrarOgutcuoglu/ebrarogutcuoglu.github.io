const sections = [
    "about",
    "experience",
    "projects",
    "education",
    "skills",
    "certifications",
    "interests",
    "contact"
];

async function loadSections() {
    const container = document.getElementById("portfolio-content");

    try {
        const responses = await Promise.all(
            sections.map(async (section) => {
                const response = await fetch(`sections/${section}.html`);

                if (!response.ok) {
                    throw new Error(`Could not load ${section}.html`);
                }

                return response.text();
            })
        );

        container.innerHTML = responses.join("\n");

        // Scroll to the section if the URL contains a hash.
        if (window.location.hash) {
            requestAnimationFrame(() => {
                document.querySelector(window.location.hash)?.scrollIntoView();
            });
        }
    } catch (error) {
        console.error("Portfolio loading error:", error);
        container.innerHTML = `
            <section class="resume-section p-3 p-lg-5">
                <h2>Unable to load portfolio</h2>
                <p>Please open the site through a local web server or GitHub Pages.</p>
            </section>
        `;
    }
}

loadSections();