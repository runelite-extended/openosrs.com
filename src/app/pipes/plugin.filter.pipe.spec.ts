import {Plugins} from '../interfaces/plugins.interface';
import {PluginFilterPipe} from './plugin.filter.pipe';

describe('PluginFilterPipe', () => {
  const pluginJson = [
    {"name": "1" , "image": "", "description": "test", "categories": [""], "wiki": ""},
    {"name": "2" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "3" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "4" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "5 test" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "6" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "7" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "8" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "9" , "image": "", "description": "", "categories": [""], "wiki": ""},
    {"name": "10", "image": "", "description": "", "categories": [""], "wiki": ""}
    ];

  let pipe: PluginFilterPipe;

  beforeEach(() => {
    pipe = new PluginFilterPipe();
  });

  describe('Fail safe =>', () => {
    it('Should return input when input is not an array (null)', () => {
      expect(pipe.transform(null, 'test')).toEqual(null);
    });
    it('Should return input when input is not an array (undefined)', () => {
      expect(pipe.transform(undefined, 'test')).toEqual(undefined);
    });

    it('Should return input when filter is not a string (null)', () => {
      expect(pipe.transform(pluginJson, null)).toEqual(pluginJson);
    });

    it('Should return input when filter is not a string (undefined)', () => {
      expect(pipe.transform(pluginJson, undefined)).toEqual(pluginJson);
    });
  });

  describe('Success =>', () => {
    it('Should return plugins containing the filter (test) => 2', () => {
      expect(pipe.transform(pluginJson, 'test').length).toEqual(2);
    });

    it('Should return plugins containing the filter (TEST) => 2', () => {
      expect(pipe.transform(pluginJson, 'TEST').length).toEqual(2);
    });

    it('Should return plugins containing the filter (testing) => 0', () => {
      expect(pipe.transform(pluginJson, 'testing').length).toEqual(0);
    });

    it('Should return plugins containing the filter (TESTING) => 0', () => {
      expect(pipe.transform(pluginJson, 'TESTING').length).toEqual(0);
    });
  });
});
