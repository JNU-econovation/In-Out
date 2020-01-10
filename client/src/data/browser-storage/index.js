import { BrowserStorageHelper } from "./browser-storage-helper";

const BrowserStorage = function(key, storageType, mapper) {
  this.key = key;
  this.helper = new BrowserStorageHelper(storageType);
  this.mapper = mapper;
};

BrowserStorage.prototype.set = function(value) {
  this.helper.set(this.key, this.mapper.toString(value));
};

BrowserStorage.prototype.get = function() {
  const item = this.helper.get(this.key);
  return this.mapper.toJson(item);
};

BrowserStorage.prototype.remove = function() {
  this.helper.clear(this.key);
};

export { BrowserStorage };
