document.addEventListener("DOMContentLoaded", function () {

  let productos = [
    {
      nombre: 'Producto 1',
      imagen: './img/imagen/sin fondo/blendit_morado.png',
      precio: '$15.99'
    },
    {
      nombre: 'Producto 2',
      imagen: './img/imagen/sin fondo/blendit_rosa.png',
      precio: '$16.99'
    },
    {
      nombre: 'Producto 2',
      imagen: './img/imagen/sin fondo/blendit_rosa.png',
      precio: '$16.99'
    },
    {
      nombre: 'Producto 2',
      imagen: './img/imagen/sin fondo/blendit_rosa.png',
      precio: '$16.99'
    },

  ];
  
  let contenedorProductos = document.querySelector('.box-container');

  productos.forEach((producto) => {

    let box = document.createElement('div');
    box.classList.add('box');

    let img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    let heartIcon = document.createElement('a');
    heartIcon.href = '#';
    heartIcon.classList.add('fas', 'fa-heart');

    let eyeIcon = document.createElement('a');
    eyeIcon.href = '#';
    eyeIcon.classList.add('fas', 'fa-eye');

    let nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    let stars = document.createElement('div');
    stars.classList.add('stars');
    for (let i = 0; i < 5; i++) {
      let star = document.createElement('i');
      star.classList.add('fas', 'fa-star');
      if (i === 4) {
        star.classList.add('fas', 'fa-star-half-alt');
      }
      stars.appendChild(star);
    }

    let precio = document.createElement('span');
    precio.textContent = producto.precio;

    let addToCartButton = document.createElement('a');
    addToCartButton.href = '#';
    addToCartButton.classList.add('btn');
    addToCartButton.textContent = 'agregar al carrito';


    box.appendChild(img);
    box.appendChild(heartIcon);
    box.appendChild(eyeIcon);
    box.appendChild(nombre);
    box.appendChild(stars);
    box.appendChild(precio);
    box.appendChild(addToCartButton);

    contenedorProductos.appendChild(box);
  });




  let menu = document.querySelector('#menu-bars');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
  }

  let sections = document.querySelectorAll('section');
  let navLinks = document.querySelectorAll('header .navbar a');

  window.addEventListener('scroll', () => {
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');

      sections.forEach(sec => {
          let top = window.scrollY;
          let height = sec.offsetHeight;
          let offset = sec.offsetTop - 150;
          let id = sec.getAttribute('id');

          if (top >= offset && top < offset + height) {
              navLinks.forEach(links => {
                  links.classList.remove('active');
              });
              document.querySelector('header .navbar a[href="#' + id + '"]').classList.add('active');
          }
      });
  });

  document.querySelector('#search-icon').onclick = () => {
      document.querySelector('#search-form').classList.toggle('active');
  }

  document.querySelector('#close').onclick = () => {
      document.querySelector('#search-form').classList.remove('active');
  }

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
});
