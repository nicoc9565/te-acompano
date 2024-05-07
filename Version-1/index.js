const productContainer = document.querySelector("#product-container");

// TARJETA DE PRODUCTOS

const mostrarProductos = () => {
  productos.forEach((element) => {
    crearCard(element);
  });
};

const crearCard = (element) => {
  const productCard = document.createElement("article");
  productCard.setAttribute("class", "product-card");

  productCard.innerHTML = `<div>
                                <img class="prod-img" src="${element?.img}" alt="${element.name}">
                            </div>
                            <div class="prod-description">
                                <h5 class="artwork-name">${element?.artworkName}</h5>
                                <h5 class="author">${element?.author}</h5>
                                <h5 class="price">$${element?.price}</h5>
                            </div>`;

  productContainer.appendChild(productCard);
  agregarEventoACard(productCard, element);
};

const agregarEventoACard = (productCard, element) => {
  productCard.addEventListener("click", () => {
    previsualizarProducto(element);
  });
};

mostrarProductos();

class TiendaDeTe {
  constructor() {
    this.inventario = [];
  }

  guardarInventario() {
    localStorage.setItem("inventario", JSON.stringify(this.inventario));
  }

  cargarInventario() {
    const inventarioGuardado = localStorage.getItem("inventario");
    if (inventarioGuardado) {
      this.inventario = JSON.parse(inventarioGuardado);
      this.displayInventario();
    }
  }

  addItem(event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemCantidad = parseInt(
      document.getElementById("itemCantidad").value
    );
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);

    const newItem = {
      id: this.inventario.length + 1,
      name: itemName,
      cantidad: itemCantidad,
      price: itemPrice,
    };

    this.inventario.push(newItem);

    document.getElementById("addItemForm").reset();

    this.displayInventario();
    this.guardarInventario();
    console.log("Nuevo producto agregado:", newItem);
  }

  displayInventario() {
    const inventarioList = document.getElementById("inventarioList");
    inventarioList.innerHTML = "";

    this.inventario.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<input type="checkbox" class="itemCheckbox" value="${
        item.price
      }" data-cantidad="${item.cantidad}" data-id="${item.id}" /> ${
        item.name
      } - Cantidad: ${item.cantidad} - Precio: $${item.price.toFixed(
        2
      )} <button class="editBtn" data-id="${
        item.id
      }">Editar</button> <button class="deleteBtn" data-id="${
        item.id
      }">Eliminar</button>`;
      inventarioList.appendChild(listItem);
      console.log("Producto en inventario:", item);
    });

    this.attachEditListeners();
    this.attachDeleteListeners();
  }

  attachEditListeners() {
    const editButtons = document.querySelectorAll(".editBtn");
    editButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        const item = this.inventario.find(
          (item) => item.id === parseInt(itemId)
        );
        const newName = prompt(
          "Introduce el nuevo nombre del producto:",
          item.name
        );
        const newCantidad = parseInt(
          prompt("Introduce la nueva cantidad:", item.cantidad)
        );
        const newPrice = parseFloat(
          prompt("Introduce el nuevo precio:", item.price)
        );
        if (newName && !isNaN(newCantidad) && !isNaN(newPrice)) {
          item.name = newName;
          item.cantidad = newCantidad;
          item.price = newPrice;
          this.displayInventario();
        } else {
          alert("Por favor, introduce valores válidos.");
        }
      });
    });
  }

  attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemId = button.getAttribute("data-id");
        const itemIndex = this.inventario.findIndex(
          (item) => item.id === parseInt(itemId)
        );
        if (itemIndex !== -1) {
          this.inventario.splice(itemIndex, 1);
          this.displayInventario();
        }
      });
    });
  }

  filteredInventario(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredInventario = this.inventario.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    this.displayFilteredInventario(filteredInventario);
  }

  displayFilteredInventario(filteredInventario) {
    const inventarioList = document.getElementById("inventarioList");
    inventarioList.innerHTML = "";

    filteredInventario.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <input type="checkbox" class="itemCheckbox" value="${
            item.price
          }" data-cantidad="${item.cantidad}" data-id="${item.id}" /> 
          ${item.name} - Cantidad: ${
        item.cantidad
      } - Precio: $${item.price.toFixed(2)}
          <button class="editBtn" data-id="${item.id}">Editar</button> 
          <button class="deleteBtn" data-id="${item.id}">Eliminar</button>`;
      inventarioList.appendChild(listItem);
      console.log("Producto filtrado:", item);
    });

    this.attachEditListeners();
    this.attachDeleteListeners();
  }

  calcularTotal() {
    const checkboxes = document.getElementsByClassName("itemCheckbox");
    let totalIndividual = 0;
    let totalStock = 0;

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        const price = parseFloat(checkboxes[i].value);
        const cantidad = parseInt(checkboxes[i].getAttribute("data-cantidad"));
        totalIndividual += price;
        totalStock += price * cantidad;
      }
    }

    document.getElementById("totalIndi").textContent =
      totalIndividual.toFixed(2);
    document.getElementById("totalStock").textContent = totalStock.toFixed(2);
    console.log(`Total Individual: $${totalIndividual.toFixed(2)}`);
    console.log(`Total Stock: $${totalStock.toFixed(2)}`);
  }

  iniciar() {
    this.cargarInventario();
    document
      .getElementById("addItemForm")
      .addEventListener("submit", this.addItem.bind(this));
    document
      .getElementById("searchInput")
      .addEventListener("input", this.filteredInventario.bind(this));
    document
      .getElementById("calcularTotal")
      .addEventListener("click", this.calcularTotal.bind(this));
  }
}

const tienda = new TiendaDeTe();
tienda.iniciar();
