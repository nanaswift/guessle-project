document.addEventListener("DOMContentLoaded", () => {
    //    const word = ["SHEEP", "ARENA", "PITCH", "BROWN", "FUNNY", "LARGE", "CRUEL", "FAINT", "PAUSE", "SWING", "FLUSH", "BRICK", "QUEST", "SLUMP", "TRAIT", "ROUGH", "ALBUM", "HOVER", "COURT", "DRESS", "CHIEF", "FRUIT", "SOLVE", "PLEAD", "RADIO", "ERROR", "PATCH", "MOVIE", "SMALL", "FRAUD", "SHOCK", "SPARE", "COLOR", "GIANT", "PLANT", "CHAOS", "MAJOR", "MOUTH", "RELAX", "SHIFT", "WRECK", "ANGLE", "SHAPE", "FIRST", "WOMAN", "AWARD", "STEEL", "WHEAT", "START", "FEAST"];
    //    const wordToGuess = word[Math.floor(Math.random() * 49)];
    const wordToGuess = "ARENA"
    let currentRow = 0;
    let currentTile = 0;
    const maxAttempts = 6;
    let gameOver = false;

    const handleKeyboardInput = (letter) => {
        if (currentTile < 5 && currentRow < maxAttempts && !gameOver) {
            const tile = document.querySelector(`.rowGrid${currentRow + 1} .tile:nth-child(${currentTile + 1})`);
            tile.textContent = letter;
            currentTile++;
        }
    };

    const handleEnter = async () => {
        if (!gameOver) {
            if (currentTile < 5) { // Se o jogador não preencheu todas as letras
                showMessage("Not enough letters", "notEnoughLetters");
            }


            if (currentTile === 5 && !gameOver) {
                const guess = Array.from(document.querySelectorAll(`.rowGrid${currentRow + 1} .tile`))
                    .map(tile => tile.textContent)
                    .join('');

                if (await validateWord(guess)) {
                    evaluateGuess(guess);
                    currentRow++;
                    currentTile = 0; // Reseta para o próximo row

                    if (guess === wordToGuess) {
                        
                        if (currentRow === 1) {
                            showMessage("Genius.", "1try")
                        } else if (currentRow === 2) {
                            showMessage("Magnificent.", "2try")
                        } else if (currentRow === 3) {
                            showMessage("Impressive.", "3try")
                        } else if (currentRow === 4) {
                            showMessage("Splendid.", "4try")
                        } else if (currentRow === 5) {
                            showMessage("Great.", "5try")
                        } else if (currentRow === 6) {
                            showMessage("Phew.", "6try")
                        }

                        updateCongratsPopup(); // Atualiza a palavra a ser exibida
                        document.querySelector("#popupCongrats").style.display = "flex"; // Exibe a popup de vitória
                        gameOver = true;
                    } else if (currentRow === maxAttempts) {
                        showMessage(":(", "7try")
                        updateLossPopup(); // Atualiza a mensagem de derrota
                        document.querySelector("#popupDefeat").style.display = "flex"; // Exibe a popup de derrota
                        gameOver = true;
                    }
                } else {
                    showMessage("Not in word list", "notInWordList"); // Mostra a mensagem quando a palavra não está na lista
                }
            }
        }
    };

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
        }, 2500); // 5000 ms = 5 segundos
    };

    const updateCongratsPopup = () => {
        const wordElement = document.querySelector("#wordToGuessCongrats");
        if (wordElement) {
            wordElement.textContent = wordToGuess; // Atualiza o conteúdo com a palavra correta
        }
    };

    const updateLossPopup = () => {
        const wordElement = document.querySelector("#wordToGuessDefeat");
        if (wordElement) {
            wordElement.textContent = wordToGuess; // Atualiza o conteúdo com a palavra correta
        }
    };

    const handleDelete = () => {
        if (currentTile > 0) {
            currentTile--;
            const tile = document.querySelector(`.rowGrid${currentRow + 1} .tile:nth-child(${currentTile + 1})`);
            tile.textContent = ''; // Limpa o tile
        }
    };

    const validateWord = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data) && data.length > 0; // Verifica se a palavra existe
        } catch (error) {
            console.error("Erro ao validar a palavra:", error);
            return false; // Retorna falso em caso de erro
        }
    };

    const evaluateGuess = (guess) => {
        const correctTiles = [];
        const wrongTiles = [];
        const guessLetters = guess.split('');
        const wordToGuessArray = wordToGuess.split('');

        // Cria um mapa para contar a frequência das letras na palavra final
        const letterFrequency = {};
        wordToGuessArray.forEach(letter => {
            if (letterFrequency[letter]) {
                letterFrequency[letter]++;
            } else {
                letterFrequency[letter] = 1;
            }
        });

        // Verifica letras corretas na posição correta (verde)
        guessLetters.forEach((letter, index) => {
            if (letter === wordToGuessArray[index]) {
                correctTiles.push(index);
                letterFrequency[letter]--; // Diminui a contagem da letra
            }
        });

        // Verifica letras que estão na palavra, mas na posição errada (amarelo)
        guessLetters.forEach((letter, index) => {
            if (!correctTiles.includes(index)) {
                // Verifica se a letra está na palavra e ainda há ocorrências disponíveis
                if (letterFrequency[letter] > 0) {
                    wrongTiles.push(index);
                    letterFrequency[letter]--; // Diminui a contagem da letra
                }
            }
        });

        // Atualiza os tiles com base na avaliação
        guessLetters.forEach((letter, index) => {
            const tile = document.querySelector(`.rowGrid${currentRow + 1} .tile:nth-child(${index + 1})`);
            if (correctTiles.includes(index)) {
                tile.classList.add('correct'); // Verde
            } else if (wrongTiles.includes(index)) {
                tile.classList.add('other'); // Amarelo
            } else {
                tile.classList.add('wrong'); // Cinza
            }
        });

        // Atualiza o teclado com base na tentativa
        updateKeyboard(guessLetters, correctTiles, wrongTiles);
    };

    const updateKeyboard = (guessLetters, correctTiles, wrongTiles) => {
        // Mapa para garantir que só marque uma letra como errada se não houver mais ocorrências
        const letterStatus = {};
    
        // Primeiro, percorra as letras corretas e atualize o teclado
        correctTiles.forEach(index => {
            const letter = guessLetters[index];
            const button = Array.from(document.querySelectorAll('.keyboard button')).find(btn => btn.textContent === letter);
    
            if (button) {
                button.classList.remove('other'); // Remove amarelo, se houver
                button.classList.add('correct');  // Marca como verde
            }
            
            letterStatus[letter] = 'correct'; // Atualiza o status como 'correto'
        });
    
        // Depois, percorra as letras erradas (amarelo)
        wrongTiles.forEach(index => {
            const letter = guessLetters[index];
            const button = Array.from(document.querySelectorAll('.keyboard button')).find(btn => btn.textContent === letter);
    
            if (button && !letterStatus[letter]) {
                button.classList.add('other'); // Marca como amarelo
                letterStatus[letter] = 'other'; // Atualiza o status como 'outra'
            }
        });
    
        // Finalmente, atualize as letras que não estão na palavra (cinza)
        guessLetters.forEach(letter => {
            const button = Array.from(document.querySelectorAll('.keyboard button')).find(btn => btn.textContent === letter);
    
            if (button && !letterStatus[letter]) {
                button.classList.add('wrong'); // Marca como cinza
            }
        });
    };

    // Manipula eventos do teclado
    document.querySelectorAll('.keyboard button').forEach(button => {
        button.addEventListener('click', () => {
            const key = button.textContent;

            button.blur();

            if (key === 'ENTER') {
                handleEnter();
            } else if (key === '⌫') {
                handleDelete();
            } else if (/^[A-Z]$/.test(key)) { // Permite apenas letras A-Z
                handleKeyboardInput(key);
            }
        });
    });

    // Manipula entradas do teclado físico
    document.addEventListener('keydown', (event) => {
        const key = event.key.toUpperCase();

        if (key === 'ENTER') {
            handleEnter();
        } else if (key === 'BACKSPACE') {
            handleDelete();
        } else if (/^[A-Z]$/.test(key)) { // Permite apenas letras A-Z
            handleKeyboardInput(key);
        }
    });
});