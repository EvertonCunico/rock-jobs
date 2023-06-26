export class EnumUtils {

  static getLabelValueArray(enumClass: any): { label: string; value: string }[] {
    return Object.keys(enumClass).map(key => ({ label: enumClass[key], value: key }));
  }

}

