module.exports = function toWritableGlobal(globals) {
  if (Array.isArray(globals)) {
    return Object.fromEntries(globals.map((global) => [global, 'writable']));
  }

  if (!globals || typeof globals !== 'object') {
    return {};
  }

  return globals;
};
