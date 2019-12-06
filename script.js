
let hightlightedImage;

let productCatelog = {
  "man-jacket": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "man-shirt": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "wall-decor": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
  "watch": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "woman-jacket": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  "woman-kurti": ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
};

// When any product item is clicked, we need to display that product in large scale.
$(".product-img").click(hightLightProduct);

$(".lightbox").click(handleLightBox);

$(window).keyup(handleKeyPress);

// Lightbox effect
function hightLightProduct() {

  cleaup();

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

  createButtons();
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

  const thumbnailPanel = $("<div></div>");
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
    image.on("click", (e) => {

      // Remove the highlight box from previous thumbnails.
      $(".thumbnails-panel > *").removeClass("active");

      // If we use "this", it returns window object. Using e.target returns the correct element.
      $(".big-image").attr("src", e.target.src);

      // Make the one which is clicked active.
      $(e.target).addClass("active");
    });

  });

  $(".thumbnails-panel > *").first().addClass("active");

  createButtons();
}

function createButtons() {

  // Add prev button
  const prevButton = $("<div></div>");
  prevButton.addClass("prev-button");
  prevButton.html('<i class="fas fa-arrow-left"></i>');
  $(".lightbox-data").append(prevButton);

  // Add next button
  const nextButton = $("<div></div>");
  nextButton.addClass("next-button");
  nextButton.html('<i class="fas fa-arrow-right"></i>');
  $(".lightbox-data").append(nextButton);

  // Add close button
  const closeButton = $("<div></div>");
  closeButton.addClass("close-button");
  closeButton.html('<i class="fas fa-times"></i>');
  $(".lightbox-data").append(closeButton);

  prevButton.on("click", () => handleNext("prev"));
  nextButton.on("click", () => handleNext("next"));

  closeButton.on("click", () => $(".lightbox").removeClass("active"));
}

function cleaup() {
  // Cleaning of last displayed image.
  $(".lightbox .big-image").remove();

  // Destroy the last shown thumbnail.
  $(".lightbox .thumbnails-panel").remove();

  // Cleaning up of the buttons
  $(".lightbox .next-button").remove();
  $(".lightbox .prev-button").remove();
  $(".lightbox .close-button").remove();
}

function handleNext(direction) {
  const imgSrc = $(".thumbnails-panel .active").attr("src");
  const tokens = imgSrc.split("/");
  const productName = tokens[1];
  const imageName = tokens[2];

  let index = productCatelog[productName].findIndex( item => item === imageName);

  if (direction === "next") {

    // If the index is not at last position.
    if (index !== productCatelog[productName].length - 1) {
      // One for the next index, and one because the images are 1-indexed.
      index += 1;
    }
    else {
      index = 0;
    }

  }
  else {

    // If the index is not at last position.
    if (index !== 0) {
      // One for the next index, and one because the images are 1-indexed.
      index -= 1;
    }
    else {
      index = productCatelog[productName].length - 1;
    }

  }

  // Remove all previous active class;
  $(".thumbnails-panel > *").removeClass("active");

  // Change the big image
  $(".big-image").attr("src", $(".thumbnails-panel > *").eq(index).attr("src"));

  // make the next image active
  $(".thumbnails-panel > *").eq(index).addClass("active");
}

// Keyboard hooks
function handleKeyPress(e) {
  // if the lightbox is not active, no need to process any event.
  if ( ! $(".lightbox").hasClass("active") ) return;

  // Escape
  if (e.keyCode === 27) {
    $(".lightbox").removeClass("active");
  }

  console.log(e.keyCode);

  // Prev Key
  if (e.keyCode === 37) {
    handleNext("prev");
  }

  // Prev Key
  if (e.keyCode === 39) {
    handleNext("next");
  }
}
