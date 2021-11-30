/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "retrieveData": () => (/* binding */ retrieveData),
/* harmony export */   "formatFormValues": () => (/* binding */ formatFormValues),
/* harmony export */   "travelerRepo": () => (/* binding */ travelerRepo)
/* harmony export */ });
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_mountains_tanyadzu_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _images_user_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _TravelerRepo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(15);





const dayjs = __webpack_require__(13);


// Global Variable
let travelerRepo;

const retrieveData = (id) => {
  Promise.all(
    [(0,_fetch__WEBPACK_IMPORTED_MODULE_3__.fetchData)(`travelers/${id}`), (0,_fetch__WEBPACK_IMPORTED_MODULE_3__.fetchData)('trips'),
      (0,_fetch__WEBPACK_IMPORTED_MODULE_3__.fetchData)('destinations')]
  ).then(data => {
    buildTravelerRepo(
      data[0], 
      Object.values(data[1]).flat(), 
      Object.values(data[2]).flat());
    (0,_domManipulation__WEBPACK_IMPORTED_MODULE_5__.generateDOM)(travelerRepo);
  })
}

const buildTravelerRepo = (travelerData, tripData, destinationData) => {
  travelerRepo = 
    new _TravelerRepo__WEBPACK_IMPORTED_MODULE_4__.default(travelerData, tripData, destinationData);
  travelerRepo.buildTravelers();
}

const addTripForm = document.querySelector('#add-trip-form');

addTripForm.addEventListener('submit', (event) => {
  addTrip(event);
})

const formatFormValues = () => {
  const elementIndexes = Object.keys(addTripForm.elements);
  elementIndexes.splice(4, 4);
  const formValues = elementIndexes.reduce((acc, number)=> {
    if (addTripForm.elements[number].value === 'Destinations') {
      acc.push('')
    } else {
      acc.push(addTripForm.elements[number].value);
    }
    return acc;
  }, []);
  if (formValues[1].length > 0) {
    formValues[1] = dayjs(formValues[1]).format('YYYY/MM/DD')
  }
  return formValues;
}

function addTrip(e) {
  e.preventDefault();
  const trip = travelerRepo.prepareTripDetails(formatFormValues())
  ;(0,_fetch__WEBPACK_IMPORTED_MODULE_3__.postData)(trip, travelerRepo.currentTraveler.id);
  addTripForm.reset();
  setTimeout(() => {
    addTripForm.childNodes[3].innerText = ``;
    addTripForm.childNodes[3].style.backgroundColor = 'transparent';
  }, 2000);
}

(0,_domManipulation__WEBPACK_IMPORTED_MODULE_5__.pageLoadLoginDisplay)();



