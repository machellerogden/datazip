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

//const parser = require('fast-xml-parser');
//const he = require('he');
//const options = {
    //attributeNamePrefix: '', //"@_",
    //attrNodeName: "attrs", //default is 'false'
    //textNodeName: "text",
    //ignoreAttributes: false,
    ////ignoreNameSpace: false,
    //ignoreNameSpace: true,
    //allowBooleanAttributes: false,
    //parseNodeValue: true,
    ////parseAttributeValue: false,
    //trimValues: true,
    //cdataTagName: "__cdata", //default is 'false'
    //cdataPositionChar: "\\c",
    //localeRange: "", //To support non english character in tag/attribute values.
    //parseTrueNumberOnly: false,
    ////arrayMode: false, //"strict"
    ////arrayMode: "strict",
    //arrayMode: true,
    //tagValueProcessor: (val, tagName) => ({ tag: tagName, content: he.decode(val) }), //default is a=>a
    ////attrValueProcessor: (val, attrName) => ({ [attrName]: val })
    //attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }),//default is a=>a
    ////stopNodes: ["parse-me-as-string"]
//};

//const xmlData = '<a><b>c</b><b z="123">c</b><d>e</d></a>';
////if (parser.validate(xmlData) === true) { // optional (it'll return an object in case it's not valid)
//const jsonObj = parser.parse(xmlData, options);
//pprint(jsonObj);
//}
 
// IR
//const ir = parser.getTraversalObj(xmlData, options);
//pprint(ir);
//pprint(parser.convertToJson(ir, options));


//const xml2js = require('xml2js');
//const xmlData = '<a><b>c</b><b z="123">c</b><d>e</d></a>';


//(async () => {
    //const options = {
        //attrkey: 'attrs',
        //charkey: 'text',
        //valueProcessors: [(content, tag) => ({ content, tag })],
    //};
    //const result = await xml2js.parseStringPromise(xmlData, options);
    //pprint(result);
//})();

const xmlData = '<a><b>c</b><b z="123">c</b><d>e</d></a>';
const expat = require('node-expat')
const parser = new expat.Parser('UTF-8')
 
parser.on('startElement', (name, attrs) =>
    console.log(name, attrs));

parser.on('endElement', name =>
    console.log(name));

parser.on('text', text =>
    console.log(text));

parser.on('error', error =>
    console.error(error));

/**
#on('startElement' function (name, attrs) {})
#on('endElement' function (name) {})
#on('text' function (text) {})
#on('processingInstruction', function (target, data) {})
#on('comment', function (s) {})
#on('xmlDecl', function (version, encoding, standalone) {})
#on('startCdata', function () {})
#on('endCdata', function () {})
#on('entityDecl', function (entityName, isParameterEntity, value, base, systemId, publicId, notationName) {})
#on('error', function (e) {})
#stop() pauses
#resume() resumes
*/

parser.write(xmlData);



// TODO: poc https://www.npmjs.com/package/saxes
