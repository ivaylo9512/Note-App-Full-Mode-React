import React from 'react';
import createSaga from 'redux-saga';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import authenticate, { registerRequest } from '../../../app/slices/authenticateSlice';
import registerWatcher from '../../../app/sagas/register';
import { shallow, mount } from 'enzyme';
import Register from '../Register';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import * as redux from 'react-redux';

const saga = createSaga();
const middleware = [...getDefaultMiddleware({ thunk: false }), saga];

const store = configureStore({
    reducer: {
        authenticate
    },
    middleware
})

saga.run(function*(){
    yield registerWatcher
})

global.fetch = jest.fn();

const user = { username: 'username', email: 'email@gmail.com', password: 'password', firstName: 'firstName', lastName: 'lastName', birth: '2020-02-02' };

const changeFirstPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');

    inputs.findByTestid('username').simulate('change', { target: { value: user.username } });
    inputs.findByTestid('email').simulate('change', { target: { value: user.email } });
    inputs.findByTestid('password').simulate('change', { target: { value: user.password } });
    inputs.findByTestid('repeatPassword').simulate('change', { target: { value: user.password } });

    return wrapper.find('input');
}

const changeSecondPageInputs = (wrapper) => {
    let inputs = wrapper.find('input');
        
    inputs.findByTestid('firstName').simulate('change', { target: { value: user.firstName } });
    inputs.findByTestid('lastName').simulate('change', { target: { value: user.lastName } });
    inputs.findByTestid('birth').simulate('change', { target: { value: user.birth } });

    return wrapper.find('input');
}

describe('Register integration tests', () => {

    const createWrapper = () => {
        return mount(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        )
    }

    it('should dispatch register return error change to page 0 and display errors', (done) => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setInterval(() => {
            wrapper.update();

            const usernameError = wrapper.findByTestid('usernameError');
            if(usernameError.length > 0){
                expect(usernameError.text()).toBe('Username is taken.')
                expect(wrapper.findByTestid('emailError').text()).toBe('Email is taken.')
                expect(wrapper.findByTestid('passwordError').text()).toBe('Password must be atleast 10 characters.')

                done();
            }
        }, 200)
    })

    it('should dispatch register return errors with page 1', (done) => {
        fetch.mockImplementationOnce(() => new Response(JSON.stringify(
            { firstName: 'You must provide first name.', lastName: 'You must provide last name.', country: 'You must provide country.', birth: 'You must provide birth date.'}), { status: 422 }))

        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        setInterval(() => {
            wrapper.update();

            const firstName = wrapper.findByTestid('firstNameError');
            if(firstName.length > 0){
                expect(firstName.text()).toBe('You must provide first name.')
                expect(wrapper.findByTestid('lastNameError').text()).toBe('You must provide last name.')
                expect(wrapper.findByTestid('birthError').text()).toBe('You must provide birth date.')

                done();
            }
        }, 200)
    })

    it('should dispatch register with inputs', () => {
        const mockedDispatch = jest.fn();
        const dispatchSpy = jest.spyOn(redux, 'useDispatch');
        dispatchSpy.mockReturnValue(mockedDispatch);

        const wrapper = createWrapper();
        
        changeFirstPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        changeSecondPageInputs(wrapper);
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    
        expect(mockedDispatch).toHaveBeenCalledWith(registerRequest(user));
    })

    it('should change inputs values page 0', () => {
        const wrapper = createWrapper();

        const inputs = changeFirstPageInputs(wrapper);

        expect(inputs.findByTestid('username').prop('value')).toBe(user.username);
        expect(inputs.findByTestid('email').prop('value')).toBe(user.email);
        expect(inputs.findByTestid('password').prop('value')).toBe(user.password);
        expect(inputs.findByTestid('repeatPassword').prop('value')).toBe(user.password);
    })

    it('should change inputs values page 1', () => {
        const wrapper = createWrapper();
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        const inputs = changeSecondPageInputs(wrapper);

        expect(inputs.findByTestid('firstName').prop('value')).toBe(user.firstName);
        expect(inputs.findByTestid('lastName').prop('value')).toBe(user.lastName);
        expect(inputs.findByTestid('birth').prop('value')).toBe(user.birth);
    })

})