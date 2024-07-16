import RNSInfo from 'react-native-sensitive-info';
import {Task} from '../component/addtask';

class encrypted {
  private options = {
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain',
  };
  private keys: string[] = [];
  constructor() {}

  async deleteSingleItems(key: string) {
    return await RNSInfo.deleteItem(key, this.options);
  }
  async deleteAllKeys() {
    for (const iterator of this.keys) {
      await this.deleteSingleItems(iterator);
    }
    return true;
  }

  async getAllItems() {
    return await RNSInfo.getAllItems(this.options);
  }

  async getSingleItem(key: string) {
    return await RNSInfo.getItem(key, this.options);
  }

  async setItems(key: string, value: Task[]) {
    let item: string = JSON.stringify(value);
    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }
    return await RNSInfo.setItem(key, item, this.options);
  }
}

const encryptedDetails = new encrypted();

export default encryptedDetails;
