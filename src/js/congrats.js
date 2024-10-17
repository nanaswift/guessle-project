document.addEventListener("DOMContentLoaded", () => {
    const popupCongrats = document.getElementById("popupCongrats");
    const closeButtonCongrats = popupCongrats.querySelector(".close-button");
    
    if (closeButtonCongrats) {
        closeButtonCongrats.addEventListener("click", () => {
            popupCongrats.style.display = "none"; // Fecha o popup de vitória
        });
    }

    // Adicione a lógica para o popup de derrota
    const popupDefeat = document.getElementById("popupDefeat");
    const closeButtonDefeat = popupDefeat.querySelector(".close-button");

    if (closeButtonDefeat) {
        closeButtonDefeat.addEventListener("click", () => {
            popupDefeat.style.display = "none"; // Fecha o popup de derrota
        });
    }
});
