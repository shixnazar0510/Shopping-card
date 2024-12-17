let cards = [

    {
        id: 1,
        name: 'Apple BYZ S852I',
        img: `./img/img(9).png`,
        price: '300$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },
    {
        id: 2,
        name: 'Apple BYZ S852I',
        img: `./img/img(16).png`,
        price: '400$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },
    {
        id: 3,
        name: 'Apple BYZ S852I',
        img: `./img/img(14).png`,
        price: '200$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },
    {
        id: 4,
        name: 'Apple BYZ S852I',
        img: `./img/img(11).png`,
        price: '300$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },
    {
        id: 5,
        name: 'Apple BYZ S852I',
        img: `./img/img(17).png`,
        price: '100$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },
    {
        id: 6,
        name: 'Apple BYZ S852I',
        img: `./img/img(11).png`,
        price: '200$',
        icon: `<i class='bx bxs-heart'></i>`,
        btn: 'Buyurtma berish'
    },

]

let wrap = document.getElementById('wrap');
let list_product = document.querySelector('.list_praduct');
let iconCount = document.querySelector('.icon span');
let totalPriceElem = document.querySelector('.total_price');
let orderCount = 0; // Buyurtmalar soni
let totalPrice = 0; // Umumiy narx

// Mahsulotlarni HTML ga qo'shish funksiyasi
const addProductsToHtml = () => {
    cards.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('product_card');
        div.dataset.id = item.id;
        div.innerHTML = `
            <img class="mx-auto " src="${item.img}" alt="">
            <p class="mt-2">${item.name}</p>
            <span class="absolute text-[25px] top-2 left-2">${item.icon}</span>
            <div class="price text-white font-bold">${item.price}</div>
            <button class="addCard border py-1 px-2 rounded-2xl bg-black text-white">${item.btn}</button>
        `;
        wrap.append(div);
    });
};

addProductsToHtml(); // Mahsulotlarni qo'shish

// Buyurtma berish tugmasi uchun event listener
wrap.addEventListener('click', (event) => {
    if (event.target.classList.contains('addCard')) {
        const productCard = event.target.closest('.product_card');
        const productId = productCard.dataset.id;

        // Mahsulotni shopping bo'limiga qo'shish
        const productName = productCard.querySelector('p.mt-2').innerText;
        const productPrice = parseFloat(cards.find(item => item.id == productId).price.replace('$', '')); // Narxni raqamga aylantirish

        // Shopping bo'limiga mahsulot qo'shish
        const listItem = document.createElement('div');
        listItem.classList.add('shopping_item');
        listItem.dataset.id = productId;
        listItem.innerHTML = `
            <div class="item border-b grid text-center items-center">
                <div>
                    <img src="${productCard.querySelector('img').src}" alt="${productName}" class="w-[50px]">
                </div>
                <div class="text-white font-bold">
                    ${productName}
                </div>
                <div class="price text-white font-bold">
                    ${productPrice}$
                </div>
                <div>
                    <span class="increase w-[25px] font-bold h-[25px] rounded inline-block bg-white text-black">+</span>
                    <span class="quantity text-white font-bold">1</span>
                    <span class="decrease w-[25px] font-bold h-[25px] rounded inline-block bg-white text-black">-</span>
                </div>
            </div>
        `;
        list_product.append(listItem);

        // Buyurtmalar sonini yangilash
        orderCount++;
        totalPrice += productPrice;
        iconCount.innerText = orderCount;
        totalPriceElem.innerText = `Price: ${totalPrice}$ Pay`;
    }
});

// Shopping bo'limidagi buyurtma sonini oshirish va kamaytirish
list_product.addEventListener('click', (event) => {
    const listItem = event.target.closest('.shopping_item');
    if (!listItem) return;

    const productId = listItem.dataset.id;
    const productPrice = parseFloat(cards.find(item => item.id == productId).price.replace('$', '')); // Narxni raqamga aylantirish
    const quantityElem = listItem.querySelector('.quantity');
    let quantity = parseInt(quantityElem.innerText);

    if (event.target.classList.contains('increase')) {
        quantity++;
        quantityElem.innerText = quantity;
        totalPrice += productPrice;
    } else if (event.target.classList.contains('decrease')) {
        if (quantity > 1) {
            quantity--;
            quantityElem.innerText = quantity;
            totalPrice -= productPrice;
        } else {
            // Mahsulotni o'chirish
            listItem.remove();
            orderCount--;
            totalPrice -= productPrice;
        }
    }

    // Umumiy narxni yangilash
    iconCount.innerText = orderCount;
    totalPriceElem.innerText = `Price: ${totalPrice}$ Pay`;
});

let icon = document.querySelector('.icon span');
let close = document.querySelector('.close');
let shopping = document.querySelector('.shopping');

// Eslatma: mavjudligini tekshirish
if (icon) {
    icon.addEventListener('click', () => {
        shopping.classList.toggle('inset');
    });
}

if (close) {
    close.addEventListener('click', () => {
        shopping.classList.toggle('inset');
    });
}