import hook from 'css-modules-require-hook';
import sass from 'node-sass';

hook({
    extensions: ['.scss', '.css'],
    generateScopedName: '[name]__[local]___[hash:base64:5]',
    preprocessCss: (data, file) => sass.renderSync({ file }).css,
});
