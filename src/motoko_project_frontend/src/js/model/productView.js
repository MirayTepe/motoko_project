export const ProductView = {
    showMessage(message) {
      alert(message); 
    },
    renderProducts(products) {
      const productContainer = document.getElementById("productContainer");
      productContainer.innerHTML = "";
      products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>Fiyat: ${product.price}</p>
          <p>Açıklama: ${product.description}</p>
          <p>Stokta: ${product.inStock ? "Var" : "Yok"}</p>
        `;
        productContainer.appendChild(productElement);
      });
    }
  };
  