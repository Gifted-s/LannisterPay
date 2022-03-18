const fcsReqBodyValidator = require('../../../src/helpers/validators/fcsReqBodyValidator');
const fakeValidFCSString = require('../../fixtures/fcsStringSample');

describe('FCS request body validator', () => {
  it('should return error message if the FeeConfigurationSpec field is missing ', () => {
    expect(fcsReqBodyValidator({})).toEqual({ error: '"FeeConfigurationSpec" is required' });
  });

  it('should return error message if the FeeConfigurationSpec field is set to empty string', () => {
    expect(fcsReqBodyValidator({ FeeConfigurationSpec: '' })).toEqual({ error: '"FeeConfigurationSpec" is not allowed to be empty' });
  });

  it('should return error message if the FeeConfigurationSpec field is set to null', () => {
    expect(fcsReqBodyValidator({ FeeConfigurationSpec: null })).toEqual({ error: '"FeeConfigurationSpec" must be a string' });
  });

  it('should return error message if the FeeConfigurationSpec field is set to undefined', () => {
    expect(fcsReqBodyValidator({ FeeConfigurationSpec: undefined })).toEqual({ error: '"FeeConfigurationSpec" is required' });
  });

  it('should return validated FeeConfigurationSpec if no error was found ', () => {
    expect(fcsReqBodyValidator({ FeeConfigurationSpec: fakeValidFCSString })).toEqual({
      value: {
        FeeConfigurationSpec: fakeValidFCSString
      }
    });
  });
});
