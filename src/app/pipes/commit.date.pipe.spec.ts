import { CommitDatePipe } from './commit.date.pipe';

describe('CommitDatePipe', () => {
  let pipe: CommitDatePipe;

  beforeEach(() => {
    pipe = new CommitDatePipe();
  });

  describe('Fail safe =>', () => {
    it('Should return the default value if it fails parsing', () => {
      expect(pipe.transform('test')).toBe('test');
    });
  });

  describe('Success =>', () => {
    it('Should return locale date when valid date is supplied', () => {
      expect(pipe.transform('2019-05-23T00:00:00Z')).toBe(new Date('2019-05-23T00:00:00Z').toLocaleDateString());
    });
  });
});
