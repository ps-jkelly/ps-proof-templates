// =========
// VARIABLES
// =========
const widgetID = "61c0a3400b9fd9001be2cc80";
const prodName = "Barrel Reserve Sloe Gin";
const prodImgUrl = "https://assets.website-files.com/6064c9373e07d699e439019e/6078f77d217967f0c96f6ef5_Untitled%20design%20(2).png";
const formattedPrice = "$42.99";
const price = 42.99;
const isProductSelector = true;
const isBubbleSelector = false;
const dropdownSelectors = [
    { "label": "Bottle", "value": "Barrel Reserve Sloe Gin" },
    { "label": "Quantity", "value": "1 Bottle" },
    { "label": null, "value": null}
];
const bubbleSelectors = ["1 Bottle", "6-pack", "12-pack"];
const onlineSellerImgs = [
    "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG",
    "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG",
    "http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG"
]; 
const localSellerImgs = [
    "https://heartofcodes.com/wp-content/uploads/2018/09/Walmart-Logo-PNG-Transparent.png",
    "https://heartofcodes.com/wp-content/uploads/2018/09/Walmart-Logo-PNG-Transparent.png"
];


// ================================
// MAKE CHANGES TO PRICESPIDER DATA
// ================================
(function () {
    // Change the widgetID to match the widget you're working on.
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", function (widget) {
        changeProductName(widget);
        changeProductImage(widget);
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

    const changeStockStatus = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller, index) => {
            if (index < 2) {
                seller.status.inStock = true;
                seller.stockStatus = 1;
            } else {
                seller.status.outOfStock = true;
                seller.stockStatus = 0;
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

const changeLocalSellerImgs = () => {
    const localSellers = document.querySelectorAll(".ps-logo", ".ps-local-seller-button");
    localSellers.forEach((seller, index) => seller.src = localSellerImgs[index]);
};

const changeOnlineSellerImgs = () => {
    const onlineSellers = document.querySelectorAll(".ps-online-seller-details-wrapper > div > img");
    const lastSeller = document.querySelector(".ps-last-online-seller-details-wrapper > div > img");
    onlineSellers.forEach((seller, index) => seller.src = onlineSellerImgs[index]);
    lastSeller.src = onlineSellerImgs[onlineSellerImgs.length-1];
};