// =========
// VARIABLES
// =========
const widgetID = "62b5ff35fe35a600195fa0f9";
const productName = "Product Name";
const productImgUrl = "https://www.neudesic.com/wp-content/uploads/priceSpider.jpg";
const formattedPrice = "$0.00";
const price = 0.00;
const isProductSelector = true;
const isBubbleSelector = false;
const dropdownSelectors = [
    { "label": null, "value": null },
    { "label": null, "value": null }
];
const bubbleSelectors = [];
const onlineSellerImgs = []; 


// ================================
// MAKE CHANGES TO PRICESPIDER DATA
// ================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", (widget) => {
        createOnlineSellers();
        disableStockUpdate();
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    // FUNCTIONS
    const createOnlineSellers = () => {
        const sellers = PriceSpider.widgets[0].data.onlineSellers;
        let newSeller = sellers[0];
        newSeller.price = price;
        for (i = sellers.length; i < 4; i++) {
            sellers.push(newSeller);
        }
    }

    const disableStockUpdate = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller) => {
            seller.stockUpdatable = false;
        });
    };
})();



// =======================
// MAKE CHANGES TO THE DOM
// =======================
window.setTimeout(() => {
    createDropdownSelectors();
    changeOnlineSellerImgs();
}, 2000);

const createDropdownSelectors = () => {
    const selectorDiv = document.getElementsByClassName("ps-product-selector")[0];
    dropdownSelectors.forEach((product) => {
        if (product.value) {
            let label = document.createElement("label");
            label.appendChild(document.createTextNode(product.label));
            let select = document.createElement("select");
            select.classList.add("ps-sku-selector");
            let option = document.createElement("option");
            option.appendChild(document.createTextNode(product.value));

            let div = selectorDiv.appendChild(document.createElement("div"));
            product.label && div.appendChild(label);
            let dropdown = div.appendChild(select);
            dropdown.appendChild(option);
        };
    });
};

const changeOnlineSellerImgs = () => {
    const onlineSellers = document.querySelectorAll("li.ps-online-seller > div > div > div > img");
    onlineSellerImgs.forEach((image, index) => onlineSellers[index].src = image);
};
