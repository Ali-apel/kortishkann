document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    let timer;
    let score = 0;
    let countdown;
    let moleInterval;
    let gameOver = true;

    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole');
            hole.removeEventListener('click', handleMoleClick);
        });

        let random = holes[Math.floor(Math.random() * holes.length)];
        random.classList.add('mole');
        random.addEventListener('click', handleMoleClick);
    }

    function handleMoleClick() {
        if (!gameOver) {
            score++;
            scoreDisplay.textContent = `Ұпай: ${score}`;
            this.classList.add('hit');
            setTimeout(() => this.classList.remove('hit'), 200);
        }
        this.classList.remove('mole');
    }

    function resetGame() {
        clearInterval(countdown);
        clearInterval(moleInterval);
        holes.forEach(hole => hole.classList.remove('mole'));
        gameOver = true;
        score = 0;
        timer = 60;
        scoreDisplay.textContent = `Ұпай: ${score}`;
        timerDisplay.textContent = `Уақыт: ${timer}с`;
        startButton.disabled = false;
        endButton.disabled = true;
    }

    function startGame() {
        if (!gameOver) return;

        gameOver = false;
        score = 0;
        timer = 60;
        scoreDisplay.textContent = `Ұпай: ${score}`;
        timerDisplay.textContent = `Уақыт: ${timer}с`;

        startButton.disabled = true;
        endButton.disabled = false;

        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Уақыт: ${timer}с`;
            if (timer <= 0) {
                resetGame();
                alert(`Ойын аяқталды!\nСіздің соңғы ұпайыңыз: ${score}`);
            }
        }, 1000);

        moleInterval = setInterval(() => {
            if (!gameOver) comeout();
        }, 1000);
    }

    function endGame() {
        resetGame();
        alert(`Ойын тоқтатылды!\nСіздің соңғы ұпайыңыз: ${score}`);
    }

    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
