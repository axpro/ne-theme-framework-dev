var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var fm = require('front-matter');

module.exports = StyleguideExtension;

function StyleguideExtension(base, env) {
  this.tags = ['styleguide'];
  this.base = base;
  this.env = env;

  this.parse = function parse(parser, nodes) {
    var token = parser.nextToken();
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(token.value);
    return new nodes.CallExtension(this, 'run', args);
  };

  this.run = function run(context, args) {
    // Set paths variables
    var tpl = path.resolve(this.base, args);
    /*
    var relativeFolder = path.relative(
      path.resolve(process.cwd(), 'src'),
      path.dirname(tpl)
    );
    */
    // var buildFolder = path.resolve('build', relativeFolder);
    var buildFile = path.basename(tpl);

    // Load template
    var data = fs.readFileSync(tpl, 'utf8');
    var content = fm(data);

    // Create frame
    /*
    var frame = this.env.render(path.resolve(__dirname, './frame.html'), {
      content: content.body
    });

    // Write frame file
    mkdirp.sync(buildFolder);
    fs.writeFileSync(path.resolve(buildFolder, buildFile), frame);*/

    // Get sources (SCSS, JS)
    var scriptsToInclude = [];

    if (content.attributes.scripts) {
      scriptsToInclude = Array.isArray(content.attributes.scripts) ?
        content.attributes.scripts :
        [content.attributes.scripts];
    }

    var scripts = [];
    scriptsToInclude.forEach(file => {
      var scriptContent = fs.readFileSync(path.resolve(tpl, '..', file));
      scripts.push({
        content: scriptContent
      });
    });

    // Render the whole styleguide section
    return this.env.render(path.resolve(__dirname, './template.html'), {
      markup: content.body,
      scripts: scripts,
      url: '/templates/' + buildFile,
      iframeHeight: content.attributes.height || '3Opx'
    });
  };
}
