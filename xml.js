'use strict';

const { pipe, pprint, partialRight } = require('./util');
const {
    zipper,
    arrayZip,
    xmlZip,
    node,
    isBranch,
    children,
    makeNode,
    path,
    lefts,
    rights,
    down,
    up,
    isEnd,
    root,
    right,
    rightmost,
    left,
    leftmost,
    insertRight,
    insertLeft,
    replace,
    edit,
    insertChild,
    appendChild,
    next,
    prev,
    remove
} = require('.');

/**
 * where in we play with xml zippers
 */

const parser = require('fast-xml-parser');
const he = require('he');
const options = {
    attributeNamePrefix: '', //"@_",
    attrNodeName: "attrs", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    //ignoreNameSpace: false,
    ignoreNameSpace: true,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    //parseAttributeValue: false,
    trimValues: true,
    //cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    arrayMode: false, //"strict"
    //arrayMode: "strict",
    //arrayMode: true,
    tagValueProcessor: (val, tagName) => ({ tag: tagName, content: he.decode(val) }), //default is a=>a
    //attrValueProcessor: (val, attrName) => ({ [attrName]: val })
    attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    //stopNodes: ["parse-me-as-string"]
};
 
const xmlData = '<a><b>c</b><b z="123">c</b><d>e</d></a>';
//if (parser.validate(xmlData) === true) { // optional (it'll return an object in case it's not valid)
const jsonObj = parser.parse(xmlData, options);
//pprint(jsonObj);
//}
 
// IR
//const ir = parser.getTraversalObj(xmlData, options);
//pprint(ir);
//pprint(parser.convertToJson(ir, options));
