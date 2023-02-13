// function for loading data from api
const loadData = async (brandName, dataLimit) => {
    toggleSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brandName}`);
    const data = await res.json();
    displayphones(data.data, dataLimit);
}

// function for showing all phones on ui
const displayphones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // No phone found message
    const noDataMsg = document.getElementById('no-data-msg');
    if(phones.length === 0) {
        noDataMsg.classList.remove('d-none');
    }
    else {
        noDataMsg.classList.add('d-none');
    }
    // Showall button and slicing array 
    const showAll = document.getElementById('show-all-btn');
    if(dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card p-3">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')" data-bs-toggle="modal" data-bs-target="#modal">Show Details</button>
              </div>
            </div>
        `
        phoneContainer.appendChild(div);
    })
    toggleSpinner(false);
}

// search button event handler
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
})

// searchField event handler
document.getElementById('search-field').addEventListener('keydown', function(event) {
    const key = event.key;
    if(key === 'Enter'){
        processSearch(10);
    }
})

// function for toggling spinner
const toggleSpinner = isLoading => {
    const spinnerField = document.getElementById('spinner');
    if(isLoading) {
        spinnerField.classList.remove('d-none');
    }
    else {
        spinnerField.classList.add('d-none')
    }
}

// common function
const processSearch = dataLimit => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadData(searchValue, dataLimit);
}

// showAll button event handler
document.getElementById('show-all-btn').addEventListener('click', function(){
    processSearch();
})

// function for loading details data from api
const loadDetails = async (phoneId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    const data = await res.json();
    displayDetails(data.data);
}

// function for showing details on ui
const displayDetails = details => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = `
    <img src="${details.image}"/>
    <h3>${details.name}</h3>
    <p>${details.releaseDate}</p>
    <p>${details.mainFeatures.chipSet}</p>
    <p>${details.mainFeatures.storage}</p>
    <p>${details.mainFeatures.memory}</p>
    <p>${details.mainFeatures.displaySize}</p>
    <p>${details.mainFeatures.sensors}</p>
    <p>${details.mainFeatures.sensors}</p>
    `
}