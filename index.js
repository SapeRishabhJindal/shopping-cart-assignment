
// To fetch categories data from API
fetch('http://localhost:5000/categories')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        createCategorySection(data);
    })
    .catch(function (error) {
        console.log(error);
    });

// To fetch banners data from API
fetch('http://localhost:5000/banners')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        createBannersSection(data);
    })
    .catch(function (error) {
        console.log(error);
    });

// Function for rendering the Category Section
function createCategorySection(data) {
    data.forEach((element, index) => {
        let cateMarkup = '';
        if (index % 2 === 0) {
            cateMarkup = ` 
                <div class="row box-shadow flex-container category-container">
                    <div class="width-30">
                        <img src=".${element.imageUrl}" alt="${element.name}" class="category-img">
                    </div>
                    <div class="width-70">
                        <h2>${element.name}</h2>
                        <p>${element.description}</p>
                        <a class="btn-main" href="products.html" onclick="ExploreClick()" id="${element.id}">Explore ${element.key}</a>
                    </div>
                </div>`;
        } else {
            cateMarkup = `
                <div class="row box-shadow flex-container category-container ">
                    <div class="width-70">
                        <h2>${element.name}</h2>
                        <p>${element.description}</p>
                        <a class="btn-main" href="products.html" onclick="ExploreClick()" id="${element.id}">Explore ${element.key}</a>
                    </div>
                    <div class="width-30">
                        <img src=".${element.imageUrl}" alt="${element.name}" class="category-img">
                    </div>
                </div>`;
        }
        document.querySelector('.section__category').insertAdjacentHTML('beforeend', cateMarkup);
    });
}

// Function for rendering the Banner Section
function createBannersSection(data) {
    data.forEach((element, index) => {
        const bannerMarkup = `<div><img src=".${element.bannerImageUrl}" alt="${element.bannerImageAlt}" /></div>`;
        document.querySelector('.glider-track').insertAdjacentHTML('beforeend', bannerMarkup);
    });
}

// Function to set key in local storage on clicking of Explore
function ExploreClick() {
    localStorage.setItem("exploreProduct", event.target.id);
}

