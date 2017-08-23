/**
 * @description This hook sanitize the sanitize HTML input(truncate the messages text property to 400 characters and do
 * some basic HTML escaping), add the user that sent it and include the date the message has been created before saving
 * it in the database.
 * @param {Object} options
 * @returns {processMessage}
 */
module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function processMessage (hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const text = hook.data.text
    // Messages can't be longer than 400 characters so it is
      .substring(0, 400)
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

    // Override the original data
    hook.data = {
      text,
      // Set the user id
      userId: user._id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations (this is what any hook should return)
    return Promise.resolve(hook);
  };
};
