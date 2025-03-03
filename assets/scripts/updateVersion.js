const version = "1.0.2"; // Cambia este número en cada actualización

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("script, link[rel='stylesheet']").forEach(tag => {
        let src = tag.getAttribute("src") || tag.getAttribute("href");
        if (src && !src.includes("updateVersion.js")) {
            let newSrc = src.split("?")[0] + "?v=" + version;
            tag.setAttribute(src.includes(".css") ? "href" : "src", newSrc);
        }
    });
});

const savedVersion = localStorage.getItem("siteVersion");

if (savedVersion !== version) {
    console.log("🔄 Nueva versión detectada. Recargando...");
    localStorage.setItem("siteVersion", version);
    location.reload();
}
