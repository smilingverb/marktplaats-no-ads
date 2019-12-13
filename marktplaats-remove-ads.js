// ==UserScript==
// @name        Topadvertentie Hider
// @namespace   Abel Stern
// @include     http*://www.marktplaats.nl/*
// @version     3.0
// @grant       none
// ==/UserScript==

function getNode (parent, regex) {
	return document.evaluate(regex, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}

function iterNodes(parent, regex) {
    var thisNode = getNode(parent, regex).singleNodeValue

	while (thisNode) {
	    thisNode.style.display='none';
  	    thisNode = getNode(parent, regex).singleNodeValue
	}
}


function hideAds (parent) {
    // Hide the search results which have a website (99+% of time webshops)
    //var xpathResult = document.evaluate('//tr[contains(@class,"search-result") and .//a[contains(text(),"Bezoek website")]]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

    var re1 = '//li[contains(@class,"mp-Listing") and .//a[contains(text(),"Bezoek website")] and not(contains(@style,"display: none"))]'
    iterNodes(parent, re1)

    // Hide the "topadvertentie" entries
    //var xpathResult = document.evaluate('//tr[contains(@class,"search-result") and .//span[contains(text(),"Topadvertentie")]]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var re2 = '//li[contains(@class,"mp-Listing") and .//span[contains(text(),"Topadvertentie")] and not(contains(@style,"display: none"))]'
    iterNodes(parent, re2)

    // Hide entries with "ook van deze adverteerder"
    //var xpathResult = document.evaluate('//tr[contains(@class,"search-result horizontalRichSnippet")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var re3 = '//article[contains(@class,"search-result horizontalRichSnippet") and not(contains(@style,"display: none"))]'
    iterNodes(parent, re3)

    // Hide entries with thumbs-up/thumbs-down webshops
    var re4 = '//article[contains(@class,"row search-result defaultSnippet") and .//span[contains(@class,"thumb")] and not(contains(@style,"display: none"))]'
    iterNodes(parent, re4)

    // Hide the ads at the end of the page.
    //var xpathResult = document.evaluate('//tr[contains(@class,"search-result") and .//a[contains(text(),"Bezoek website")]]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var re5 = '//div[./div[contains(@class,"admarktTitle")] and not(contains(@style,"display: none"))]'
    iterNodes(parent, re5)
}

hideAds(document);

// select the target node
var target = document.querySelector('body');

// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var nodes = mutation.addedNodes;
        var node;
        for(var n = 0; node = nodes[n], n < nodes.length; n++) {
            hideAds(node);
        };
    });
});

// configuration of the observer:
var config = { attributes: false, childList: true, subtree: true, characterData: false };

// pass in the target node, as well as the observer options
observer.observe(target, config);
