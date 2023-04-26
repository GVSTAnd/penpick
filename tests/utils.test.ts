import { capitalizeText } from "../src/routes/utils";
import {expect, test} from '@jest/globals';

test('Test capitalizeText: nirvana', () => {
    expect(capitalizeText('nirvana')).toBe('Nirvana');
  });

test('Test capitalizeText: nirVANA', () => {
expect(capitalizeText('nirVANA')).toBe('Nirvana');
});

test('Test capitalizeText: NIRVANa', () => {
expect(capitalizeText('NIRVANa')).toBe('Nirvana');
});
