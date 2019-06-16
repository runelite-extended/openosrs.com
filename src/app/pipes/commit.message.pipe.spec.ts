import {CommitMessagePipe} from './commit.message.pipe';

describe('CommitDatePipe', () => {
  let pipe: CommitMessagePipe;

  beforeEach(() => {
    pipe = new CommitMessagePipe();
  });

  describe('Fail safe =>', () => {
    it('Should return the default value if it fails matching', () => {
      expect(pipe.transform('test')).toEqual('test');
    });
  });

  describe('Success =>', () => {
    it('Should return first line of the commit message (\\n)', () => {
      expect(pipe.transform('test\ntest')).toEqual('test');
    });

    it('Should return first line of the commit message (\\r\\n)', () => {
      expect(pipe.transform('test\r\ntest')).toEqual('test');
    });

    it('Should should add a new line when only reset caret is found (\\r)', () => {
      expect(pipe.transform('test\rtest')).toEqual('test\rtest');
    });
  });
});
