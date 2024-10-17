document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open-popup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'flex';

        // Adiciona o evento para fechar o popup
        document.querySelector('.close-button').addEventListener('click', function() {
            document.getElementById('popup').style.display = 'none';
        });
    });
});
