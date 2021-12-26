import {
  millisecondsToString,
  secondsToString,
  stringToMilliseconds,
  stringToSeconds,
} from '../src';

describe('stringToSeconds', () => {
  it('test validation', () => {
    expect(stringToSeconds('40s 40')).toBe(null);
    expect(stringToSeconds('40s 40m')).toBe(null);
    expect(stringToSeconds('40h 40s 40m')).toBe(null);

    expect(stringToSeconds('40')).not.toBe(null);
    expect(stringToSeconds('40 40')).not.toBe(null);
    expect(stringToSeconds('40 40 40')).not.toBe(null);
    expect(stringToSeconds('40 40 40 40')).not.toBe(null);
    expect(stringToSeconds('40h 40m 40s')).not.toBe(null);
    expect(stringToSeconds('40m 40s')).not.toBe(null);
    expect(stringToSeconds('40h')).not.toBe(null);
    expect(stringToSeconds('40m')).not.toBe(null);
    expect(stringToSeconds('40s')).not.toBe(null);
  });

  it('var strings', () => {
    expect(stringToSeconds('40 se')).toBe(40);
    expect(stringToSeconds('40 min')).toBe(40 * 60);
    expect(stringToSeconds('40 ho')).toBe(40 * 60 * 60);
    expect(stringToSeconds('10 min 20sec')).toBe(10 * 60 + 20);
  });

  it('test calculation', () => {
    expect(stringToSeconds('40')).toBe(40 * 60);
    expect(stringToSeconds('40 40')).toBe(40 * 60 + 40);
    expect(stringToSeconds('40 40 40')).toBe(40 * 60 * 60 + 40 * 60 + 40);
    expect(stringToSeconds('40h 40 m 40s')).toBe(40 * 60 * 60 + 40 * 60 + 40);
    expect(stringToSeconds('40m 40s')).toBe(40 * 60 + 40);
    expect(stringToSeconds('40h')).toBe(40 * 60 * 60);
    expect(stringToSeconds('40m')).toBe(40 * 60);
    expect(stringToSeconds('40s')).toBe(40);
  });
});

describe('stringToMilliseconds', () => {
  it('test', () => {
    expect(stringToMilliseconds('40')).toBe(40 * 60 * 1000);
  });
});

describe('secondsToString', () => {
  it('test', () => {
    expect(secondsToString(10)).toBe('10 seconds');
    expect(secondsToString(62)).toBe('1 minute 2 seconds');
    expect(secondsToString(120)).toBe('2 minutes 0 seconds');
    expect(secondsToString(120 * 60)).toBe('2 hours 0 minutes 0 seconds');
    expect(secondsToString(120 * 60 * 24)).toBe(
      '2 days 0 hours 0 minutes 0 seconds'
    );

    expect(secondsToString(120 * 60 * 24 + 1)).toBe(
      '2 days 0 hours 0 minutes 1 second'
    );
    expect(secondsToString(120 * 60 * 24 + 1 + 60)).toBe(
      '2 days 0 hours 1 minute 1 second'
    );
    expect(secondsToString(120 * 60 * 24 + 1 + 60 + 60 * 60)).toBe(
      '2 days 1 hour 1 minute 1 second'
    );
  });
});

describe('millisecondsToString', () => {
  it('test', () => {
    expect(millisecondsToString(10 * 1000)).toBe('10 seconds');
  });
});
