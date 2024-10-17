function copyURL() {
    const texto = document.getElementById("testURL");
    texto.select();
    texto.setSelectionRange(0, 99999); // Para dispositivos móveis

    try {
        const success = document.execCommand("copy");
        if (success) {
            showMessage("Link copied!", "linkCopied")
        } 
    } catch (err) {
        showMessage("Error!", "linkError")
    }
}

const showMessage = (text, elementId) => {
    const messageElement = document.getElementById(elementId);
    const messageTxt = messageElement.querySelector(".messageTxt p");

    messageTxt.textContent = text; // Atualiza o texto
    messageElement.style.display = "flex"; // Torna o container visível
    messageElement.classList.add("show"); // Adiciona a classe 'show'

    // Define um timeout para a animação de desaparecer após 5 segundos
    setTimeout(() => {
        messageElement.classList.remove("show"); // Remove a classe 'show'

        // Atraso para ocultar o elemento após a animação
        setTimeout(() => {
            messageElement.style.display = "none"; // Esconde o container
        }, 900); // Tempo deve ser igual ao da animação
    }, 1500); // 5000 ms = 5 segundos
};