/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_mountains_tanyadzu_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_mountains_tanyadzu_png__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed,\nfigure, figcaption, footer, header, hgroup,\nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure,\nfooter, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nbody {\n  line-height: 1;\n}\n\nol, ul {\n  list-style: none;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after,\nq:before, q:after {\n  content: \"\";\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/* ~~~~~~~~~~ GLOBAL RULES ~~~~~~~~~~ */\n* {\n  box-sizing: border-box;\n  border: 0;\n}\n\nhtml {\n  background-color: #F5FAF8;\n  color: #2B2843;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 24px;\n}\n\nbody {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding: 1.5em;\n}\n\nmain,\nheader {\n  border-radius: 50px;\n  display: none;\n  box-shadow: 0px 7px 20px -5px rgba(33, 191, 133, 0.25);\n  padding: 1em;\n}\n\nh1 {\n  color: #4ac79c;\n  font-size: 1.4em;\n}\n\nh2 {\n  font-size: 1.1em;\n  margin-top: 0.4em;\n}\n\nh1,\nh2 {\n  font-weight: 700;\n}\n\nh3 {\n  font-size: 0.8em;\n}\n\np {\n  font-size: 0.65em;\n}\n\ninput,\nselect {\n  height: 2.75em;\n  padding: 0.2em 1em;\n}\n\ninput[type=date] {\n  font-family: inherit;\n}\n\ninput:hover,\nselect:hover,\nbutton:hover {\n  cursor: pointer;\n}\n\nbutton,\n.add-trip-input-fields,\n.trip-categories,\n.current-trip {\n  background-color: #D5F2E8;\n}\n\ninput,\nselect,\nbutton,\n.add-trip-input-fields,\n.cost-estimate,\n.dropdown-content,\n.current-trip,\n.trip-info {\n  border-radius: 15px;\n}\n\ninput,\nselect,\n.traveler-login-form button,\n.add-trip-form button,\n.trip-categories,\n.add-trip-input-fields,\n.current-trip,\n.dropdown-content {\n  box-shadow: 0px 3px 20px -10px rgba(0, 0, 0, 0.5);\n}\n\n.upcoming section,\n.past section,\n.pending section {\n  box-shadow: 0px 5px 20px -5px rgba(0, 0, 0, 0.5);\n}\n\n/* ~~~~~~~~~~ FLEX RULES ~~~~~~~~~~ */\n.header-top-section,\n.add-trip-form,\n.add-trip-input-fields,\n.user-info-dropdown-section {\n  display: flex;\n}\n\n.traveler-login-form,\nheader,\n.my-trips-category-dropdown,\n.trip-info,\n.current-destination {\n  display: flex;\n  flex-direction: column;\n}\n\n.traveler-login-form,\n.header-top-section,\n.add-trip-form,\n.add-trip-input-fields {\n  justify-content: space-between;\n  align-items: center;\n}\n\nheader,\n.main-top-section,\n.my-trips-category-dropdown,\n.trip-info {\n  display: flex;\n  justify-content: space-between;\n}\n\n.current-destination,\n.trip-info {\n  text-align: right;\n}\n\n/* ~~~~~~~~~~ LOGIN RULES ~~~~~~~~~~ */\n.traveler-login-section {\n  height: 12em;\n}\n.traveler-login-section .traveler-login-form {\n  height: 100%;\n}\n.traveler-login-section button {\n  width: 10%;\n  height: 2.5em;\n  transition: background-color 200ms ease;\n}\n.traveler-login-section button:hover {\n  background-color: #4ac79c;\n}\n.traveler-login-section p {\n  font-weight: 700;\n}\n\n/* ~~~~~~~~~~ HEADER RULES ~~~~~~~~~~ */\nheader {\n  background-blend-mode: hard-light;\n  background-color: rgba(255, 255, 255, 0.2);\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-position: center;\n  height: 8em;\n}\nheader .add-trip-form {\n  min-height: 3.25em;\n}\nheader .add-trip-form .add-trip-input-fields {\n  background-color: #D5F2E8;\n  flex-wrap: wrap;\n  min-height: 80%;\n  padding: 0 0.5em;\n  width: 75%;\n}\nheader .add-trip-form .add-trip-input-fields .destinations {\n  width: 30%;\n}\nheader .add-trip-form button {\n  background-color: #E86D18;\n  color: #fff;\n  font-size: 0.8em;\n  font-weight: 700;\n  height: 2.2em;\n  padding: 0.5em 1.2em;\n  transition: background-color 200ms ease;\n}\nheader .add-trip-form button:hover {\n  background-color: #ef995d;\n}\n\n.cost-estimate {\n  padding: 0.5em;\n  text-align: center;\n  width: 7em;\n}\n\n.user-info-dropdown-section {\n  justify-content: flex-end;\n}\n.user-info-dropdown-section img {\n  height: 2.5em;\n}\n.user-info-dropdown-section .show-dropdown-content {\n  background: none;\n}\n.user-info-dropdown-section .dropdown-content {\n  background-color: #fff;\n  display: none;\n  font-size: 1.2em;\n  height: 4em;\n  padding: 0 0.5em;\n  position: absolute;\n}\n.user-info-dropdown-section:focus .dropdown-content, .user-info-dropdown-section:hover .dropdown-content {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n}\n\n/* ~~~~~~~~~~ MAIN RULES ~~~~~~~~~~ */\nmain {\n  background-color: #fff;\n  margin-top: 1.3em;\n}\nmain .main-top-section {\n  height: 4em;\n  padding: 0 1em;\n}\nmain .main-top-section .my-trips-category-dropdown {\n  min-width: 15%;\n}\nmain .main-top-section .my-trips-category-dropdown .trip-categories {\n  transition: background-color 200ms ease;\n}\nmain .main-top-section .my-trips-category-dropdown .trip-categories:hover {\n  background-color: #4ac79c;\n}\nmain .main-top-section .current-trip {\n  padding: 1em;\n  width: 40%;\n}\nmain .main-top-section .current-trip .current-destination {\n  align-items: flex-end;\n  justify-content: space-evenly;\n}\nmain .trips {\n  padding: 1em;\n}\nmain .trips .upcoming,\nmain .trips .past,\nmain .trips .pending {\n  grid-template-columns: repeat(auto-fill, minmax(300px, 30%));\n  grid-gap: 2em;\n  justify-content: center;\n}\nmain .trips .upcoming section,\nmain .trips .past section,\nmain .trips .pending section {\n  align-items: flex-end;\n  border-radius: 25px;\n  height: 11em;\n  padding: 0.8em 0.8em;\n  display: flex;\n  justify-content: flex-end;\n}\nmain .trips .upcoming section .trip-info,\nmain .trips .past section .trip-info,\nmain .trips .pending section .trip-info {\n  background-color: #fff;\n  height: 3.7em;\n  padding: 0.5em 0.5em;\n  width: 60%;\n}", "",{"version":3,"sources":["webpack://./src/css/reset.scss","webpack://./src/css/base.scss","webpack://./src/css/_variables.scss","webpack://./src/css/_mixins.scss"],"names":[],"mappings":"AAAA;;;CAAA;AAKA;;;;;;;;;;;;;EAaC,SAAA;EACA,UAAA;EACA,SAAA;EACA,eAAA;EACA,aAAA;EACA,wBAAA;ACAD;;ADEA,gDAAA;AACA;;EAEC,cAAA;ACCD;;ADCA;EACC,cAAA;ACED;;ADAA;EACC,gBAAA;ACGD;;ADDA;EACC,YAAA;ACID;;ADFA;;EAEC,WAAA;EACA,aAAA;ACKD;;ADHA;EACC,yBAAA;EACA,iBAAA;ACMD;;AAhDA,uCAAA;AACA;EACE,sBAAA;EACA,SAAA;AAmDF;;AAhDA;EACE,yBCVmB;EDWnB,cCVW;EDWX,yCAAA;EACA,eAAA;AAmDF;;AAhDA;EEPE,aAAA;EACA,sBAAA;EFQA,iBAAA;EACA,cAAA;AAoDF;;AAjDA;;EAEE,mBAAA;EACA,aAAA;EEzBA,sDAAA;EF2BA,YAAA;AAoDF;;AAjDA;EACE,cC3Ba;ED4Bb,gBAAA;AAoDF;;AAjDA;EACE,gBAAA;EACA,iBAAA;AAoDF;;AAjDA;;EAEE,gBAAA;AAoDF;;AAjDA;EACE,gBAAA;AAoDF;;AAjDA;EACE,iBAAA;AAoDF;;AAjDA;;EEjDE,cFmDwB;EElDxB,kBAAA;AFuGF;;AAlDA;EACE,oBAAA;AAqDF;;AA/CE;;;EACE,eAAA;AAoDJ;;AAhDA;;;;EAIE,yBCvEW;AD0Hb;;AAhDA;;;;;;;;EAQE,mBAAA;AAmDF;;AAhDA;;;;;;;;EExFE,iDAAA;AFmJF;;AAhDA;;;EEnGE,gDAAA;AFyJF;;AAhDA,qCAAA;AACA;;;;EAIE,aAAA;AAmDF;;AAhDA;;;;;EExGE,aAAA;EACA,sBAAA;AFgKF;;AAjDA;;;;EEtGE,8BAAA;EACA,mBAAA;AF8JF;;AAlDA;;;;EElHE,aAAA;EACA,8BFqHsB;AAsDxB;;AAnDA;;EAEE,iBAAA;AAsDF;;AAlDA,sCAAA;AACA;EACE,YAAA;AAqDF;AAnDE;EACE,YAAA;AAqDJ;AAlDE;EACE,UAAA;EACA,aAAA;EACA,uCAAA;AAoDJ;AAlDI;EACE,yBCvJS;AD2Mf;AAhDE;EACE,gBAAA;AAkDJ;;AA9CA,uCAAA;AAEA;EACE,iCAAA;EACA,0CAAA;EACA,yDAAA;EACA,sBAAA;EACA,2BAAA;EACA,WAAA;AAgDF;AA9CE;EACE,kBAAA;AAgDJ;AA9CI;EACE,yBC/KO;EDgLP,eAAA;EACA,eAAA;EACA,gBAAA;EACA,UAAA;AAgDN;AA9CM;EACE,UAAA;AAgDR;AA5CI;EACE,yBCxLQ;EDyLR,WChME;EDiMF,gBAAA;EACA,gBAAA;EE7LJ,aF8L4B;EE7L5B,oBAAA;EF8LI,uCAAA;AA+CN;AA7CM;EACE,yBC/LS;AD8OjB;;AAzCA;EACE,cAAA;EACA,kBAAA;EACA,UAAA;AA4CF;;AAzCA;EACE,yBAAA;AA4CF;AA1CE;EACE,aAAA;AA4CJ;AAzCE;EACE,gBAAA;AA2CJ;AAxCE;EACE,sBC/NI;EDgOJ,aAAA;EACA,gBAAA;EE5NF,WF6N0B;EE5N1B,gBAAA;EF6NE,kBAAA;AA2CJ;AAxCE;EE5NA,aAAA;EACA,sBAAA;EF8NE,6BAAA;AA0CJ;;AAtCA,qCAAA;AAEA;EACE,sBChPM;EDiPN,iBAAA;AAwCF;AAtCE;EE9OA,WF+O0B;EE9O1B,cAAA;AFuRF;AAvCI;EACE,cAAA;AAyCN;AAvCM;EACE,uCAAA;AAyCR;AAvCQ;EACE,yBCxPK;ADiSf;AApCI;EACE,YAAA;EACA,UAAA;AAsCN;AApCM;EACE,qBAAA;EACA,6BAAA;AAsCR;AAjCE;EACE,YAAA;AAmCJ;AAjCI;;;EAGE,4DAAA;EACA,aAAA;EACA,uBAAA;AAmCN;AAjCM;;;EACE,qBAAA;EACA,mBAAA;EEpRN,YFqR8B;EEpR9B,oBAAA;EASA,aAAA;EACA,yBF2Q4B;AAuC9B;AArCQ;;;EACE,sBC9RF;ECKN,aF0RgC;EEzRhC,oBAAA;EF0RQ,UAAA;AA0CV","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}","@import 'reset';\n@import '_variables';\n@import '_mixins';\n\n/* ~~~~~~~~~~ GLOBAL RULES ~~~~~~~~~~ */\n* {\n  box-sizing: border-box;\n  border: 0;\n}\n\nhtml {\n  background-color: $primary-background;\n  color: $text-color; \n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 24px;\n}\n\nbody {\n  @include flex-column();\n  min-height: 100vh;\n  padding: 1.5em;\n}\n\nmain,\nheader {\n  border-radius: 50px;\n  display: none;\n  @include box-shadow(7px, -5px, rgba(33,191,133, 0.25));\n  padding: 1em;\n}\n\nh1 {\n  color: $darker-green;\n  font-size: 1.4em;\n}\n\nh2 {\n  font-size: 1.1em;\n  margin-top: .4em;\n}\n\nh1,\nh2 {\n  font-weight: 700;\n}\n\nh3 {\n  font-size: .8em;\n}\n\np {\n  font-size: .65em;\n}\n\ninput,\nselect {\n  @include height-padding(2.75em, .2em, 1em);\n}\n\ninput[type=date] {\n  font-family: inherit;\n}\n\ninput,\nselect,\nbutton {\n  &:hover {\n    cursor:pointer;\n  }\n}\n\nbutton,\n.add-trip-input-fields,\n.trip-categories,\n.current-trip {\n  background-color: $main-green;\n}\n\ninput,\nselect,\nbutton,\n.add-trip-input-fields,\n.cost-estimate,\n.dropdown-content,\n.current-trip,\n.trip-info {\n  border-radius: 15px;\n}\n\ninput,\nselect,\n.traveler-login-form button,\n.add-trip-form button,\n.trip-categories,\n.add-trip-input-fields,\n.current-trip,\n.dropdown-content {\n  @include box-shadow(3px, -10px, rgba(0,0,0, 0.5));\n}\n\n.upcoming section,\n.past section,\n.pending section {\n  @include box-shadow(5px, -5px, rgba(0,0,0, 0.5));\n}\n\n/* ~~~~~~~~~~ FLEX RULES ~~~~~~~~~~ */\n.header-top-section,\n.add-trip-form,\n.add-trip-input-fields,\n.user-info-dropdown-section {\n  display: flex;\n}\n\n.traveler-login-form,\nheader,\n.my-trips-category-dropdown,\n.trip-info,\n.current-destination {\n  @include flex-column();\n}\n\n.traveler-login-form,\n.header-top-section,\n.add-trip-form,\n.add-trip-input-fields {\n  @include justify-between-align-center();\n}\n\nheader,\n.main-top-section,\n.my-trips-category-dropdown,\n.trip-info {\n  @include flex-justify(space-between);\n}\n\n.current-destination,\n.trip-info {\n  text-align: right;\n}\n\n\n/* ~~~~~~~~~~ LOGIN RULES ~~~~~~~~~~ */\n.traveler-login-section {\n  height: 12em;\n\n  .traveler-login-form {\n    height: 100%;\n  }\n\n  button {\n    width: 10%;\n    height: 2.5em;\n    transition: background-color 200ms ease;\n\n    &:hover {\n      background-color: $darker-green;\n    }\n  }\n\n  p {\n    font-weight: 700;\n  }\n}\n\n/* ~~~~~~~~~~ HEADER RULES ~~~~~~~~~~ */\n\nheader {\n  background-blend-mode: hard-light;\n  background-color: rgba(255, 255, 255, .2);\n  background-image: url('../images/mountains-tanyadzu.png');\n  background-size: cover;\n  background-position: center;\n  height: 8em;\n\n  .add-trip-form {\n    min-height: 3.25em;\n\n    .add-trip-input-fields {\n      background-color: $main-green;\n      flex-wrap: wrap;\n      min-height: 80%;\n      padding: 0 .5em;\n      width: 75%;\n\n      .destinations {\n        width: 30%;\n      }\n    }\n\n    button {\n      background-color: $main-orange;\n      color: $white;\n      font-size: .8em;\n      font-weight: 700;\n      @include height-padding(2.2em, .5em, 1.2em);\n      transition: background-color 200ms ease;\n\n      &:hover {\n        background-color: $lighter-orange;\n      }\n    }\n  }\n}\n\n.cost-estimate {\n  padding: .5em;\n  text-align: center;\n  width: 7em;\n}\n\n.user-info-dropdown-section {\n  justify-content: flex-end;\n\n  img {\n    height: 2.5em;\n  }\n\n  .show-dropdown-content {\n    background: none;\n  }\n\n  .dropdown-content {\n    background-color: $white;\n    display: none;\n    font-size: 1.2em;\n    @include height-padding(4em, 0, .5em);\n    position: absolute;\n  }\n  \n  &:focus .dropdown-content,\n  &:hover .dropdown-content {\n    @include flex-column();\n    justify-content: space-evenly;\n  }\n}\n\n/* ~~~~~~~~~~ MAIN RULES ~~~~~~~~~~ */\n\nmain {\n  background-color: $white;\n  margin-top: 1.3em;\n\n  .main-top-section {\n    @include height-padding(4em, 0, 1em);\n\n    .my-trips-category-dropdown {\n      min-width: 15%;\n\n      .trip-categories {\n        transition: background-color 200ms ease;\n\n        &:hover {\n          background-color: $darker-green;\n        }\n      }\n    }\n\n    .current-trip {\n      padding: 1em;\n      width: 40%;\n\n      .current-destination {\n        align-items: flex-end;\n        justify-content: space-evenly;\n      }\n    }\n  }\n\n  .trips {\n    padding: 1em;\n\n    .upcoming,\n    .past,\n    .pending {\n      grid-template-columns: repeat(auto-fill, minmax(300px, 30%));\n      grid-gap: 2em;\n      justify-content: center;\n  \n      section {\n        align-items: flex-end;\n        border-radius: 25px;\n        @include height-padding(11em, .8em, .8em);\n        @include flex-justify(flex-end);\n  \n        .trip-info {\n          background-color: $white;\n          @include height-padding(3.7em, .5em, .5em);\n          width: 60%;\n        }\n      }\n    }\n  }\n}\n","$white: #fff;\n$primary-background: #F5FAF8;\n$text-color: #2B2843;\n\n$main-green: #D5F2E8;\n$darker-green: scale-color(#D5F2E8, $lightness: -40%);\n\n$main-orange: #E86D18;\n$lighter-orange: scale-color(#E86D18, $lightness: 30%);\n","@mixin box-shadow($y, $spread, $color) {\n  box-shadow: 0px $y 20px $spread $color;\n}\n\n@mixin height-padding($height, $num1, $num2) {\n  height: $height;\n  padding: $num1 $num2;\n}\n\n@mixin flex-column() {\n  display: flex;\n  flex-direction: column;\n}\n\n@mixin flex-justify($setting) {\n  display: flex;\n  justify-content: $setting;\n}\n\n@mixin justify-between-align-center() {\n  justify-content: space-between;\n  align-items: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/mountains-tanyadzu.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/user.svg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


const addTripForm = document.querySelector('#add-trip-form');
const errorField = document.querySelector('h1');

const fetchData = (url) => {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(response => response.json())
    .catch(error => showError(error)) 
}

const postData = (tripDetails, userID) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(tripDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => checkForErrors(response))
    .then(() => {
      addTripSuccess();
      (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.retrieveData)(userID)
    })
    .catch(error => showError(error));
}

const checkForErrors = (response) => {
  if (!response.ok) {
    throw new Error('POST unsuccessful')
  }
  return response.json()
}

const showError = (error) => {
  if (error.message === 'Failed to fetch') {
    errorField.innerText = 'Error loading. Have you started the local server?';
  } else if (error.message === 'POST unsuccessful') {
    addTripForm.childNodes[3].innerText = 'Something went wrong. Try again!';
  } else {
    errorField.innerText = `${error.message}`;
  }
}

const addTripSuccess = () => {
  addTripForm.childNodes[3].innerText = `Trip successfully requested!`;
}



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TravelerRepo)
/* harmony export */ });
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);


