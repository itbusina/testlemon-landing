// update all links to point to coming-soon page if they are not ready yet
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll("a")
        .forEach(a => {
            let href = a.getAttribute("href");

            if (!href || ["#", "", "null", "undefined", "javascript:void(0)"].includes(href)) {
                a.setAttribute("href", "coming-soon.html");
            }
        });
});
