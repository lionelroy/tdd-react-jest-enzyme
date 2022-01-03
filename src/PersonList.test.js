import React from 'react';
import { shallow } from 'enzyme';
import PersonList from './PersonList';

describe('PersonList', () => {
  it('renders a ul element', () => {
    const personListWrapper = shallow(<PersonList />);
    const peopleListUls = personListWrapper.find('ul');

    expect(peopleListUls).toHaveLength(1);
  })

  it('renders no li element when no people exists', () => {
    // const people = [];
    // const personListWrapper = shallow(<PersonList people={people} />);
    // const peopleListItems = personListWrapper.find('li');
    // expect(peopleListItems).toHaveLength(0);

    // You can refactor the whole block of code above to the following.
    // *******IMPORTANT*****every test still passes but the code is not readable.
    expect(shallow(<PersonList people={[]} />).find('li')).toHaveLength(0);
  })

  it('render 1 li element when 1 person exists', () => {
    const people = [{firstName: 'Lionel', lastName: 'Mudpudel'}];
    const personListWrapper = shallow(<PersonList people={people} />);
    const peopleListItems = personListWrapper.find('li');

    expect(peopleListItems).toHaveLength(1);  
  })

  it('render multiple elements when more than 1 person exists', () => {
    const people = [
      {firstName: 'Lionel', lastName: 'Mudpudel'},
      {firstName: 'Tiffany', lastName: 'Sancasel'}
    ];
    const personListWrapper = shallow(<PersonList people={people} />);
    const peopleListItems = personListWrapper.find('li');

    expect(peopleListItems).toHaveLength(2);  
  })

})