const BrowserStorageMapper = function(entity) {
  this.entity = entity;
};

BrowserStorageMapper.prototype.toJson = function(value) {
  return JSON.parse(value);
};

BrowserStorageMapper.prototype.toString = function(value) {
  const result = Object.keys(this.entity).reduce((pre, cur) => {
    pre[cur] = value;
    return pre;
  }, {});
  return JSON.stringify(result);
};

export { BrowserStorageMapper };
