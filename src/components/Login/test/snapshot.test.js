import React from 'react';
import Login from '../Login';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';

describe('Login snapshot tests', () => {
    let selectorSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
    
        const spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
        spyOnUseDispatch.mockReturnValue(jest.fn());
    });

    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        return shallow(
            <Login />
        )
    }

    it('should render login', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(wrapper).toMatchSnapshot();
    });

    it('should render login with error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials. '});

        expect(wrapper).toMatchSnapshot();
    });
});