class TravelerRepo {
  constructor(travelerData, tripData, destinationData) {
    this.allTrips = tripData;
    this.allDestinations = this.sortDestinations(destinationData);
    this.currentTraveler = travelerData;
  }

  sortDestinations(destinationData) {
    return destinationData.sort((a, b) => {
      if (a.destination < b.destination) {
        return -1;
      } else if (a.destination > b.destination) {
        return 1;
      }
    });
  }

  updateTrips() {
    this.allTrips.map(trip => {
      const destination = this.allDestinations
        .find(destination => destination.id === trip.destinationID)
      Object.keys(destination).forEach(property => {
        if (property !== 'id') {
          trip[property] = destination[property];
        }
      });
    });
  }

  retrieveTravelersTrips(userID) {
    return this.allTrips.filter(trip => trip.userID === userID);
  }

  buildTravelers() {
    this.updateTrips();
    this.currentTraveler =
      new _Traveler__WEBPACK_IMPORTED_MODULE_0__.default(this.currentTraveler, 
        this.retrieveTravelersTrips(this.currentTraveler.id));
    return this.currentTraveler;
  }

  retrieveDestinationId(destinationName) {
    return this.allDestinations.reduce((id, destination) => {
      if (destination.destination === destinationName) {
        id = destination.id;
        return id;
      }
      return id;
    }, 0)
  }

