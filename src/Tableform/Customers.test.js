import React from 'react'
import Customers from './Customers'
import axios from 'axios'

import renderer from 'react-test-renderer'
test('Customer Snapshot test', () => {
  axios('./db.json')
    .then((res) => {
      expect(res.statusText).toBe("OK");
    });
})
