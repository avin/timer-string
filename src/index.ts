type DescType = 'd' | 'h' | 'm' | 's';
type Part = { numStr: string; descStr: string; descType?: DescType };

const cleanStr = (str: string): string => {
  return str.replace(/^\s+/, '').replace(/\s+$/, '').replace(/\s+/g, ' ');
};

const validateParts = (parts: Part[]): boolean => {
  let prevDescType: DescType | undefined | null = null;

  const totalDescTypes = parts.reduce((acc, part) => {
    if (part.descType) {
      acc += 1;
    }
    return acc;
  }, 0);

  if (totalDescTypes !== 0 && totalDescTypes !== parts.length) {
    return false;
  }

  if (parts.length > 4) {
    return false;
  }

  if (!totalDescTypes) {
    parts.map((part, idx) => {
      const p = parts.length - idx - 1;
      if (parts.length === 1) {
        part.descType = 'm';
      } else {
        if (p === 0) {
          part.descType = 's';
        }
        if (p === 1) {
          part.descType = 'm';
        }
        if (p === 2) {
          part.descType = 'h';
        }
        if (p === 3) {
          part.descType = 'd';
        }
      }

      return part;
    });
  }

  for (const part of parts) {
    if (!part.numStr) {
      return false;
    }

    if (!!totalDescTypes) {
      if (prevDescType === null) {
        prevDescType = part.descType;
      } else {
        if (prevDescType === 'd') {
          if (part.descType === 'd') {
            return false;
          }
        }

        if (prevDescType === 'h') {
          if (part.descType === 'd' || part.descType === 'h') {
            return false;
          }
        }

        if (prevDescType === 'm') {
          if (
            part.descType === 'd' ||
            part.descType === 'h' ||
            part.descType === 'm'
          ) {
            return false;
          }
        }

        if (prevDescType === 's') {
          return false;
        }

        prevDescType = part.descType;
      }
    }
  }

  return true;
};

export const stringToSeconds = (str: string): number | null => {
  str = cleanStr(str);

  const strParts = str.match(/\d+\D*/g);

  if (!strParts) {
    return null;
  }

  const parts = strParts.reduce((acc, substrings) => {
    const parts = substrings.match(/(\d+)(\D*)/);
    if (parts) {
      const numStr = cleanStr(parts[1] || '');
      const descStr = cleanStr(parts[2] || '');

      const descType: DescType | undefined = ((): DescType | undefined => {
        if (descStr && 'days'.startsWith(descStr)) {
          return 'd';
        }
        if (descStr && 'hours'.startsWith(descStr)) {
          return 'h';
        }
        if (descStr && 'minutes'.startsWith(descStr)) {
          return 'm';
        }
        if (descStr && 'seconds'.startsWith(descStr)) {
          return 's';
        }
        return undefined;
      })();

      acc.push({ numStr, descStr, descType });
    }
    return acc;
  }, [] as Part[]);

  const isValid = validateParts(parts);

  if (!isValid) {
    return null;
  }

  return parts.reduce((acc, part) => {
    const num = Number(part.numStr);

    if (part.descType === 'd') {
      acc += 60 * 60 * 24 * num;
    }
    if (part.descType === 'h') {
      acc += 60 * 60 * num;
    }
    if (part.descType === 'm') {
      acc += 60 * num;
    }
    if (part.descType === 's') {
      acc += num;
    }
    return acc;
  }, 0);
};

export const stringToMilliseconds = (str: string): number | null => {
  const result = stringToSeconds(str);
  if (result === null) {
    return null;
  }
  return result * 1000;
};

export const secondsToString = (n: number): string => {
  const seconds = n % 60;
  const minutes = Math.floor((n % (60 * 60)) / 60);
  const hours = Math.floor((n % (60 * 60 * 24)) / 60 / 60);
  const days = Math.floor(n / 60 / 60 / 24);

  let result = '';
  if (days) {
    result += `${days} ${days === 1 ? 'day' : 'days'} `;
  }
  if (hours || days) {
    result += `${hours} ${hours === 1 ? 'hour' : 'hours'} `;
  }
  if (minutes || hours || days) {
    result += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} `;
  }
  if (seconds || minutes || hours || days) {
    result += `${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
  }

  result = cleanStr(result);

  return result;
};

export const millisecondsToString = (n: number): string => {
  return secondsToString(n / 1000);
};
