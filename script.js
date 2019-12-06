
let hightlightedImage;

let productCatelog = {
  "man-jacket": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "man-shirt": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "wall-decor": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  "watch": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "woman-jacket": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "woman-kurti": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
};

//Load the available product catelog
// (function loadProductCatelog() {
//
//   $(".product-img").each( (index, image) => {
//     // Image is the DOM object. Converting into jQuery object by wrapping it in $().
//     const productName = $(image).attr("data-productName");
//     const productImagesPath = "images/" + productCatelog + "/";
//
//     for(let i = 0; i < 6; i++) {
//
//     }
//
//   });
//
// })();

// When any product item is clicked, we need to display that product in large scale.
$(".product-img").click(hightLightProduct);

$(".lightbox").click(handleLightBox);

// Lightbox effect
function hightLightProduct() {

  // Cleaning of last displayed image.
  $(".lightbox .big-image").remove();

  // To create the "LightBox effect".
  $(".lightbox").addClass("active");

  // Add the full scale image in this heighlighter
  hightlighted = $("<img>");
  hightlighted.addClass("big-image")
  hightlighted.attr("src", this.src);
  hightlighted.width("100%");

  $(".lightbox .lightbox-data").append(hightlighted);

  // Listen for mouse move event on the image for "Scroll Assist".
  $(".lightbox .big-image").mousemove(scrollImage);

  createThumbnails(this.dataset.productname);
}

// Handle click on the lightbox
function handleLightBox(e) {

  // If clicked on the image, instead of box, do not remove the lightbox.
  if (e.target !== e.currentTarget) return;

  $(".lightbox").removeClass("active");
}

// Scoll Assist
function scrollImage(e) {

  // Get the viewport height, and the image height
  const viewPortHeight = $(window).height();
  const imgHeight = this.height;

  // Get the scrollable image height
  const scrollableHeight = imgHeight - viewPortHeight;

  // How much percent down we're in the window wrt window height.
  const percentY = (e.clientY / viewPortHeight);

  // Scroll in proportion to the mouse position.
  // const scrollY = Math.round(this.scrollHeight * percentY);
  const scrollY = Math.round(scrollableHeight * percentY);

  // Scroll the lightbox
  $(".lightbox").scrollTop(scrollY);
}

// Small thumbnails on the highlighted image
function createThumbnails(productName) {

  const thumbnailPanel = $("<div>");
  thumbnailPanel.addClass("thumbnails-panel");

  $(".lightbox-data").append(thumbnailPanel);

  // Get the thumbnailImage names from the catelog
  const thumbnailImages = productCatelog[productName];
  thumbnailImages.forEach( (item) => {

    // Create a thumbnail image on the fly and add it in the thumbnail panel.
    const image = $("<img>");
    image.attr("src", "images/" + productName + "/" + item);
    image.addClass("thumbnails");
    thumbnailPanel.append(image);

    // Hook click function to chnage the big image when the thumbnail is clicked.
    image.click( (e) => {
      // If we use "this", it returns window object. Using e.target returns the correct element.
      $(".big-image").attr("src", e.target.src);
    });

  });

}