  estimateTripCost(tripDetails) {
    const priceFormatter = new Intl.NumberFormat();
    if (tripDetails.every(value => value.length !== 0)) {
      const requestedDestination = this.allDestinations
        .find(destination => destination.destination === tripDetails[0]);
      const flights = tripDetails[3] *
        requestedDestination.estimatedFlightCostPerPerson;
      const lodging = tripDetails[2] *
        requestedDestination.estimatedLodgingCostPerDay;
      const total = flights + lodging;
      const travelAgent = total * 0.1
      return priceFormatter.format(total + travelAgent);
    }
  }

  prepareTripDetails(tripDetails) {
    const formattedTrip = {
      id: Date.now(),
      userID: this.currentTraveler.id,
      destinationID: this.retrieveDestinationId(tripDetails[0]),
      travelers: tripDetails[3],
      date: tripDetails[1],
      duration: tripDetails[2],
      status: 'pending',
      suggestedActivities: []
    }
    return formattedTrip;
  }
}

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Traveler)
/* harmony export */ });
/* harmony import */ var _Trips__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


class Traveler {
  constructor(traveler, trips) {
    this.id = traveler.id, 
    this.name = traveler.name,
    this.travelerType = traveler.travelerType;
    this.myTrips = new _Trips__WEBPACK_IMPORTED_MODULE_0__.default(trips);
  }
}

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Trips)
/* harmony export */ });
const dayjs = __webpack_require__(13);
const isSameOrBefore = __webpack_require__(14);
dayjs.extend(isSameOrBefore);

