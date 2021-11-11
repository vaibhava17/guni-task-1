const cards = document.querySelectorAll('.card-btn');
const cardCover = document.querySelectorAll('.inner-card');
const content = document.querySelectorAll('.img-content');

cards.forEach(card => {
    card.addEventListener('click', function (e) {
        const id = e.currentTarget.dataset.id;
        if (id === '1') {
            content[0].style.display = 'none';
            cardCover[0].classList.remove("d-flex");
            cardCover[0].classList.add("hidden");
            content[1].style.display = 'block';
            cardCover[1].classList.add("d-flex");
            cardCover[1].classList.remove("hidden");
            content[2].style.display = 'none';
            cardCover[2].classList.add("d-flex");
            cardCover[2].classList.remove("hidden");
        } else if (id === '2') {
            content[0].style.display = 'none';
            cardCover[0].classList.add("d-flex");
            cardCover[0].classList.remove("hidden");
            content[1].style.display = 'none';
            cardCover[1].classList.remove("d-flex");
            cardCover[1].classList.add("hidden");
            content[2].style.display = 'block';
            cardCover[2].classList.add("d-flex");
            cardCover[2].classList.remove("hidden");
        } else {
            content[0].style.display = 'block';
            cardCover[0].classList.add("d-flex");
            cardCover[0].classList.remove("hidden");
            content[1].style.display = 'none';
            cardCover[1].classList.add("d-flex");
            cardCover[1].classList.remove("hidden");
            content[2].style.display = 'none';
            cardCover[2].classList.remove("d-flex");
            cardCover[2].classList.add("hidden");
        }

    });
});