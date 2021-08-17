import React from 'react';
import Register from '../Register';
import { shallow } from 'enzyme';
import InputWithError from '../../InputWithError';
import * as redux from 'redux';

describe('unit tests for Register', () =>{
    let selectorSpy;
    let dispatchSpy;

    beforeAll(() => {
        selectorSpy = jest.spyOn(redux, 'useSelector');
        dispatchSpy = jest.spyOn(redux, 'useDispatch');

        dispatchSpy.mockReturnValue(jest.fn());
    })
    const createWrapper = (state) => {
        selectorSpy.mockReturnValue(state);
        
        return shallow(
            <Register /> 
        )
    }

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

        expect(inputs.length).toEqual(3);
        expect(buttons.at(0).text()).toBe('back');
        expect(buttons.at(1).text()).toBe('register');

        expect(wrapper.findByTestid('firstNameContainer').prop('input').props.name).toBe('firstName');
        expect(wrapper.findByTestid('lastNameContainer').prop('input').props.name).toBe('lastName');
        expect(wrapper.findByTestid('countryContainer').prop('input').props.name).toBe('country');
        expect(wrapper.findByTestid('ageContainer').prop('input').props.name).toBe('age');
    })
})