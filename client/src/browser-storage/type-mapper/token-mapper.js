import { BrowserStorageMapper } from "browser-storage/browser-storage-mapper";

export const tokenMapper = new BrowserStorageMapper({
  token: "string"
});
