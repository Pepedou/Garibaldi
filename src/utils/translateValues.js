module.exports = function setTranslateValue(item, translate) {
  item.css({
    "-moz-transform": "translateX(-" + translate + ")",
    "-webkit-transform": "translateX(-" + translate + ")",
    "-ms-transform": "translateX(-" + translate + ")",
    "-o-transform": "translateX(-" + translate + ")",
    transform: "translateX(-" + translate + ")"
  });
};
