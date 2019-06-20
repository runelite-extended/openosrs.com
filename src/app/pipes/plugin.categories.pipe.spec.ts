import { PluginCategoriesPipe } from './plugin.categories.pipe';

describe('PluginCategoriesPipe', () => {
  let pipe: PluginCategoriesPipe;

  beforeEach(() => {
    pipe = new PluginCategoriesPipe();
  });

  describe('Fail safe =>', () => {
    it('Should return empty string when parsing fails (null)', () => {
      expect(pipe.transform(null)).toEqual('');
    });

    it('Should return empty string when parsing fails (undefined)', () => {
      expect(pipe.transform(undefined)).toEqual('');
    });
  });

  describe('Success =>', () => {
    it('Should return \'Category\' and the value when one value is given', () => {
      expect(pipe.transform(['test'])).toEqual('Category: test');
    });

    it('Should return \'Categories\' and the value when multiple values are given (2)', () => {
      expect(pipe.transform(['test', 'test 2'])).toEqual('Categories: test, test 2');
    });

    it('Should return \'Categories\' and the value when multiple values are given (5)', () => {
      expect(pipe.transform(['test', 'test 2', 'test 3', 'test 4', 'test 5'])).toEqual('Categories: test, test 2, test 3, test 4, test 5');
    });
  });
});
