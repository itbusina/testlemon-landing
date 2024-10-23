// update all links to point to coming-soon page if they are not ready yet
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll("a")
        .forEach(a => {
            let href = a.getAttribute("href");
            if (!href) {
                return;
            }

            if (href === "#" || href === "javascript:void(0)") {
                a.setAttribute("href", "coming-soon.html");
            }
        });
});
