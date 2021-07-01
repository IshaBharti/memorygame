let boxes = document.querySelectorAll(".box");
let timeParaEL = document.querySelector(".time p");
let time = 0;
let min = 0;
let sec = 0;
let flips = 0;

function win() {
    let matched = document.querySelectorAll(".matched");
    if (matched.length == 12) {
        swal({
            title: "Congratulations!",
            text: ` You won you took ${min} min : ${sec} sec to complete the game.`,
            icon: "success",
            button: "Play Again!"

        }).then(function() {
            window.location = "/Day_10/index.html";
        });;
    }
}

function shuffle() {
    boxes.forEach((box) => {
        let ran = Math.floor(Math.random() * 10);
        box.style.order = ran;
    });
}

shuffle();

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.classList.contains("flip") && flips < 2) {
            box.classList.add("flip");
            flips++;
        }
        if (flips == 2) {
            let flipped_cards = document.querySelectorAll(".flip");
            setTimeout(() => {
                flips = 0;
                var s1 = flipped_cards[0].childNodes[3].src;
                var s2 = flipped_cards[1].childNodes[3].src;
                if (s1 == s2) {
                    flipped_cards.forEach((box) => {
                        box.classList.add("matched");
                        win();
                    });
                }
                flipped_cards.forEach((box) => box.classList.remove("flip"));
            }, 1000);
        }
    });
});

setInterval(() => {
    time++;
    min = Math.floor(time / 60);
    sec = time % 60;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    timeParaEL.innerHTML = `${min}:${sec}`;
}, 1000);