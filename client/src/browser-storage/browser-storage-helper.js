const Storage = {
  session: sessionStorage,
  local: localStorage
};

const BrowserStorageHelper = function(storageType) {
  this.storage = Storage[storageType];
};

BrowserStorageHelper.prototype.set = function(key, value) {
  this.storage.setItem(key, value);
};

BrowserStorageHelper.prototype.get = function(key) {
  return this.storage.getItem(key);
};

BrowserStorageHelper.prototype.clear = function(key) {
  this.storage.removeItem(key);
};

export { BrowserStorageHelper };
