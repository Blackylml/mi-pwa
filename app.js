if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(err => {
                console.log('Fallo en el registro del Service Worker:', err);
            });
    });
}

let deferredPrompt;
const instalarBtn = document.getElementById('instalar-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    instalarBtn.style.display = 'block';

    instalarBtn.addEventListener('click', () => {
        instalarBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuario aceptó la instalación');
            } else {
                console.log('Usuario rechazó la instalación');
            }
            deferredPrompt = null;
        });
    });
});

// Ocultar el botón si la PWA ya está instalada
window.addEventListener('appinstalled', () => {
    console.log('PWA instalada');
    instalarBtn.style.display = 'none';
});
