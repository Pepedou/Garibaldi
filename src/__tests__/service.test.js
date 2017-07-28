/* eslint-env jest */
import fetch from 'node-fetch';

describe('#Service call', () => {
    expect.assertions(1);
    it('should load data', () => {
       return fetch('http://localhost:3001/api/Credentials/')
        .then(res => res.json())
        .then(body => { expect(body).toBeInstanceOf(Array);});
    });
});