class Trips {
  constructor(tripData) {
    this.trips = tripData;
    this.totalCost = this.calculateTotalCostThisYear();
    this.categorizedTrips = this.categorizeTrips(tripData);
  }

  formatDates(tripData) {
    tripData.forEach(trip => {
      trip.date = dayjs(trip.date).format('YYYY/MM/DD');
    });
  }

  calculateTripCost(id) {
    const trip = this.trips.find(trip => trip.id === id);
    const flights = trip.travelers * trip.estimatedFlightCostPerPerson;
    const lodging = trip.duration * trip.estimatedLodgingCostPerDay;
    const total = flights + lodging;
    const travelAgent = total * 0.1;
    return total + travelAgent;
  }

  calculateTotalCostThisYear() {
    const priceFormatter = new Intl.NumberFormat();
    const total = this.trips.reduce((sum, trip) => {
      if (trip.status === 'approved' &&
        dayjs('2021/01/01').isSameOrBefore(trip.date)) {
        sum += this.calculateTripCost(trip.id);
      }
      return sum;
    }, 0);
    return priceFormatter.format(total);
  }

  categorizeTrips(tripData) {
    this.formatDates(tripData);
    const sortedTrip = tripData.sort((a, b) => {
      const num1 = parseInt(a.date.replaceAll('/', ''));
      const num2 = parseInt(b.date.replaceAll('/', ''));
      return num1 - num2;
    });
    return sortedTrip.reduce((obj, trip) => {
      if (trip.status !== 'approved') {
        obj.pending.push(trip);
      } else if (dayjs().isAfter(trip.date, 'day')) {
        obj.past.push(trip);
      } else if (dayjs().isSame(trip.date, 'day')) {
        obj.present.push(trip);
      } else if (dayjs().isBefore(trip.date, 'day')) {
        obj.upcoming.push(trip);
      }
      return obj;
    }, {
      pending: [],
      past: [],
      present: [],
      upcoming: []
    });
  }
}

