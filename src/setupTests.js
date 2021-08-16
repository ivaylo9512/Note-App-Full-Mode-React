import Enzyme, { ReactWrapper, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

function findByTestid(id){
  return this.find(`[data-testid='${id}']`)
}
ReactWrapper.prototype.findByTestid = findByTestid;
ShallowWrapper.prototype.findByTestid = findByTestid;