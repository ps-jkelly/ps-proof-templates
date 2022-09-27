// =========
// VARIABLES
// =========
const widgetID = "61c0a3400b9fd9001be2cc80";
const productName = "Product Name";
const ProductImgUrl = "https://www.neudesic.com/wp-content/uploads/priceSpider.jpg";
const price = 0.00;
const hasReviews = false;
const hasProductSelectors = false;
const useBubbleSelectors = false;
const dropdownSelectors = [
    { "label": null, "value": null },
    { "label": null, "value": null }
];
const bubbleSelectors = []; // Array of strings
const onlineSellerImgs = []; // Array of URL strings
const localSellerImgs = []; // Array of URL strings


// ==================================
// MAKE CHANGES TO PRICESPIDER WIDGET
// ==================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", function (widget) {
        onlineSellerImgs.length && createOnlineSellers();
        hasReviews && addOnlineReviews();
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
        PriceSpider.widgets[0].data.product.imageUrl = ProductImgUrl;
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
            seller.status.inStock = true;
            seller.status.outOfStock = false;
            seller.stockStatus = 1;
            seller.status.stock = "In Stock";
        });
    };

    const changePrice = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller) => {
            seller.price = price;
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

    const addOnlineReviews = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller) => {
            seller.reviews = {
                count: Math.floor(Math.random() * (150 - 30) + 30),
                ratio: Math.random() * (1.0 - 0.7) + 0.7
            }
        })
    }

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
        localSellerImgs.forEach((image, index) => localSellers[index].src = image);
    };
    
    const changeOnlineSellerImgs = () => {
        const onlineSellers = document.querySelectorAll(".ps-online-seller-details-wrapper > div > img, .ps-last-online-seller-details-wrapper > div > img");
        onlineSellerImgs.forEach((image, index) => onlineSellers[index].src = image)
    };
})();
