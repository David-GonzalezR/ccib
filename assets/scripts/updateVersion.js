
(function () {
    const version = "1.0.4"; // Cambia este número en cada actualización
    const savedVersion = localStorage.getItem("siteVersion");

    if (savedVersion !== version) {
        console.log("🔄 Nueva versión detectada. Limpiando caché...");
        localStorage.setItem("siteVersion", version);
        caches.keys().then(names => {
            names.forEach(name => caches.delete(name)); // Borra caché
        });
        sessionStorage.clear(); // Borra caché de sesión
        location.reload(true); // Recarga la página
    }
})();

