// =========
// VARIABLES
// =========
const widgetID = "61c0a3400b9fd9001be2cc80";
const prodName = "Product Name";
const prodImgUrl = "https://www.neudesic.com/wp-content/uploads/priceSpider.jpg";
const price = 0.00;
const hasProductSelectors = true;
const useBubbleSelectors = false;
const dropdownSelectors = []; // List of objects. Example: { "label": "Product", "value": "Honey Nut Cheerios" }
const bubbleSelectors = []; // List of strings
const onlineSellerImgs = []; // List of URL strings
const localSellerImgs = []; // List of URL strings


// ==================================
// MAKE CHANGES TO PRICESPIDER WIDGET
// ==================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    // Manipulate PS data
    psConfig.on("data", function (widget) {
        changeProductName();
        changeProductImage();
        changeOnlineSellerImgs();
        changeStockStatus();
        changePrice();
        disableStockUpdate();
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    // Manipulate the DOM
    psConfig.on("open", function (widget) {
        if (isProductSelector) {
            isBubbleSelector ?
                createBubbleSelectors() :
                createDropdownSelectors();
        };
        localSellerImgs.length && changeLocalSellerImgs();
        onlineSellerImgs.length && changeOnlineSellerImgs();
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
})();
