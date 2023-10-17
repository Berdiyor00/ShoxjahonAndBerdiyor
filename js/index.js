let bod = document.getElementById('card');
let countriesData;

fetch('https://restcountries.com/v3.1/all')
    .then((prom) => prom.json())
    .then(res => {
        countriesData = res;
        sortCountriesAZ();
    });

function sortCountriesAZ() {
    const sortedCountries = countriesData.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return nameA.localeCompare(nameB);
    });

    displayCountries(sortedCountries);
}

function sortCountriesZA() {
    const sortedCountries = countriesData.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return nameB.localeCompare(nameA);
    });

    displayCountries(sortedCountries);
}

const sortAZBtn = document.createElement('button');
sortAZBtn.textContent = 'Sort A-Z';
sortAZBtn.addEventListener('click', () => {
    sortCountriesAZ();
    saveToLocalStorage('az');
});

const sortZABtn = document.createElement('button');
sortZABtn.textContent = 'Sort Z-A';
sortZABtn.addEventListener('click', () => {
    sortCountriesZA();
    saveToLocalStorage('za');
});

const buttonsContainer = document.getElementById('buttonsContainer');
buttonsContainer.appendChild(sortAZBtn);
buttonsContainer.appendChild(sortZABtn);

function displayCountries(countries) {
    bod.innerHTML = '';
    countries.forEach(element => {
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
}

function saveToLocalStorage(sortOrder) {
    localStorage.setItem('sortOrder', sortOrder);
}

function getFromLocalStorage() {
    return localStorage.getItem('sortOrder');
}

window.addEventListener('load', () => {
    const savedSortOrder = getFromLocalStorage();
    if (savedSortOrder === 'za') {
        sortCountriesZA();
    } else {
        sortCountriesAZ();
    }
});
// ... (avvalgi kodlar)

const lowToHighBtn = document.createElement('button');
lowToHighBtn.textContent = 'Sort by Low Population';
lowToHighBtn.addEventListener('click', () => {
    sortCountriesLowToHigh();
    saveToLocalStorage('lowToHigh');
});

const highToLowBtn = document.createElement('button');
highToLowBtn.textContent = 'Sort by High Population';
highToLowBtn.addEventListener('click', () => {
    sortCountriesHighToLow();
    saveToLocalStorage('highToLow');
});

buttonsContainer.appendChild(lowToHighBtn);
buttonsContainer.appendChild(highToLowBtn);

// ... (qolgan kodlar)

function sortCountriesLowToHigh() {
    const sortedCountries = countriesData.sort((a, b) => {
        return a.population - b.population;
    });

    displayCountries(sortedCountries);
}

function sortCountriesHighToLow() {
    const sortedCountries = countriesData.sort((a, b) => {
        return b.population - a.population;
    });

    displayCountries(sortedCountries);
}

window.addEventListener('load', () => {
    const savedSortOrder = getFromLocalStorage();
    if (savedSortOrder === 'za') {
        sortCountriesZA();
    } else if (savedSortOrder === 'lowToHigh') {
        sortCountriesLowToHigh();
    } else if (savedSortOrder === 'highToLow') {
        sortCountriesHighToLow();
    } else {
        sortCountriesAZ();
    }
});