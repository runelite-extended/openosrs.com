import { PluginCategoryFilterPipe } from './plugin.category.filter.pipe';

describe('PluginCategoriesPipe', () => {
  const pluginJson = [
    { name: '1', image: '', description: '', categories: ['PvM', 'UC'], wiki: '' },
    { name: '2', image: '', description: '', categories: ['PvP', 'uc'], wiki: '' },
    { name: '3', image: '', description: '', categories: ['Skilling', 'Stub', 'Uc'], wiki: '' },
    { name: '4', image: '', description: '', categories: ['Stub', 'uC'], wiki: '' }
  ];

  let pipe: PluginCategoryFilterPipe;

  beforeEach(() => {
    pipe = new PluginCategoryFilterPipe();
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
    it('Should return plugins containing the filter (PvM) => 1', () => {
      expect(pipe.transform(pluginJson, 'PvM').length).toEqual(1);
    });

    it('Should return plugins containing the filter (PvP) => 1', () => {
      expect(pipe.transform(pluginJson, 'PvP').length).toEqual(1);
    });

    it('Should return plugins containing the filter (Skilling) => 1', () => {
      expect(pipe.transform(pluginJson, 'Skilling').length).toEqual(1);
    });

    it('Should return plugins containing the filter (All) => 4', () => {
      expect(pipe.transform(pluginJson, 'All').length).toEqual(4);
    });

    it('Should return plugins containing the filter (Stub) => 2', () => {
      expect(pipe.transform(pluginJson, 'Stub').length).toEqual(2);
    });

    it('Should filter case insensitive', () => {
      expect(pipe.transform(pluginJson, 'uc').length).toEqual(4);
    });
  });
});
