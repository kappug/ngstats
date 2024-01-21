export function snakeTocamel<T>(thing: any): T {
  if (typeof thing === "string")
    return thing.replace(/(_\w)/g, (m) => m[1]!.toUpperCase()) as any;

  if (Array.isArray(thing)) {
    let newArray: any[] = [];

    for (let index in thing) {
      newArray.push(snakeTocamel(thing[index]));
    }

    return newArray as any;
  }

  if (typeof thing === "object") {
    let newObject: any = {};

    for (const key in thing) {
      newObject[snakeTocamel(key) as any] =
        typeof thing[key] === "object" ? snakeTocamel(thing[key]) : thing[key];
    }

    return newObject as any;
  }

  return thing;
}

export function camelToSnake<T>(thing: T) {
  if (typeof thing === "string")
    return thing.replace(/([A-Z])/g, (m) => "_" + m[0]!.toLowerCase());

  if (Array.isArray(thing)) {
    const newArray: any[] = [];

    for (let index in thing) {
      newArray.push(camelToSnake(thing[index]));
    }

    return newArray;
  }

  if (typeof thing === "object") {
    const newObject: any = {};

    for (const key in thing) {
      if (Array.isArray(thing[key])) {
        newObject[camelToSnake(key)] = [];

        for (let index in thing[key]) {
          newObject[camelToSnake(key)].push(camelToSnake(thing[key][index]));
        }
      } else {
        newObject[camelToSnake(key)] =
          typeof thing[key] === "object"
            ? camelToSnake(thing[key])
            : thing[key];
      }
    }

    return newObject;
  }

  return thing;
}

export function stripString(string: string) {
  return string.replace(/§./g, "");
}

export function generateXpProgressString(xp: number, requiredXp: number) {
  const percentage = xp / requiredXp;

  const segments = Math.floor(percentage * 10);

  let progressBar = "";

  for (let i = 0; i < segments; i++) {
    progressBar += "▒";
  }

  for (let i = 0; i < 10 - segments; i++) {
    progressBar += "░";
  }

  return progressBar;
}
