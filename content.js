var emojis = ["😂", "🤣", "😆", "🤡", "😹", "💀", "👏", "🤪", "🤯"];
var freq = 35;

function getRandomEmoji(array, freq) {
    var res;
    if ((Math.floor(Math.random() * 100)) < freq) {
      res = " " + array[Math.floor(Math.random() * array.length)] + " ";
    } else {
      res = " ";
    }
    return res;
  };

  function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function textNodesUnder(node){
    var all = [];
    for (node = node.firstChild; node; node = node.nextSibling) {
        if (node.nodeType == 3) all.push(node);
        else all = all.concat(textNodesUnder(node));
    }
    return all;
}
// console.log(document.querySelector("article").nodeType);
// console.log(document.body.nodeType);

// if (document.querySelector("article")){
//     var textNodes = document.querySelector("article")
// } else {
//     var textNodes = textNodesUnder(document.body);
// }

var textNodes = textNodesUnder(document.body);

textNodes.forEach(function(node) {
    var words = node.nodeValue.split(' ');
    var newNodes = [];
    words.forEach(function(word, i) {
        var colorSpan = document.createElement('span');
        colorSpan.style.color = getRandomColor();
        if (emojis) {
            colorSpan.textContent = word + getRandomEmoji(emojis, freq);
        }
        else {
            colorSpan.textContent = word;
        }
        newNodes.push(colorSpan);

        if (i < words.length - 1) {
            var spaceNode = document.createTextNode(' ');
            newNodes.push(spaceNode);
        }
    });
    newNodes.forEach(function(newNode, i) {
        node.parentNode.insertBefore(newNode, i === 0 ? node : null);
    });
    node.parentNode.removeChild(node);
});