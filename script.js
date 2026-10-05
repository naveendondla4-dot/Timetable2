const tabs = document.querySelectorAll('.tab');
const sections = document.querySelectorAll('.section');

const hostelHeader = document.getElementById('hostelHeader');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    tab.classList.add('active');

    const target = document.getElementById(tab.dataset.target);
    target.classList.add('active');

    // Hide hostel details when Class Timetable is opened.
    if (hostelHeader) {
      hostelHeader.classList.toggle('hidden-on-timetable', tab.dataset.target === 'timetable');
    }

    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});


let deferredInstallPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  if (installBtn) installBtn.hidden = false;
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    installBtn.hidden = true;
  });
}

window.addEventListener("appinstalled", () => {
  if (installBtn) installBtn.hidden = true;
});