/***/ }),
/* 13 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 14 */
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)}}}));

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pageLoadLoginDisplay": () => (/* binding */ pageLoadLoginDisplay),
/* harmony export */   "generateDOM": () => (/* binding */ generateDOM)
/* harmony export */ });
/* harmony import */ var _scripts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
const dayjs = __webpack_require__(13);


// Query Selectors
const userDropdown = document.querySelector('#dropdownContent');
const currentTrip = document.querySelector('#currentTrip');
const tripCategories = document.querySelector('#tripCategories');
const upcoming = document.querySelector('#upcoming');
const past = document.querySelector('#past');
const pending = document.querySelector('#pending');
const addTripForm = document.querySelector('#add-trip-form');
const tripFormDestinations = document.querySelector('#destinations');
const tripFormCalendar = document.querySelector('#calendar');
const travelerLogin = document.querySelector('#login');
const header = document.querySelector('header');
const main = document.querySelector('main');
const loginError = document.querySelector('#loginError');

// Event Listeners
tripCategories.addEventListener('change', toggleTripView);
addTripForm.addEventListener('keyup', displayCostEstimate);
addTripForm.addEventListener('change', displayCostEstimate);
travelerLogin.addEventListener('submit', (event) => {
  checkLogin(event);
});

// Event Handlers
function checkLogin(e) {
  e.preventDefault();
  const username = travelerLogin.elements[0].value;
  const splitUsername = username.split('r');
  const userID = parseInt(splitUsername[2]);
  const password = travelerLogin.elements[1].value;
  if (username.substring(0, 8) === 'traveler' && password === 'travel'
    && userID > 0 && userID <= 50) {
    header.style.display = 'flex';
    main.style.display = 'block';
    travelerLogin.style.display = 'none';
    travelerLogin.parentNode.style.display = 'none';
    (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.retrieveData)(userID);
  } else {
    travelerLogin.reset();
    loginError.innerText = 'Incorrect username or password. Please try again.';
  }
}

