export class EnumUtils {

  static getLabelValueArray(enumClass: any): { label: string; value: string }[] {
    return Object.keys(enumClass).map(key => ({ label: enumClass[key], value: key }));
  }

  static getLabelValueArrayComIgnore(enumClass: any, itemsIgnore: string[]): { label: string; value: string }[] {
    return Object.keys(enumClass).filter(item => !itemsIgnore.includes(enumClass[item])).map(key => ({ label: enumClass[key], value: key }));
  }

}

