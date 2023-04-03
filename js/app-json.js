console.log('Into Words  🚀')

document.addEventListener('DOMContentLoaded', () => {
    const randomId = getRandomInt(1, 200);
    fetchDataJSON(randomId);
})

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const fetchDataJSON = async (randomId) => {
    try {
        const myInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        };
        let myRequest = new Request("./json/cards.json", myInit); 
        await fetch(myRequest)
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            const carta = data.find(card => card.id === randomId);
            
            pintarCard(carta)
        })
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = (data) => {
    const flex = document.querySelector('.flex');
    const template = document.querySelector('#template-card').content;
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    /* CARD COVER */
    clone.querySelector('.card-cover-header').setAttribute('src', data.back);
    clone.querySelector('.card-cover-body-img').setAttribute('src', data.img);
    clone.querySelector('.card-cover-body-img').setAttribute('style', `background-image: url(${data.back})`);
    clone.querySelector('.card-cover-body-category').textContent = `${data.category} (${data.id})`;
    clone.querySelector('.card-cover-body-question').innerHTML = `${data.question}`;
    /*clone.querySelector('.card-cover-footer-button').setAttribute('style', `background-image: url(${data.back})`);*/

    /* CARD BACKCOVER */
    clone.querySelector('.card-backcover-image').setAttribute('src', './img/cards/card-backcover.jpg');

    fragment.appendChild(clone);
    flex.appendChild(fragment)
}
