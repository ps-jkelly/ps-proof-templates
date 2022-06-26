# PriceSpider Proofing Templates

## Index:
- [PDP Lightbox](https://github.com/ps-jkelly/ps-proof-templates/tree/main/ProductLightbox)
- [Troubleshooting](troubleshooting)

---

## Intructions for use:

### Copy to your computer
1. Clone the repository to your computer.
2. In your client's folder on your computer, create a folder called *proof-productLightbox* (Or whatever type of WTB you're building).
3. Copy over the *script.js* and *override.js* files into that folder from the correct template. (at the moment, there is only the ProductLightbox template)

### The script.js file
4. Open the *script.js* file and edit the variable to include the assets you want to appear on the screen. 
    - Change the **widgetID** to match the widget you're working on.
    - Change **prodName** and **prodImgUrl** to match a product of your choice.
    - The variables **price** and **formattedPrice** change the price displayed for online retailers.
    - If you're using product selectors, set **isProductSelector** to **true**. If you plan to use bubble selectors, set **isBubbleSelector** to **true**. Change the values of the **dropdownSelectors/bubbleSelectors** to whatever you want to display.
    - Change the array values for **onlineSellerImgs** and **localSellerImgs** to be the URLs for the retailers you wish to display. Or you can make these arrays empty and the default sellers will appear. For online, the default sellers are Amazon, Walmart, and Target. For local, the default sellers will be whatever our crawler picked up for the test sku that you input into the widget.

    ![](images/scriptVariables.png)

### The override.css file
5. Since the product selectors are not generated by Timberlake, they need to be styled in the *override.css* file. Changing the **--dark-text** variable will effect the color of the text and border of the product selectors. Feel free to make any other changes you deem necessary for your proof.

    ![](images/cssVariables.png)

6. If you do not wish to display "stock status" or "price" then this is where you do it. Simply un-comment the code at the bottom of the file.
    ![](images/disableOptions.png)