// Node's crypto library is used here to create an MD5 hash of the users email address
const crypto = require('crypto');

// The Gravatar image service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// The size query. The chat needs 60px images
const query = 's=60';

/**
 * @description  Add a link to the Gravatar image of the users email address.
 * @returns {Function}
 */
module.exports = function() {
  return function(hook) {
    // The user email
    const { email } = hook.data;
    // Gravatar uses MD5 hashes from an email address to get the image
    const hash = crypto.createHash('md5').update(email).digest('hex');

    hook.data.avatar = `${gravatarUrl}/${hash}?${query}`;

    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
