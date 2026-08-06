document.addEventListener("click", async (event) => {
    const copyLink = event.target.closest("[data-copy-email]");

    if (!copyLink) {
        return;
    }

    event.preventDefault();

    const email = copyLink.dataset.email;
    const originalText = copyLink.textContent;

    if (!email) {
        return;
    }

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = email;
            textArea.setAttribute("readonly", "");
            textArea.style.position = "fixed";
            textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.select();

            const copied = document.execCommand("copy");
            document.body.removeChild(textArea);

            if (!copied) {
                throw new Error("Copy command failed");
            }
        }

        copyLink.textContent = "Email copied";
        copyLink.setAttribute("aria-label", `${email} copied to clipboard`);

        window.setTimeout(() => {
            copyLink.textContent = originalText;
            copyLink.setAttribute("aria-label", `Copy ${email}`);
        }, 2200);
    } catch (error) {
        window.location.href = `mailto:${email}`;
    }
});