function displayCostEstimate() {
  const formValues = (0,_scripts__WEBPACK_IMPORTED_MODULE_0__.formatFormValues)();
  if (_scripts__WEBPACK_IMPORTED_MODULE_0__.travelerRepo.estimateTripCost(formValues)) {
    addTripForm.childNodes[3].innerText = 
      `Estimated Total Cost: $${_scripts__WEBPACK_IMPORTED_MODULE_0__.travelerRepo.estimateTripCost(formValues)}`
    addTripForm.childNodes[3].style.backgroundColor = '#fff';
  }
}

function toggleTripView() {
  switch (tripCategories.value) {
  case 'upcoming':
    upcoming.style.display = 'grid';
    past.style.display = 'none';
    pending.style.display = 'none';
    break;
  case 'past':
    upcoming.style.display = 'none';
    past.style.display = 'grid';
    pending.style.display = 'none';
    break;
  case 'pending':
    upcoming.style.display = 'none';
    past.style.display = 'none';
    pending.style.display = 'grid';
    break;
  }
}

// Functions
function pageLoadLoginDisplay() {
  header.style.display = 'none';
  main.style.display = 'none';
}

const generateDOM = () => {
  const traveler = _scripts__WEBPACK_IMPORTED_MODULE_0__.travelerRepo.currentTraveler;
  restrictCalendarMinDate();
  generateFormDestinations();
  displayUserInfo(traveler);
  displayCurrentTrip(traveler);
  generateTripCards(traveler);
  toggleTripView();
}

