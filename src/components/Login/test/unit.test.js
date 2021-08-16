import React from 'react';
import { loginRequest, getLoginRequest, getRegisterRequest } from '../../../app/slices/authenticateSlice';
import { shallow } from 'enzyme';
import Login from '../Login';

jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockImplementation(fn => fn()),
    useDispatch: () => jest.fn()
}))

jest.mock('../../../app/slices/authenticateSlice')

const createWrapper = (state) => {
    getRegisterRequest.mockReturnValue(state);

    return shallow(
        <Login />
    )
}

describe('Login unit tests', () => {
    it('should render inputs', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find('input').length).toBe(2);
        expect(wrapper.findByTestid('username').length).toBe(1);
        expect(wrapper.findByTestid('password').length).toBe(1);
    })

    it('should call dispatch login with input values', () => {
        const mockDispatch = jest.fn();
        const spy = jest.spyOn(Redux, 'useDispatch');
        spy.mockReturnValue(mockDispatch);

        const wrapper = createWrapper({ isLoading: false, error: null});

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username'} });
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password'} });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(mockDispatch).toHaveBeenCalledWith(loginRequest({ username: 'username', password: 'password'}));
    })

    
    it('should render error', () => {
        const wrapper = createWrapper({ isLoading: false, error: 'Bad credentials.' });

        expect(wrapper.findByTestid('error').text()).toBe('Bad credentials.');
    })

    it('should change input values', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        wrapper.findByTestid('username').simulate('change', { target: { value: 'username'} });
        wrapper.findByTestid('password').simulate('change', { target: { value: 'password'} });
        
        expect(wrapper.findByTestid('username').prop('value')).toBe('username'); 
        expect(wrapper.findByTestid('password').prop('value')).toBe('password'); 

    })

    it('should render button', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('login').length).toBe(1); 
        expect(wrapper.findByTestid('login').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('redirect').find(Link).prop('to')).toBe('/register');
        expect(wrapper.findByTestid('redirect').text()).toBe(`Don't have an account? Sign up.`);
    })
})