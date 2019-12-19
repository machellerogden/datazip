'use strict';

const expat = require('node-expat')
const { isEmpty, pprint } = require('./util');
const debug = (...a) => process.env.DATAZIP_DEBUG && pprint(...a);

process.env.DATAZIP_DEBUG = true;

function Parser() {

    const parser = new expat.Parser('UTF-8')

    function parse(xmlString) {

        return new Promise((resolve, reject) => {

            let depth = 0;
            let tree = { content: [] };
            let stack = [ tree ];

            const cursor = () => stack.length ? stack[stack.length - 1] : stack[0];
            const insert = node => cursor().content.push(node);
            const next = node => stack.push(node);
            const pop = node => stack.pop();

            parser.on('startElement', (tag, attrs) => {
                debug('@startElement:', tag, attrs);
                depth++;
                const node = { tag, attrs, content: [] };
                insert(node);
                next(node);
            });

            parser.on('endElement', name => {
                debug('@endElement:', name);
                if (!--depth) return resolve(tree.content);
                pop();
            });

            parser.on('text', text => {
                debug('@text:', text);
                cursor().text = text;
            });

            parser.on('processingInstruction', (target, data) => {
                debug('@processingInstruction:', target, data);
            });

            parser.on('comment', s => {
                debug('@comment:', s);
            });

            parser.on('xmlDecl', (version, encoding, standalone) => {
                debug('@xmlDecl:', version, encoding, standalone);
            });

            parser.on('startCdata', () => {
                debug('@startCdata');
            });

            parser.on('endCdata', () => {
                debug('@endCdata');
            });

            parser.on('entityDecl', (entityName, isParameterEntity, value, base, systemId, publicId, notationName) => {
                debug('@entityDecl:', entityName, isParameterEntity, value, base, systemId, publicId, notationName);
            });

            parser.on('error', e => {
                debug('@error:', e);
                return reject(e);
            });

            parser.write(xmlString);

        });


    }

    return { parse };
}

module.exports = { Parser };

//(async function () {
    //pprint(await Parser().parse('<a><b>c</b><b>d</b><b><p>e</p></b></a>'));
//})();
