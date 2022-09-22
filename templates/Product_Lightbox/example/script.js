/** README
 * This template is designed to work with the following SKU in Timberlake: 00842640104126
 */

// =========
// VARIABLES
// =========
const widgetID = "61c0a3400b9fd9001be2cc80";
const productName = "Barrel Reserve Sloe Gin";
const productImgUrl = "https://assets.website-files.com/6064c9373e07d699e439019e/6078f77d217967f0c96f6ef5_Untitled%20design%20(2).png";
const price = 42.99;
const hasProductSelectors = true;
const useBubbleSelectors = false;
const country = "CA";
const dropdownSelectors = [
    { "label": "Type", "value": "Barrel Reserve Sloe Gin" },
    { "label": "Quantity", "value": "1 Bottle" },
    { "label": null, "value": null }
];
const bubbleSelectors = ["1 Bottle", "6-pack", "12-pack"];
const onlineSellerImgs = [
    "https://beveragedynamics.com/wp-content/uploads/2017/06/bevmo-logo.jpg",
    "https://www.walgreens.com/images/adaptive/si/1485908_WAG_Signature_logo_RGB_750x208.png"
];
const localSellerImgs = [
    "https://beveragedynamics.com/wp-content/uploads/2017/06/bevmo-logo.jpg",
    "https://www.walgreens.com/images/adaptive/si/1485908_WAG_Signature_logo_RGB_750x208.png"
];


// ================================
// MAKE CHANGES TO PRICESPIDER DATA
// ================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", function (widget) {
        onlineSellerImgs.length && createOnlineSellers();
        disableStockUpdate();
        changeProductName();
        changeProductImage();
        changeStockStatus();
        changePrice();
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    psConfig.on("open", function (widget) {
        window.setTimeout(() => {
            if (hasProductSelectors) useBubbleSelectors ? createBubbleSelectors() : createDropdownSelectors();
            localSellerImgs.length && changeLocalSellerImgs();
            onlineSellerImgs.length && changeOnlineSellerImgs();
        }, 1000);
    });

    // DATA FUNCTIONS
    const changeProductName = () => {
        PriceSpider.widgets[0].data.product.title = productName;
    };

    const changeProductImage = () => {
        PriceSpider.widgets[0].data.product.imageUrl = productImgUrl;
    };

    const createOnlineSellers = () => {
        const sellerArray = [];
        if (PriceSpider.widgets[0].data.onlineSellers.length) {
            const seller = PriceSpider.widgets[0].data.onlineSellers[0];
            while (sellerArray.length < onlineSellerImgs.length) {
                sellerArray.push(seller);
            };
        };
        PriceSpider.widgets[0].data.onlineSellers = sellerArray;
    };

    const changeStockStatus = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller, index) => {
            if (index === 2) {
                seller.status.outOfStock = true;
                seller.stockStatus = 0;
                seller.status.stock = "Out of Stock";
            } else {
                seller.status.inStock = true;
                seller.stockStatus = 1;
                seller.status.stock = "In Stock";
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

    // DOM FUNCTIONS
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
    
    const createBubbleSelectors = () => {
        const selectorDiv = document.getElementsByClassName("ps-product-selector")[0];
        bubbleSelectors.forEach((product, index) => {
            let div = selectorDiv.appendChild(document.createElement("div"));
            div.classList.add("bubbles");
            div.appendChild(document.createTextNode(bubbleSelectors[index]));
        });
    };

    const changeLocalSellerImgs = () => {
        const localSellers = document.querySelectorAll(".ps-logo", ".ps-local-seller-button");
        localSellers.forEach((seller, index) => seller.src = localSellerImgs[index]);
    };
    
    const changeOnlineSellerImgs = () => {
        const onlineSellers = document.querySelectorAll(".ps-online-seller-details-wrapper > div > img");
        const lastSeller = document.querySelector(".ps-last-online-seller-details-wrapper > div > img");
        onlineSellers.forEach((seller, index) => seller.src = onlineSellerImgs[index]);
        lastSeller.src = onlineSellerImgs[onlineSellerImgs.length - 1];
    };
})();
