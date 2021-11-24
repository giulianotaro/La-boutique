function setCartProductsNum() {
  cartProductsNum.textContent = `Numero prodotti: ${cartList.length}`;
}

function createProduct(parent, imgUrl, productTitle, textPrice, idProduct) {
  const product = document.createElement("div");
  product.className = "product";
  product.setAttribute("id", idProduct);

  createImg(product, imgUrl, productTitle);
  createText(product, productTitle, textPrice);
  parent.appendChild(product);

  product.addEventListener("click", (e) => {
    cartList.push(
      productsList.find(
        (product) => parseInt(e.currentTarget.id) === product.id
      )
    );

    setCartProductsNum();

    const modal = document.querySelector(".modal");

    modal.style.display = "flex";

    setTimeout(() => {
      modal.style.display = "none";
    }, 2000);

    

    // Nel caso in cui volessimo aggiungere una interazione col LocalStorage
    localStorage.setItem("totCartitems", cartList.length);
  });
}

function createImg(parent, imgUrl, productTitle) {
  const image = document.createElement("img");
  image.src = imgUrl;
  image.alt = productTitle;

  parent.appendChild(image);
}

function createText(parent, productTitle, textPrice) {
  const title = document.createElement("h4");
  title.textContent = productTitle;

  const price = document.createElement("strong");
  price.textContent = `${textPrice} $`;

  parent.append(title, price);
}

function renderProducts(listItems) {
  listItems.map((product) => {
    createProduct(
      wrapperProducts,
      product.image,
      product.title,
      product.price,
      product.id
    );
  });
}

// Async await
const getProductsList = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  productsList = data;

  // Nella eventualità di aggiungere una quantità per prodotto
  // productsList = data.map((product) => {
  //   product.quantity = 0;
  //   return product;
  // });

  return renderProducts(data);
};

let productsList = [];
const wrapperProducts = document.querySelector(".wrapper__products");

// Parte inerente alla logica del carrello
let cartList = [];

let localStorageTot = localStorage.getItem("totCartitems");
const cartBtn = document.querySelector(".cartBtn");
const cartProductsNum = document.querySelector(".cartProductsNum");
const clearCartBtn = document.querySelector(".clearCart");

if (localStorageTot === null) {
  localStorageTot = 0;
}

// Flusso generale
cartProductsNum.textContent = `Numero prodotti: ${localStorageTot}`;
getProductsList();

clearCartBtn.addEventListener("click", () => {
  cartList.length = [0];
  setCartProductsNum();
});

const imgs = [
  "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1551488831-68b4d0c92c13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
];

const slider = document.querySelector(".overlay");

let imagesIndex = 0;

let changeImg = setInterval(() => {
  slider.style.backgroundImage = `url(${imgs[imagesIndex]})`;

  if (imagesIndex < imgs.length - 1) {
    imagesIndex++;
  } else {
    imagesIndex = 0;
  }
}, 3000);

/* const acceptBtn = document.querySelector("#btn-accept"); */

/* acceptBtn.addEventListener("click", hideModal, { once: true }); */

/* ${cartList.length} */
