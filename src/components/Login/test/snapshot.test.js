import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';
import { getLoginRequest } from '../../../app/slices/authenticateSlice';

jest.mock('react-redux', () => ({
    useSelector: () => jest.fn(fn => fn()),
    useDispatch: () => jest.fn()
}))

jest.mock('../../../app/slices/authenticateSlice')

const createWrapper = (value) => {
    getLoginRequest.mockReturnValue({ isLoading: false, error: null });
    
    return shallow(
        <Login/ >
    )
}

describe('Login snapshot tests', () => {
    it('should render login', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        expect(wrapper).toMatchSnapshot();
    })

    it('should render login with error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.'});

        expect(wrapper).toMatchSnapshot();
    })
})