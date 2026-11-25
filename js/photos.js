// Загружаем данные о товарах из файла photos.json.
fetch("./data/photos.json")
  // Преобразуем полученный ответ сервера из JSON в JavaScript-массив.
  .then(response => response.json())
  // После загрузки данных создаём HTML-карточки товаров.
  .then(data => {
    // Находим список на странице photos.html, в который нужно добавить товары.
    document.querySelector("#node_for_insert").innerHTML = data
      .map(product => `
        <li style="width: 210px" class="d-flex flex-column m-1 p-1 border bg-body">
          <img style="width: 180px" class="align-self-center mb-2" src="${product.img}" alt="${product.title}">
          <div class="card-bottom"> 
          <h6 class="card-subtitle">${product.title}</h6>
          <p class="card-text text-muted" style="font-size: 1em;">${product.description}</p>
            <input type="hidden" name="vendor_code" value="${product.vendor_code}">
            <p class="card-text mb-0">Ваша оценка
              <input class="w-25" type="number" name="оценка" value="0" min="0" max="10">
            </p>
          </div>
        </li>
      `)
      .join("");
  })
  .catch(error => console.error("Не удалось загрузить каталог товаров:", error));