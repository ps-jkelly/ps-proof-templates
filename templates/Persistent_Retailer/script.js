// =========
// VARIABLES
// =========
const widgetID = "62b5ff35fe35a600195fa0f9";
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


// ================================
// MAKE CHANGES TO PRICESPIDER DATA
// ================================
(function () {
    const psConfig = PriceSpider.widgetConfigs[widgetID];

    psConfig.on("data", async (widget) => {
        await createOnlineSellers();
        changeOnlineSellerImgs();
        disableStockUpdate();
        console.log("PriceSpider Data:", PriceSpider.widgets[0].data);
    });

    // FUNCTIONS
    // Try duplicating onlineSellers in the PriceSpider object and then pushing them to the array.
    const createOnlineSellers = () => {
        const sellers = PriceSpider.widgets[0].data.onlineSellers;
        for (i = sellers.length; i < 4; i++) {
            sellers.push(sellers[0]);
        }
    }

    const changeOnlineSellerImgs = () => {
        onlineSellerImgs.forEach((image, index) => {
            console.log(image, index)
            PriceSpider.widgets[0].data.onlineSellers[index].seller.imageUrl = image;
        });
    };

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
    if (isProductSelector) {
        isBubbleSelector ?
            createBubbleSelectors() :
            createDropdownSelectors();
    };
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

const createBubbleSelectors = () => {
    const selectorDiv = document.getElementsByClassName("ps-product-selector")[0];
    bubbleSelectors.forEach((product, index) => {
        let div = selectorDiv.appendChild(document.createElement("div"));
        div.classList.add("bubbles");
        div.appendChild(document.createTextNode(bubbleSelectors[index]));
    });
};
