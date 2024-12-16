document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartTable = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');
  const saveFavouritesButton = document.getElementById('save-favourites');
  const applyFavouritesButton = document.getElementById('apply-favourites');
  const buyNowButton = document.getElementById('buy-now');


  function addToCart(itemName, price, quantity) {
      if (quantity <= 0) {
          alert('Please enter a valid quantity.');
          return;
      }

      let existingRow = null;
      const cartRows = cartTable.querySelectorAll('tr');

      // Check if the item already exists in the cart
      cartRows.forEach(row => {
          if (row.cells[0].textContent === itemName) {
              existingRow = row; // Store the row if the item exists
          }
      });

      if (existingRow) {
          // If item exists, update the quantity and total price
          const existingQuantityCell = existingRow.cells[1];
          const existingTotalPriceCell = existingRow.cells[3];
          const existingQuantity = parseInt(existingQuantityCell.textContent);
          const newQuantity = existingQuantity + quantity;

          // Update quantity and total price
          existingQuantityCell.textContent = newQuantity;
          const itemTotalPrice = price * newQuantity;
          existingTotalPriceCell.textContent = 'Rs.' + itemTotalPrice.toFixed(2);
      } else {
          // If item doesn't exist, create a new row
          const row = document.createElement('tr');

          // Add cells to the row
          const itemNameCell = document.createElement('td');
          itemNameCell.textContent = itemName;
          row.appendChild(itemNameCell);

          const quantityCell = document.createElement('td');
          quantityCell.textContent = quantity;
          row.appendChild(quantityCell);

          const priceCell = document.createElement('td');
          priceCell.textContent = 'Rs.' + price.toFixed(2);
          row.appendChild(priceCell);

          const totalPriceCell = document.createElement('td');
          const itemTotalPrice = price * quantity;
          totalPriceCell.textContent = 'Rs.' + itemTotalPrice.toFixed(2);
          row.appendChild(totalPriceCell);

          // Add the row to the cart table
          cartTable.appendChild(row);
      }

      // Update the total price
      updateTotalPrice();
  }

  // Update total price calculation
  function updateTotalPrice() {
      let total = 0;
      const cartRows = document.querySelectorAll('#cart-items tr');
      cartRows.forEach(row => {
          const itemTotalPrice = parseFloat(
              row.cells[3].textContent.replace('Rs.', '')
          );
          total += itemTotalPrice;
      });
      totalPriceElement.textContent = 'Total Price: Rs.' + total.toFixed(2);
  }

  // Save favourites to localStorage
  saveFavouritesButton.addEventListener('click', () => {
      const favourites = [];
      const cartRows = cartTable.querySelectorAll('tr');
      cartRows.forEach(row => {
          const itemName = row.cells[0].textContent;
          const quantity = parseInt(row.cells[1].textContent);
          const price = parseFloat(row.cells[2].textContent.replace('Rs.', ''));
          favourites.push({ itemName, price, quantity });
      });
      localStorage.setItem('favourites', JSON.stringify(favourites));
      alert('Favourites saved!');
  });

  // Apply favourites
  applyFavouritesButton.addEventListener("click", function () {
      const savedFavourites = JSON.parse(localStorage.getItem("favourites"));
      if (!savedFavourites || savedFavourites.length === 0) {
          alert("No favourites saved yet!");
          return;
      }

      savedFavourites.forEach(item => {
          addToCart(item.itemName, item.price, item.quantity);
      });

      alert('Favourites applied!');
  });


  // Add event listeners to the "Add to Cart" buttons
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const itemName = button.dataset.name;
          const price = parseFloat(button.dataset.price);
          const quantityInput = document.getElementById(itemName.toLowerCase());
          const quantity = parseInt(quantityInput.value) || 0;

          addToCart(itemName, price, quantity);
      });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
      // Get the Buy Now button
      const buyNowButton = document.getElementById('buy-now');
      
      // Add event listener for Buy Now button
      buyNowButton.addEventListener('click', function() {
          // Redirect to another page (e.g., payment.html)
          window.location.href = 'payment.html'; // Replace with the actual page you want to redirect to
      });
  });    
  
  buyNowButton.addEventListener('click', () => {
      const cartRows = cartTable.querySelectorAll('tr:not(:first-child)'); // Exclude header row
  
      if (cartRows.length === 0) {
        alert('Your cart is empty! Add items before purchasing.');
        return;
      }
  
      const totalPrice = parseFloat(totalPriceElement.textContent.replace('Total Price: Rs.', '').trim());
      const confirmPurchase = confirm(`Your total is Rs.${totalPrice.toFixed(2)}. Do you want to proceed with the purchase?`);
  
      if (confirmPurchase) {
        // Update the URL to your actual payment page here
        window.location.href = 'payout.html';
      } else {
        alert('Purchase canceled.');
      }
    });
});
