import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from 'tns-core-modules/ui/enums';

export default class GeoLoc {
  public static async getPermissions() {
    try {
      await geolocation.enableLocationRequest();
      return true;
    } catch {
      alert('Zezwól na dostęp do GPS!');
      return false;
    }
  }

  public static async getLocation() {
    return await geolocation.getCurrentLocation({
      desiredAccuracy: Accuracy.high,
      maximumAge: 5000,
      timeout: 20000,
    });
  }
}
