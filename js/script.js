const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)

}

const displayPhones = (phones, dataLimit) => {

    const phoneContainer = document.getElementById('Phone-container');
    phoneContainer.innerText = '';
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')

    } else {
        showAll.classList.add('d-none')
    };


    const noPhone = document.getElementById('no-phone-found');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }


    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone.slug)
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Go somewhere</button>

          
        </div>
      </div>
        
        
        
        
        `;
        phoneContainer.appendChild(phoneDiv);


    });
    toggleSpinner(false);
}


document.getElementById('btn-search').addEventListener("click", function () {

    processSearch(10);
});

document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})


const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhones(searchText, dataLimit)

}


const toggleSpinner = isLoading => {
    const loadingSection = document.getElementById('loader');
    if (isLoading) {
        loadingSection.classList.remove('d-none')
    } else {
        loadingSection.classList.add('d-none')
    }
};


document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();

});

const loadPhoneDetails = async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

};

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const modalImg = document.getElementById('modal-img');
    modalImg.innerHTML = `
    <img class="rounded mx-auto d-block" src ="${phone.image}">
    
    
    `;
}




loadPhones('apple');