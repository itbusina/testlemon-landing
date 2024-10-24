document.addEventListener("DOMContentLoaded", function () {
    // update all links to point to coming-soon page if they are not ready yet
    document
        .querySelectorAll("a")
        .forEach(a => {
            let href = a.getAttribute("href");

            if (!href || ["#", "", "null", "undefined", "javascript:void(0)"].includes(href)) {
                a.setAttribute("href", "coming-soon.html");
            }
        });

    // Add the 'hidden' class to the element
    let pageLoader = document.getElementById("pageLoader");
    if (pageLoader) {
        pageLoader.classList.add('hidden');
    }

    document.getElementsByName('section').forEach(e => e.setAttribute('display', ''));
});