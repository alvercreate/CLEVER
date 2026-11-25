fetch("./data/photos.json")
  .then(response => response.json())
  .then(data => {
    // Выводим все карточки
    document.querySelector("#node_for_insert").innerHTML = data
      .map((product, index) => `
        <div class="product-card">
          <div class="product-image-wrapper">
            <img src="${product.img}" alt="${product.title}" class="product-image">
          </div>
          
          <div class="product-info">
            <p class="product-type">Название типа продукта</p>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-desc">${product.description}</p>
            
            <input type="hidden" name="vendor_code_${index}" value="${product.vendor_code}">
            
            <div class="product-action">
              <div class="product-cart-icon">
                <img src="images/test.png" alt="Корзина" style="width: 40px; height: 40px; object-fit: contain;">
                <span class="product-action-text">Добавить<br>в корзину:</span>
              </div>
              
              <div class="product-counter">
                <!-- ИЗМЕНЕНО: value="0" и min="0" -->
                <input class="product-count-input" type="number" name="quantity_${index}" value="0" min="0" max="99" readonly>
                
                <!-- Кнопки управления -->
                <div class="product-count-arrows">
                  <button type="button" class="arrow-btn arrow-up" onclick="changeQuantity(this, 1)">▲</button>
                  <button type="button" class="arrow-btn arrow-down" onclick="changeQuantity(this, -1)">▼</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      `)
      .join("");
  })
  .catch(error => console.error("Не удалось загрузить каталог товаров:", error));

// Функция для изменения количества
function changeQuantity(button, delta) {
    // Находим ближайший инпут с числом
    const input = button.closest('.product-counter').querySelector('.product-count-input');
    let currentValue = parseInt(input.value);
    let newValue = currentValue + delta;
    
    // ИЗМЕНЕНО: теперь проверяем от 0 до 99
    if (newValue >= 0 && newValue <= 99) {
        input.value = newValue;
    }
}