// home page
const name = document.getElementById("name");
const email = document.getElementById("email");
const textarea = document.getElementById("textarea");
const btnSend = document.getElementById("btn-send");
const form = document.getElementById("send-form");
// end of var validator

// start side list var
const btnList = document.querySelector(".btn-list"); // font awesome list drop
const ul = document.getElementById("nav-menu");
const xBtn = document.getElementById("x");

// side list 
btnList.onclick = () => {
    // if (ul.classList.contains("ul-hidden")) {
    // ul.classList.remove("ul-hidden");
    ul.style.right = "0px";
    xBtn.classList.remove("hidden");
    // }
};

xBtn.onclick = () => {
    // ul.classList.add("ul-hidden");
    ul.style.right = "-300px";
    xBtn.classList.add("hidden");
};

// start form var
if (form != null) {
    form.onsubmit = (e) => {
        if (name.value.length == 0) {
            name.style.border = "1px solid red";
            e.preventDefault();
        }

        if (email.value.length == 0) {
            email.style.border = "1px solid red";
            e.preventDefault();
        }

        if (textarea.value.length == 0) {
            textarea.style.border = "1px solid red";
            e.preventDefault();
        }

    }

    name.onkeyup = () => {
        if (name.value.length == 0) {
            name.style.border = "1px solid red";
        } else {
            name.style.border = "1px solid #878585";
        }
    }

    email.onkeyup = () => {
        if (email.value.length == 0) {
            email.style.border = "1px solid red";
        } else {
            email.style.border = "1px solid #878585";
        }

    }


    textarea.onkeyup = () => {
        if (textarea.value.length == 0) {
            textarea.style.border = "1px solid red";
        } else {
            textarea.style.border = "1px solid #878585";
        }

    }
}
// end of form validator


// order page

// filter var
let whiteBtn = document.getElementById("white");
let pinkBtn = document.getElementById("pink");
let redBtn = document.getElementById("red");
let allBtn = document.getElementById("all");

let white = document.querySelectorAll(".white-card");
let pink = document.querySelectorAll(".pink-card");
let red = document.querySelectorAll(".red-card");

// filter start
if (pinkBtn && redBtn && whiteBtn && allBtn) {
    pinkBtn.onclick = () => {
        pink.forEach((e) => {
            e.classList.remove("hidden");
        });
        white.forEach((e) => {
            e.classList.add("hidden");
        });
        red.forEach((e) => {
            e.classList.add("hidden");
        });
    }

    whiteBtn.onclick = () => {
        pink.forEach((e) => {
            e.classList.add("hidden");
        });
        white.forEach((e) => {
            e.classList.remove("hidden");
        });
        red.forEach((e) => {
            e.classList.add("hidden");
        });
    }

    redBtn.onclick = () => {
        pink.forEach((e) => {
            e.classList.add("hidden");
        });
        white.forEach((e) => {
            e.classList.add("hidden");
        });
        red.forEach((e) => {
            e.classList.remove("hidden");
        });

    }
    allBtn.onclick = () => {
        pink.forEach((e) => {
            e.classList.remove("hidden");
        });
        white.forEach((e) => {
            e.classList.remove("hidden");
        });
        red.forEach((e) => {
            e.classList.remove("hidden");
        });
    }
}
// filter end


// cart code
let counter = document.querySelectorAll(".counter");  // array of cart font awesome
let count = 0;
let span = document.querySelector(".count");  // number of products


if (span) {
    count = localStorage.getItem("cartCount") || 0;
    span.innerHTML = count;
}

counter.forEach((e) => {
    e.onclick = () => {
        span.innerHTML = ++count;
        localStorage.setItem("cartCount", count);

        let card = e.closest(".card");
        let item = {
            name: card.dataset.name,
            price: card.dataset.price,
            img: card.querySelector("img").src
        };

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(item);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };
});

// cart page

function removeItem(index) {   // remove fun
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartItems.splice(index, 1);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    localStorage.setItem("cartCount", cartItems.length);

    location.reload();
}


let emptyCart = document.getElementById("empty");
let container = document.getElementById("cart-container");  // wrapper div المعمول عليه display grid
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
if (container) {

    if (cartItems.length === 0) {
        emptyCart.classList.remove("hidden");
    } else if (cartItems.length > 0) {
        emptyCart.classList.add("hidden");

        cartItems.forEach((e, index) => {
            container.innerHTML += `
              <div class="card bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-[0_0_10px_#e4098d] flex flex-col items-center justify-center gap-10 pb-5 w-[60%] mx-auto md:w-full pink-card relative"
               ">
               <button onclick="removeItem(${index})" class="absolute top-2 right-2 bg-[#e4098d] text-white rounded-full w-6 h-6  cursor-pointer">
               <i class="fa fa-trash"></i>
            </button>
                <img src="${e.img}" alt="" class="w-[100%] h-[100%] object-cover  ">
                <div class="flex items-center gap-5 justify-between w-[80%]">
                    <strong class="text-center text-[#e4098d] text-md">$${e.price}</strong>
                     <p class="text-center text-[#e4098d] text-md">${e.name}</p>          
                </div>
            </div>
        `;
        });
    }
}


