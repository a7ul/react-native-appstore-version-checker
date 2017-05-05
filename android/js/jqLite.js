(function() {
  /* eslint no-undef:0, semi:2 */
  /* eslint guard-for-in:0, semi:2*/

  if (typeof $ === "undefined") {
    window.$ = {};
  }

  var eventQueue = [];

  document.addEventListener('DOMContentLoaded', function () {
    eventQueue.forEach(function (fn) {
      fn();
    });
  }, false);



  $ = function (arg) {
    var htmlEls;

    if (arg instanceof Function) {

      eventQueue.push(arg);
      return document;

    } else if(arg instanceof Object) {
      return new DOMNodeCollection([arg]);
    } else {

      if (arg instanceof HTMLElement) {

        htmlEls = [arg]

      } else {
        matches = arg.match(/^<(\w+)>$/);

        if (matches) {
          htmlEls = [document.createElement(matches[1])];
        } else {
          htmlEls = Array.prototype.slice.call(document.querySelectorAll(arg));
        }
      }

      return new DOMNodeCollection(htmlEls);
    }
  };


  DOMNodeCollection = function (elements) {
    this.elements = elements;
    return this;
  };


  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string !== 'undefined') {

      this.elements.forEach(function (el) {
        el.innerHTML = string;
      });

      return this;
    } else {
      return this.elements[0].innerHTML;
    }
  };



  DOMNodeCollection.prototype.empty = function () {
    this.html("");
    return this;
  };



  DOMNodeCollection.prototype.appendToFirst = function (arg) {
    this.elements[0].appendChild(arg.cloneNode(true));
  };



  DOMNodeCollection.prototype.append = function (arg) {
    if (arg instanceof DOMNodeCollection) {

      arg.elements.forEach(function (el) {
        this.elements[0].appendChild(el.cloneNode(true));
      }.bind(this));

    } else if (arg instanceof HTMLElement) {

      this.elements[0].appendChild(arg.cloneNode(true));

    } else if (typeof arg === "string") {

      this.elements.forEach(function (el) {
        el.innerHTML += arg;
      });

    }

    return this;
  };


  DOMNodeCollection.prototype.attr = function (name, value) {
    if (typeof value !== 'undefined') {
      this.elements.forEach( function(el) {
        el.setAttribute(name, value);
      });
      return this;
    } else {
      return this.elements[0].getAttribute(name);
    }
  };

  DOMNodeCollection.prototype.get = function(index) {
    return new DOMNodeCollection([this.elements[index]]);
  };

  DOMNodeCollection.prototype.addClass = function (newClass) {
    this.elements.forEach( function (el) {
      el.classList.add(newClass);
    });
    return this;
  };



  DOMNodeCollection.prototype.removeClass = function (dropClass) {
    this.elements.forEach( function (el) {
      el.classList.remove(dropClass);
    });
    return this;
  };



  DOMNodeCollection.prototype.children = function () {
    var allChildren = [], newChildren;

    this.elements.forEach(function (el) {
      newChildren = Array.prototype.slice.call(el.children);

      allChildren = allChildren.concat(newChildren);
    });

    return new DOMNodeCollection(allChildren);
  };



  DOMNodeCollection.prototype.parent = function () {
    var parents = [], currentParent;

    this.elements.forEach(function (el) {
      // debugger
      currentParent = el.parentElement;

      if (parents.indexOf(currentParent) === -1) {
        parents.push(currentParent);
      }
    });

    return new DOMNodeCollection(parents);
  };



  DOMNodeCollection.prototype.find = function (selector) {
    var matchingElements = [], currentMatchesQuery, currentMatches;

    this.elements.forEach(function (el) {
      currentMatchesQuery = el.querySelectorAll(selector);
      currentMatches = Array.prototype.slice.call(currentMatchesQuery);
      currentMatches.forEach( function (match) {
        if (matchingElements.indexOf(match) === -1) {
          matchingElements.push(match);
        }
      });
    });

    return new DOMNodeCollection(matchingElements);
  };



  DOMNodeCollection.prototype.remove = function () {
    this.elements.forEach(function (el) {
      el.remove();
    });
  };



  DOMNodeCollection.prototype.on = function (type, callback) {
    this.elements.forEach(function (el) {
      el.addEventListener(type, callback);
    });
    return this;
  };



  DOMNodeCollection.prototype.off = function (type, callback) {
    this.elements.forEach(function (el) {
      el.removeEventListener(type, callback);
    });
    return this;
  };

  DOMNodeCollection.prototype.each = function(callback) {
    this.elements.forEach(callback);
  };


  DOMNodeCollection.prototype.hide = function() {
    this.originalDisplay = this.css("display");
    this.css("display", "none");
    return this;
  };

  DOMNodeCollection.prototype.show = function() {
    newDisplay = this.originalDisplay || "block";
    this.css("display", newDisplay);
    return this;
  };

  DOMNodeCollection.prototype.css = function(property, value) {
    if (typeof value === 'undefined') {
      return this.elements[0].style.getPropertyValue(property);
    } else {
      this.elements.forEach(function(element){
        element.style[property] = value;
      });
      return this;
    }
  };

  DOMNodeCollection.prototype.text = function(string) {
    if (typeof string !== 'undefined') {

      this.elements.forEach(function (el) {
        el.innerText = string;
      });

      return this;
    } else {
      text = "";

      this.elements.forEach(function(element){
        text += element.innerText;
      });

      return text;
    }
  };

  $.extend = function (base) {
    var objects = Array.prototype.slice.call(arguments, 1);

    objects.forEach( function (object) {
      for (var attribute in object) {
        base[attribute] = object[attribute];
      }
    });
  };

  var loadXMLDoc = function(options) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if(xmlhttp.readyState == XMLHttpRequest.DONE){
        if (xmlhttp.status == 200) {
          options.success(xmlhttp.response);
        } else {
          options.error();
        }
      }
    };

    xmlhttp.open(options.method, options.url, true);

    if (options.method == 'POST') {
      xmlhttp.setRequestHeader('Content-type', options.contentType);
    }

    xmlhttp.send(options.data);
  };

  $.ajax = function (options) {
    var defaults = {
      success: function(){},
      error: function(){},
      url: window.location.href,
      method: "GET",
      data: "",
      contentType: "application/x-www-form-urlencoded"
    };

    $.extend(defaults, options);
    loadXMLDoc(defaults);
  };

  $.get = function(url, successCallback) {
    $.ajax({
      url: url,
      success: successCallback
    });
  };

  $.post = function(url, data, successCallback) {
    $.ajax({
      url: url,
      data: data,
      success: successCallback
    });
  };

}());