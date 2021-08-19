import Register from '../Register';
import { shallow } from 'enzyme';
import InputWithError from '../../InputWithError';
import * as redux from 'react-redux';
import { Link } from 'react-router-dom';

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

    it('should pass error props with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: { username: 'Username is taken.', email: 'Email is taken.', password: 'Password must be atleast 10 characters long.' }});

        expect(wrapper.findByTestid('usernameContainer').prop('error')).toBe('Username is taken.');
        expect(wrapper.findByTestid('emailContainer').prop('error')).toBe('Email is taken.');
        expect(wrapper.findByTestid('passwordContainer').prop('error')).toBe('Password must be atleast 10 characters long.');
    })

    it('should pass error props with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: { firstName: 'First name is required.', lastName: 'Last name is required.', birth: 'Birth is required.' }});
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});

        expect(wrapper.findByTestid('firstNameContainer').prop('error')).toBe('First name is required.');
        expect(wrapper.findByTestid('lastNameContainer').prop('error')).toBe('Last name is required.');
        expect(wrapper.findByTestid('birthContainer').prop('error')).toBe('Birth is required.');
    })

    it('should render inputs, with page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.find(InputWithError).length).toEqual(4);
        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })

    it('should render inputs with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.find(InputWithError).length).toEqual(3);
        expect(wrapper.findByTestid('firstNameContainer').length).toBe(1);
        expect(wrapper.findByTestid('lastNameContainer').length).toBe(1);
        expect(wrapper.findByTestid('birthContainer').length).toBe(1);
    })

    it('should render inputs with page 0 when back button is clicked', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
        wrapper.findByTestid('back').simulate('click', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('usernameContainer').length).toBe(1);
        expect(wrapper.findByTestid('emailContainer').length).toBe(1);
        expect(wrapper.findByTestid('passwordContainer').length).toBe(1);
        expect(wrapper.findByTestid('repeatPasswordContainer').length).toBe(1);
    })

    it('should render button page 0', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        expect(wrapper.findByTestid('next').length).toBe(1);
        expect(wrapper.findByTestid('next').prop('type')).toBe('submit');
    })


    it('should render buttons with page 1', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });
        wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

        expect(wrapper.findByTestid('back').length).toBe(1);
        expect(wrapper.findByTestid('register').length).toBe(1);
        expect(wrapper.findByTestid('register').prop('type')).toBe('submit');
    })

    it('should render redirect', () => {
        const wrapper = createWrapper({ isLoading: false, error: null });

        const redirect = wrapper.findByTestid('redirect');

        expect(redirect.text()).toBe('Already have an account? Log in.');
        expect(redirect.find(Link).text()).toBe(' Log in.');
        expect(redirect.find(Link).prop('to')).toBe('/login');
    })
})