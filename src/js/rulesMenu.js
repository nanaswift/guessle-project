document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open-popupMenu').addEventListener('click', function() {
        document.getElementById('popupMenu').style.display = 'flex';

        // Adiciona o evento para fechar o popup
        document.querySelector('.close-buttonMenu').addEventListener('click', function() {
            document.getElementById('popupMenu').style.display = 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('playButton').addEventListener('click', function() {
        document.getElementById('containerMenu').style.display = 'none';
    })
})



    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('openMenu').addEventListener('click', function() {
            document.getElementById('containerMenu').style.display = 'flex';
        });
    });


