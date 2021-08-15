import React from 'react';
import { getRegisterRequest } from '../../../../app/slices/authenticateSlice';
import Register from '../../Register';
import { shallow } from 'enzyme';
import InputWithError from '../../../InputWithError';
import { Link } from 'react-router-dom';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: jest.fn()
}))
jest.mock('../../../../app/slices/authenticateSlice')
const createWrapper = (value) => {
    getRegisterRequest.mockReturnValue(value);
    return shallow(<Register />)
}

describe('unit tests for Register', () =>{

    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        const inputs = wrapper.find(InputWithError);

        expect(inputs.length).toEqual(4);
        expect(wrapper.find('button').text()).toBe('next');

        expect(wrapper.findByTestid('usernameContainer').prop('input').props['data-testid']).toBe('username');
        expect(wrapper.findByTestid('emailContainer').prop('input').props.name).toBe('email');
        expect(wrapper.findByTestid('passwordContainer').prop('input').props.children[0].props.name).toBe('password');
        expect(wrapper.findByTestid('repeatPasswordContainer').prop('input').props.children[0].props.name).toBe('repeatPassword');
    })

    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
     
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = wrapper.find(InputWithError);
        const buttons = wrapper.find('button');

        expect(inputs.length).toEqual(4);
        expect(buttons.at(0).text()).toBe('back');
        expect(buttons.at(1).text()).toBe('register');

        expect(wrapper.findByTestid('firstNameContainer').prop('input').props.name).toBe('firstName');
        expect(wrapper.findByTestid('lastNameContainer').prop('input').props.name).toBe('lastName');
        expect(wrapper.findByTestid('countryContainer').prop('input').props.name).toBe('country');
        expect(wrapper.findByTestid('ageContainer').prop('input').props.name).toBe('age');
    })
})