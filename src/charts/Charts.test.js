import React from 'react'
import Charts from './Charts';

import renderer from 'react-test-renderer'
test('Charts snapshot test ', async () => {
    const component = renderer.create(
        <Charts />
    ).getInstance();
    await component.getdata()
    expect(component.state.isloading).toBe(true)

})


