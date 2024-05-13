document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector("#menu-bars");
  let navbar = document.querySelector(".navbar");

  menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  };

  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header .navbar a");

  window.addEventListener("scroll", () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");

    sections.forEach((sec) => {
      let top = window.scrollY;
      let height = sec.offsetHeight;
      let offset = sec.offsetTop - 150;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
        });
        document
          .querySelector('header .navbar a[href="#' + id + '"]')
          .classList.add("active");
      }
    });
  });

  let swiper = new Swiper(".inicio-slider", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
  });

  fetch("productos.json")
    .then((response) => response.json())
    .then((data) => {
      const contenedorProductos = document.querySelector(".box-container");

      data.forEach((producto) => {
        let productoHTML = `
              <div class="box">
                  <img src="${producto.image}" alt="${producto.name}">
                  <h3>${producto.name}</h3>
                  <div class="stars">
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star-half-alt"></i>
                  </div>
                  <span>${producto.price}</span>
                  <button class="btn-add-cart btn">Añadir al carrito</button>
              </div>
          `;

        contenedorProductos.innerHTML += productoHTML;
      });
    })
    .catch((error) => console.error("Error al cargar los productos:", error));

  const btnCart = document.querySelector(".container-cart-icon");
  const containerCartProducts = document.querySelector(
    ".container-cart-products"
  );

  btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart");
  });

  const cartInfo = document.querySelector(".cart-product");
  const rowProduct = document.querySelector(".row-product");

  const productsList = document.querySelector(".box-container");

  let allProducts = [];

  const valorTotal = document.querySelector(".total-pagar");

  const countProducts = document.querySelector("#contador-productos");

  const cartEmpty = document.querySelector(".cart-empty");
  const cartTotal = document.querySelector(".cart-total");

  productsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
      const product = e.target.parentElement;

      const infoProduct = {
        quantity: 1,
        title: product.querySelector("h3").textContent,
        price: product.querySelector("span").textContent,
      };

      const exits = allProducts.some(
        (product) => product.title === infoProduct.title
      );

      if (exits) {
        const products = allProducts.map((product) => {
          if (product.title === infoProduct.title) {
            product.quantity++;
            return product;
          } else {
            return product;
          }
        });
        allProducts = products;
      } else {
        allProducts.push(infoProduct);
      }

      showHTML();
      Swal.fire({
        title: "Agregaste un producto al carrito",
        icon: "success",
      });
    }
  });

  rowProduct.addEventListener("click", (e) => {
    if (e.target.classList.contains("icon-close")) {
      const product = e.target.parentElement;
      const title = product.querySelector(
        ".titulo-producto-carrito"
      ).textContent;

      allProducts = allProducts.filter((product) => product.title !== title);
    }
    console.log(allProducts);
    showHTML();
  });

  const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(allProducts));
  };

  // Función para cargar el contenido del carrito desde el localStorage
  const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      allProducts = JSON.parse(carritoGuardado);
      showHTML(); // Actualiza la interfaz con los productos del carrito
    }
  };

  // Llama a la función para cargar el carrito al cargar la página
  window.addEventListener("DOMContentLoaded", () => {
    cargarCarritoDesdeLocalStorage();
  });

  const showHTML = () => {
    if (!allProducts.length) {
      cartEmpty.classList.remove("hidden");
      rowProduct.classList.add("hidden");
      cartTotal.classList.add("hidden");
    } else {
      cartEmpty.classList.add("hidden");
      rowProduct.classList.remove("hidden");
      cartTotal.classList.remove("hidden");
    }

    rowProduct.innerHTML = "";

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-product");

      containerProduct.innerHTML = `
        <div class="info-cart-product">
          <span class="cantidad-producto-carrito">${product.quantity}</span>
          <p class="titulo-producto-carrito">${product.title}</p>
          <span class="precio-producto-carrito">$${product.price}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon-close"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>    
      `;

      rowProduct.appendChild(containerProduct);

      total = total + parseInt(product.quantity * product.price.slice(1));
      totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;

    countProducts.innerText = totalOfProducts;

    guardarCarritoEnLocalStorage();
  };

  let searchBtn = document.querySelector(".search-btn");
  let closeBtn = document.querySelector(".close-btn");
  let searchBox = document.querySelector(".search-box");

  searchBtn.onclick = function () {
    searchBox.classList.add("active");
    closeBtn.classList.add("active");
    searchBtn.classList.add("active");
  };

  closeBtn.onclick = function () {
    searchBox.classList.remove("active");
    closeBtn.classList.remove("active");
    searchBtn.classList.remove("active");
  };

  function searchProducts(keyword) {
    const contenedorProductos = document.querySelector(".box-container");
    contenedorProductos.innerHTML = "";

    fetch("productos.json")
      .then((response) => response.json())
      .then((data) => {
        const productosFiltrados = data.filter((producto) => {
          return producto.name.toLowerCase().includes(keyword.toLowerCase());
        });

        productosFiltrados.forEach((producto) => {
          let productoHTML = `
                  <div class="box">
                      <img src="${producto.image}" alt="${producto.name}">
                      <h3>${producto.name}</h3>
                      <div class="stars">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                      </div>
                      <span>${producto.price}</span>
                      <button class="btn-add-cart btn">Añadir al carrito</button>
                  </div>
              `;
          contenedorProductos.innerHTML += productoHTML;
        });
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }

  document
    .querySelector(".search-box input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const keyword = e.target.value.trim();
        searchProducts(keyword);
      }
    });
});
