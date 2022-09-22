// =========
// VARIABLES
// =========
const widgetID = "61c0a3a06330b100273377f4";
const prodName = "Product Name";
const prodImgUrl = "https://www.neudesic.com/wp-content/uploads/priceSpider.jpg";
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


// ==================================
// MAKE CHANGES TO PRICESPIDER WIDGET
// ==================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", function (widget) {
        onlineSellerImgs.length && changeOnlineSellerImgs();
        localSellerImgs.length && changeLocalSellerImgs();
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    psConfig.on("update", function (widget) {
        onlineSellerImgs.length && changeOnlineSellerImgs();
        localSellerImgs.length && changeLocalSellerImgs();
        if (PriceSpider.widgets[0].data.product.valid) {
            changeProductName();
            changeProductImage();
            changePrice();
            changeStockStatus();
            disableStockUpdate();
        }
    });

    // FUNCTIONS
    const changeProductName = () => {
        PriceSpider.widgets[0].data.product.title = prodName;
    };

    const changeProductImage = () => {
        PriceSpider.widgets[0].data.product.imageUrl = prodImgUrl;
    };

    const changeOnlineSellerImgs = async () => {
        const onlineSellers = document.querySelectorAll("div[data-online-store] > div > div > div > img, div.ps-online-seller > div > div > div > img, li.ps-online-seller > div > div > div > img");
        await createOnlineSellers();
        onlineSellerImgs.forEach((image, index) => {
            if (index < onlineSellers.length) {
                onlineSellers[index].src = image;
            }
        });
    };

    const createOnlineSellers = () => {
        const sellers = PriceSpider.widgets[0].data.onlineSellers;
        while (sellers.length < onlineSellerImgs.length) {
            let newSeller = sellers[0];
            sellers.push(newSeller);
        }
    }

    const changeStockStatus = () => {
        PriceSpider.widgets[0].data.onlineSellers.forEach((seller, index) => {
            seller.status.outOfStock = false;
            seller.status.inStock = true;
            seller.status.stock = "In Stock";
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
    
    const changeLocalSellerImgs = () => {
        const localSellers = document.querySelectorAll(".ps-logo", ".ps-local-seller-button");
        localSellerImgs.forEach((image, index) => localSellers[index].src = image);
    };
})();
