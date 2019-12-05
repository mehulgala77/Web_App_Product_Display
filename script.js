
$(".product-img").click(hightLightProduct);
$(".lightbox").click(handleLightBox);

// Hightlight the image
function hightLightProduct() {

  $(".lightbox img").remove();

  $(".lightbox").addClass("active");

  const img = $("<img>");
  img.attr("src", this.src);
  img.width("50%");

  $(".lightbox").append(img);

  $(".lightbox img").mousemove(scrollImage);
}

// Handle click on the lightbox
function handleLightBox(e) {

  if (e.target !== e.currentTarget) return;

  $(".lightbox").removeClass("active");
}


function scrollImage(e) {

  const viewPortHeight = $(window).height();
  const imgHeight = this.height;

  // How much is the scrollable height of the image.
  const scrollableHeight = imgHeight - viewPortHeight;

  // How much percent down we're in the window wrt window height.
  const percentY = (e.clientY / viewPortHeight);

  // Scroll in proportion to the mouse position.
  // const scrollY = Math.round(this.scrollHeight * percentY);
  const scrollY = Math.round(scrollableHeight * percentY);

  $(".lightbox").scrollTop(scrollY);
}
