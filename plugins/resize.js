$(function REMResize($) {
  var rate = 3.75,
    $html = $("html"),
    width = $html.width();
  width = width > 720 ? 720 : width < 320 ? 320 : width;
  $html.css("fontSize", width / 3.75);
  window.onresize !== REMResize ? (window.onresize = REMResize) : "";
  $("html").css("display", "block");
});
