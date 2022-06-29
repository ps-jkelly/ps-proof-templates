// =========
// VARIABLES
// =========
const widgetID = "61c0a3400b9fd9001be2cc80";
const prodName = "Product Name";
const prodImgUrl = "https://www.neudesic.com/wp-content/uploads/priceSpider.jpg";
const formattedPrice = "$0.00";
const price = 0.00;
const isProductSelector = true;
const isBubbleSelector = false;
const dropdownSelectors = [
    { "label": null, "value": null },
    { "label": null, "value": null },
    { "label": null, "value": null}
];
const bubbleSelectors = [];
const onlineSellerImgs = []; 
const localSellerImgs = [];


// ================================
// MAKE CHANGES TO PRICESPIDER DATA
// ================================
(function () {
    // Change the widgetID to match the widget you're working on.
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", function (widget) {
        changeProductName(widget);
        changeProductImage(widget);
        changeOnlineSellerImgs(widget);
        changeLocalSellerImgs(widget);
        changeStockStatus(widget);
        changePrice(widget);
        disableStockUpdate(widget);
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    // FUNCTIONS
    const changeProductName = () => {
        PriceSpider.widgets[0].data.product.title = prodName;
    };

    const changeProductImage = () => {
        PriceSpider.widgets[0].data.product.imageUrl = prodImgUrl;
    };

    const changeOnlineSellerImgs = () => {
        onlineSellerImgs.forEach((image, index) => {
            PriceSpider.widgets[0].data.onlineSellers[index].seller.imageUrl = image;
        });
    };

    const changeLocalSellerImgs = () => {
        localSellerImgs.forEach((image, index) => {
            PriceSpider.widgets[0].data.localSellers[index].seller.imageUrl = image;
        });
    };

    const changeStockStatus = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller, index) => {
            if (index === 2) {
                seller.status.outOfStock = true;
                seller.stockStatus = 0;
            } else {
                seller.status.inStock = true;
                seller.stockStatus = 1;
            };
        });
    };

    const changePrice = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller) => {
            seller.price = price;
            seller.formattedPrice = formattedPrice;
        });
    };

    const disableStockUpdate = () => {
        PriceSpider.widgets[0].data.localSellers.forEach((seller) => {
            seller.stockUpdatable = false;
        });
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller) => {
            seller.stockUpdatable = false;
        });
    };
})();


// ============================================
// MAKE CHANGES TO THE DOM AFTER LIGHTBOX LOADS
// ============================================
const wtbButton = document.getElementsByClassName("ps-widget")[0];
wtbButton.addEventListener("click", () => {
    window.setTimeout(() => {
        if (isProductSelector) {
            isBubbleSelector ?
                createBubbleSelectors() :
                createDropdownSelectors();
        }
        localSellerImgs.length && changeLocalSellerImgs();
        onlineSellerImgs.length && changeOnlineSellerImgs();
    }, 1000);
    
});

// FUNCTIONS
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
        }
    });
};

const createBubbleSelectors = () => {
    const selectorDiv = document.getElementsByClassName("ps-product-selector")[0];
    bubbleSelectors.forEach((product, index) => {
        let div = selectorDiv.appendChild(document.createElement("div"));
        div.classList.add("bubbles");
        div.appendChild(document.createTextNode(bubbleSelectors[index]));
    })
}

// const changeLocalSellerImgs = () => {
//     const localSellers = document.querySelectorAll(".ps-logo", ".ps-local-seller-button");
//     localSellers.forEach((seller, index) => seller.src = localSellerImgs[index]);
// };
