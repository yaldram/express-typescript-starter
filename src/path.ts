import * as moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@api': `${__dirname}/api`,
  '@utils': `${__dirname}/utils`,
  '@middlewares': `${__dirname}/middlewares`,
  '@config': `${__dirname}/config`,
});