const restrictCalendarMinDate = () => {
  const tomorrow = new Date(new Date());
  tomorrow.setDate(tomorrow.getDate() + 1);
  tripFormCalendar.min = tomorrow.toISOString().substr(0, 10);
}

const generateFormDestinations = () => {
  tripFormDestinations.innerHTML = `
  <option hidden>Destinations</option>
  `;
  _scripts__WEBPACK_IMPORTED_MODULE_0__.travelerRepo.allDestinations.forEach(destination => {
    tripFormDestinations.innerHTML += `
    <option>${destination.destination}</option>
    `
  });
}

const displayUserInfo = (traveler) => {
  userDropdown.innerHTML = `
  <p>${traveler.name}</p>
  <p>I am a: ${traveler.travelerType}</p>
  <p>2021 Total Spend: $${traveler.myTrips.calculateTotalCostThisYear()}<p>
  `
}

const displayCurrentTrip = (traveler) => { 
  if (traveler.myTrips.categorizedTrips.present.length > 0) {
    const currentDestination = traveler.myTrips.categorizedTrips.present[0];
    currentTrip.childNodes[3].innerHTML = `
    <h3>${currentDestination.destination}<h3>
    <p>${dayjs(currentDestination.date)
    .format('M/D/YYYY')}, ${currentDestination.duration} days<p>
    <p>${currentDestination.travelers} travelers</p>
    `
  } else {
    currentTrip.childNodes[3].innerHTML = 
      '<p>You\'re not currently traveling. Time to book a trip!<p>'
  }
}

const generateTripCards = (traveler) => {
  const myTripCategories = Object.keys(traveler.myTrips.categorizedTrips);
  myTripCategories.splice(2, 1);
  myTripCategories.forEach(category => {
    if (!traveler.myTrips.categorizedTrips[category].length) {
      window[category].innerHTML = `
       <p>You don't have any ${category} trips!</p>
       `
    } else {
      window[category].innerHTML = '';
      traveler.myTrips.categorizedTrips[category].forEach(trip => {
        window[category].innerHTML += `
        <section id="${trip.id}">
          <span role="background-img-alt-text" aria-label="${trip.alt}"
            <div class="trip-info">
              <h3>${trip.destination}</h3>
              <p>${dayjs(trip.date).format('M/D/YYYY')}, 
                ${trip.duration} days<p>
              <p>${trip.travelers} travelers</p>
            </div>
          </span>
        </section>
        `
        addBackgroundImage(trip.id, trip.image)
      });
    }
  });
}

const addBackgroundImage = (id, img) => {
  const styles = {
    'background-image': `url(${img})`,
    'background-size': 'cover',
    'background-position': 'center',
    'filter': 'grayscale(100%)',
    'color': '#000'
  }
  const tripSection = document.getElementById(`${id}`);
  Object.assign(tripSection.style, styles);
} 



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map