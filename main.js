$(document).ready(function () {
  var $card = $(".card");
  var lastCard = $(".card-list .card").length - 1;
  var isDragging = false;
  var startX;

  $card.on("mousedown touchstart", function (e) {
    isDragging = true;
    startX = e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function (e) {
      if (!isDragging) return;
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      var walk = x - startX;

      if (walk < -100) {
        // swipe left
        changeCard();
        isDragging = false;
        $(document).off("mousemove touchmove");
      }
    });

    $(document).on("mouseup touchend", function () {
      isDragging = false;
      $(document).off("mousemove touchmove");
    });
  });

  function changeCard() {
    var prependList = function () {
      if ($(".card").hasClass("activeNow")) {
        var $slicedCard = $(".card")
          .slice(lastCard)
          .removeClass("transformThis activeNow");
        $("ul").prepend($slicedCard);
      }
    };
    $("li")
      .last()
      .removeClass("transformPrev")
      .addClass("transformThis")
      .prev()
      .addClass("activeNow");
    setTimeout(function () {
      prependList();
    }, 150);
  }
});
