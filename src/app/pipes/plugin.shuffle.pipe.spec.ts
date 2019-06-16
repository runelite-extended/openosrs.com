import {ShufflePluginsPipe} from './plugin.shuffle.pipe';
import {Plugins} from '../interfaces/plugins.interface';

function isSorted(a: Plugins[]) {
  for (let i = 0; i < a.length - 1; i++) {
    if (Number(a[i]['name']) > Number(a[i + 1]['name'])) {
      return false;
    }
  }

  return true;
}

describe('ShufflePluginsPipe', () => {
  const pluginJson = [
    {"name": "1" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "2" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "3" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "4" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "5" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "6" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "7" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "8" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "9" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "10", "image": "", "description": "", "categories": [""], "wiki": ""}
    ];

  let pipe: ShufflePluginsPipe;

  beforeEach(() => {
    pipe = new ShufflePluginsPipe();
  });

  describe('Fail safe =>', () => {
    it('Should return input when input is not an array', () => {
      expect(pipe.transform(null)).toEqual(null);
    });

    it('Should return empty string when parsing fails (undefined)', () => {
      expect(pipe.transform(undefined)).toEqual(undefined);
    });
  });

  describe('Success =>', () => {
    it('Should shuffle the input array', () => {
      expect(isSorted(pipe.transform(pluginJson))).toBeFalsy();
    });
  });
});
