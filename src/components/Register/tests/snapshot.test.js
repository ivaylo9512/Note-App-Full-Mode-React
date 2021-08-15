import React from 'react';
import Register from '../Register';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getRegisterRequest } from '../../../app/slices/authenticateSlice';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(fn => fn()),
    useDispatch: () => jest.fn(),
}));

jest.mock('../../../app/slices/authenticateSlice');

const createWrapper = (state) => {
    getRegisterRequest.mockReturnValue(state);
    return shallow(<Register /> )
}
describe("RegisterSnapshotTests", () => {
    it('renders correctly page 0', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
     
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders correctly page 1', () => {
        const wrapper = createWrapper({isLoading: false, error: null});
    
        const form = wrapper.find('form');
        form.simulate('submit', { target: form, preventDefault: jest.fn() });

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});