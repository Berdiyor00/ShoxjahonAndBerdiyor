let bod = document.getElementById('card');
fetch('https://restcountries.com/v3.1/all')
    .then((prom) => prom.json())
    .then(res => {
        console.log(res)
        res.forEach(element => {
            let box = document.createElement('div');
            box.classList.add('box');
            box.innerHTML = `
                <div class="card" style="width: 18rem;">
                    <img src="${element.flags.png}" class="card-img-top" alt="${element.flags.common}">
                    <div class="card-body">
                        <p class="card-text">Davlat nomi: ${element.name.common}</p>
                        <p class="card-title">Poytaxti: ${element.capital}</p>
                        <p>Axolisi: ${element.population}</p>
                    </div>
                </div>
            `;
            bod.appendChild(box);

        });
    });

let background = document.getElementById('darkmodes');
let body = document.querySelector('body');
let isDarkMode = false;

background.addEventListener('click', () => {
    if (isDarkMode) {
        body.style.backgroundColor = 'white';
        isDarkMode = false;
        body.style.color = 'black';
    } else {
        body.style.backgroundColor = 'black';
        body.style.color = 'white';
        isDarkMode = true;
    }
});

const searchForm = document.querySelector('#search');
searchForm.addEventListener('input', () => {
    const searchValue = searchForm.value.toLowerCase().trim();
    const cardItems = document.querySelectorAll('.card-text');
    cardItems.forEach(cardItems => {
        const countryName = cardItems.textContent.toLowerCase().trim();
        const card = cardItems.parentElement.parentElement.parentElement;
        if (countryName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
})