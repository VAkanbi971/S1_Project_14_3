"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Victor Akanbi
   Date:   4.8.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

window.addEventListener('load', makeTree);

function makeTree() {

      var aside = document.createElement("aside");
      aside.id = "treeBox";
      aside.innerHTML = "<h1>Node Tree</h1>";

      var sectionMain = document.getElementById("main");

      sectionMain.appendChild(aside);

      var nodeList = document.createElement("ol");

      aside.appendChild(nodeList);

      aside.appendChild(nodeList);

      var sourceArticle = document.querySelector("#main article");

      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").innerHTML = nodeCount;

      document.getElementById("elemNodes").innerHTML = elemCount;

      document.getElementById("textNodes").innerHTML = textCount;

      document.getElementById("wsNodes").innerHTML = wsCount;
}

function makeBranches(treeNode, nestedList) {

      nodeCount++;

      var liElem = document.createElement("li");
      liElem.textContent = "+--";

      var spanElem = document.createElement("span");

      liElem.appendChild(spanElem);

      nestedList.appendChild(liElem);

      if (treeNode.nodeType === Node.ELEMENT_NODE) {

            elemCount++

            spanElem.setAttribute("class", "elementNode");

            spanElem.textContent = "<" + treeNode + ">";
      }
      else {
            textCount++;

            var textString = treeNode;

            if (isWhiteSpaceNode(textString) === true) {

                  wsCount++;

                  spanElem.setAttribute("class", "whiteSpaceNode");

                  spanElem.innerText += "#text";
            }

            if (isWhiteSpaceNode(textString) === false) {

                  spanElem.setAttribute("class", "textNode");

                  spanElem.innerText += textString.value;
            }

            if (treeNode.childNodes.value > 0) {

                  var newList = document.createElement("ol");

                  newList.innerText = "|";

                  nestedList.appendChild(newList);

                  for (var n = 0; n < treeNode.childNodes.length; n++) {

                        makeBranches(n, newList);
                  }
            }
      }
}

function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}