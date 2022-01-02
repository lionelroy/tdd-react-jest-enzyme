import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import PersonList from './PersonList';


describe('App', () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<App />)
  });

  it('', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);
  
    expect(personList).toHaveLength(1);
  })
})