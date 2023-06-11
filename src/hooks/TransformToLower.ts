interface MyObject {
  [key: string]: any;
}


export default function transformKeysToLowercase(arr: MyObject[]): MyObject[] {  return arr.map((obj) => {
    const transformedObj: MyObject = {};
    Object.keys(obj).forEach((key) => {
      transformedObj[key.toLowerCase()] = obj[key];
    });
    return transformedObj;
  });
}