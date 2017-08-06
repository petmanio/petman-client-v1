import { EllipsisPipe } from './ellipsis.pipe';

describe('Pipe: Ellipsis', () => {
  let pipe: EllipsisPipe;
  const longStr = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam ab similique';
  const shortStr = 'Lorem ipsum dolor sit amet, consectetur adipisicin';
  beforeEach(() => {
    pipe = new EllipsisPipe();
  });

  it('should return the string if it\'s length is less than 50', () => {
    expect(pipe.transform('string')).toEqual('string');
  });

  it('should return the up to 50 characters followed by an ellipsis', () => {
    expect(pipe.transform(longStr)).toEqual(`${shortStr}...`);
  });
});
