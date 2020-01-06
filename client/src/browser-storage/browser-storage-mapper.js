const BrowserStorageMapper = function(entity) {
  this.entity = entity;
};

BrowserStorageMapper.prototype.toJson = function(value) {
  return JSON.parse(value);
};

BrowserStorageMapper.prototype.toString = function(value) {
  return JSON.stringify(value);
};

export { BrowserStorageMapper };
