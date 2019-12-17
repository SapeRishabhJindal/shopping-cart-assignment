var ProductsData = undefined; // Global variable to store the Products data recieved from API
var CategoryData = undefined; // Global variable to store the Category data recieved from API
var exploreProducts = localStorage.getItem("exploreProduct");

// To fetch categories data from API
fetch('http://localhost:5000/categories')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        createSideNavSection(data);
        CategoryData = data;
    })
    .catch(function (error) {
        console.log(error);
    });

// To fetch products data from API
fetch('http://localhost:5000/products')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
        createProductsSection(data);
        ProductsData = data;
        if (exploreProducts !== this.undefined && exploreProducts !== null && exploreProducts !== '' && exploreProducts.length !== 0) {
            filterProducts(exploreProducts);
            exploreProducts = null;
            localStorage.removeItem("exploreProduct");
        }
    })
    .catch(function (error) {
        console.log(error);
    });

// Function for rendering the Side Nav list
function createSideNavSection(data) {
    data.forEach((element) => {
        const cateMarkup = `<li id="${element.id}">${element.name}</li>`;
        document.querySelector('.side-nav ul').insertAdjacentHTML('beforeend', cateMarkup);
    });
}

// Function for rendering the Products
function createProductsSection(data) {
    document.querySelector('.product-container').innerHTML = '';
    data.forEach((element, index) => {
        const productMarkup = `
        <div class="product-card">
            <h3>${element.name}</h3>
            <img src=".${element.imageURL}">
            <div class="product-description">
                <p>${element.description}</p>
            </div>
            <div class="flex-container ">
                <div class="product-price">
                    <p>MRP Rs.${element.price}</p>
                </div>
                <div class="product-buy-now"><button class="btn-main">Buy Now</button></div>
            </div>
        </div>
        `;
        document.querySelector('.product-container').insertAdjacentHTML('beforeend', productMarkup);
    });
}

// click event of the side nav to perform filter.
document.querySelector('.side-nav ul').addEventListener('click', function () {
    console.log('', event.target.id);
    const id = event.target.id.toString();
    filterProducts(id);
})

// Function to perform the actual filter on the products
function filterProducts(id) {
    const newProdData = [];
    ProductsData.forEach((elem) => {
        if (id === elem.category) {
            newProdData.push(elem);
        }
    });
    createProductsSection(newProdData);
}
