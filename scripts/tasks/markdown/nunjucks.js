'use strict';

module.exports = function nunjucksPlugin(md) {
  md.renderer.rules.nunjucks = tokenizeNunjucks(md);
  md.block.ruler.before('paragraph', 'nunjucks', nunjucksEmbed());
};

function nunjucksEmbed() {
  return function (state, startLine, endLine, silent) {
    var token;
    var pos = state.bMarks[startLine] + state.tShift[startLine];
    var max = state.eMarks[startLine];

    if (silent) {
      return false;
    }

    var currentBlock = state.src.slice(pos, pos + max);

    // When we add more services, (youtube) might be (youtube|vimeo|vine), for example
    var EMBED_REGEX = /\{\%[\s]*(.*?)[\s]*[\%\}]/im;

    // Block must start with {%
    if (currentBlock.charCodeAt(0) !== 0x7b || currentBlock.charCodeAt(1) !== 0x25) {
      return false;
    }

    var match = EMBED_REGEX.exec(currentBlock);

    if (!match) {
      return false;
    }

    var template = match[1];

    state.pos = state.pos + state.src.indexOf('}') + 1;
    state.posMax = state.tokens.length;

    // token = state.push('styleguide_open', 'div', 1);
    token = state.push('nunjucks', '', 0);
    // token = state.push('styleguide_close', 'div', -1);
    token.template = template;
    token.block = true;

    state.line ++;
    return true;
  };
}

function tokenizeNunjucks(md) {
  return function (tokens, idx) {
    var template = md.utils.escapeHtml(tokens[idx].template);
    console.log(template);
    return '{% ' + template + ' %}\n';
  };
}
