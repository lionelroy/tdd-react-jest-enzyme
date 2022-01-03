TDD principles  and testing with React, Jest ans Enzyme

#1 Write a failing test before any production code. ----RED
#2 Write an implementation that makes the test pass ----GREEN
#3 Refactor (SOLID principle, DRY principles, naming...)


3 laws of TDD:
    - You are not allowed to write any production code unless it is to make a failing unit test pass.
ZOMBIES Testing: One Behavior at a time
ZOMBIES Testing is an acronym for:
N - Null
Z — Zero
O — One
M — Many (or More complex)
B — Boundary Behaviors
I — Interface definition
E — Exercise Exceptional behavior
S — Simple Scenarios, Simple Solutions


The Test Pyramid:
    top(more isolation & faster)- User Interface tests or End to End test
    middle- Service tests or integration test
    base(more integration & slower)- Unit test inputs/outpus (TDD)inside-out testing


Steps:
- mkdir DIRNAME where ever you store all your projects 
- cd DIRNAME
- code . (open visual studio)
- npx create-react-app DIRNAME
- cd DIRNAME
- npm test (No tests found related to files changed since last commit).
- press 'a' to run all tests(manual trigger).
- You will see 1 passed which is in the App.test.js file.
- You can use the word 'test' or 'it'(more popular) to define a test.
- Create jsconfig.json file with typeAcquisition.(intelisense with jest).
- Install Enzyme: npm i -D enzyme.
- Delete all jsx in App.js except <div className="App">.

- Delete 
	"import { render, screen } from '@testing-library/react';"
 	and 
	initial test 
	in 
	App.test.js. 

- Add 
	"import { shallow } from 'enzyme';" 

- Install enzyme adapter:
	(Make sure to match the version to the one in your package.json file)
 	"react": "^17.0.2",
	"react-dom": "^17.0.2"

	Run "npm i -D enzyme-adapter-react-17"
		FAILED
		v16 is the latest so try 
	Run "npm i -D enzyme-adapter-react-16" instead
		SUCCESS	


- Setup config of adapter(add adapter for test runner which is jest):
		Add to setupTests.js file
		
		import { configure } from 'enzyme';
		import Adapter from 'enzyme-adapter-react-16';
		#configure gives enzyme a way to connect to jest
		configure({ adapter: new Adapter()});
	

- Create test that fails.
	ex:
	describe('App', () => {
	  it('', () => {
	    
	  })
	})
	This test will pass when you run 'npm test' because we havent setup any assertion to fail.

	ex2:
	describe('App', () => {
	  it('', () => {
	    const appWrapper = shallow(<App />)
	  })
	})
	-----Make sure to install enzyme to use shallow.
	-----This test will pass when you run 'npm test' because we still havent setup any assertion to fail.

	ex3:
	describe('App', () => {
	  it('renders without crashing', () => {
	    const appWrapper = shallow(<App />)
	  });

	  it('', () => {
	    const appWrapper = shallow(<App />);
	    appWrapper.find(PersonList);
	  })
	})
	-----This test will fail because we don't have a person list.
	-----The first step of the process is done which was creating a test that fails.(RED)


- Create PersonList.js(Write only enough of an implementation as to pass the test.
	add to PersonList.js
		export default () => { 
		}
	add to App.js
		----THIS LINE----import PersonList from './PersonList';

		function App() {
		  return (
		    <div className="App">
		     ----THIS LINE----<PersonList />
		    </div>
		  );
		}...
	add to App.test.js
		import PersonList from './PersonList';
	-----The test should now pass as we implemented just enough for the test to pass.(GREEN)

- Now we need to create an assertion.
	Add to App.test.js
		    it('', () => {
		    const appWrapper = shallow(<App />);
		    const personList = appWrapper.find(PersonList);
		  
		    ----THIS LINE---expect(personList).toHaveLength(1);
		    })
	-----The test should still pass and now we have a completed test with an assertion.

- Refactor stage(naming):
	Add 		    
		it('renders a person list', () => {...
	
- Create an object in the root component for the next test(write test first)
	Add in App.test.js
		it('', () => {
		       const appWrapper = shallow(<App />);
		       const appState = appWrapper.state();
		  })
	-----ERROR----    ShallowWrapper::state() can only be called on class components
	-----state does not exist on functional components so you must edit the App.js file and add a Class instead of a function.
		import React, { Component } from 'react';
		import PersonList from './PersonList';

		class App extends Component {
		  render() {
		    return (
		    <div className="App">
		      <PersonList />
		    </div>
		    );
		  }
		}

		export default App;
	-----Success All tests are pass

- Now we must implement test in case the appState returns Null which we don't want(Null NZOMBIES(N))
	Add to App.test.js
		it('', () => {
		       const appWrapper = shallow(<App />);
		       const appState = appWrapper.state();

		      ------THIS LINE------ expect(appState).not.toBeNull();
		  })
	-----TEST FAILED(RED)
	-----Received Null 

- Add to App.js
	state = {}
	-----TEST PASS
	-----Not receiving NULL anymore

- Refactor
	Add name to test
		it('has state', () => ....

- Always check if refactor stage is causing a test to fail.

- Next Test(red)
	Check if there's a people property defined
	Add to App.test.js
		it('', () => {
		    const appWrapper = shallow(<App />);
		    const appState = appWrapper.state();

		    expect(appState.people).toBeDefined();
		  })
	-----TEST FAIL(RED)
	-----People property does not exist on state yet

- Add to App.js
	 state = { people: [] }
	-----TEST PASS(GREEN)
	-----people property is now defined

- Refactor(DRY principles...)
	Clean redundancy in App.test.js
	Delete in every tests
		const appWrapper = shallow(<App />);
	 
	-----Refactored code
		Add before every test
			describe('App', () => {
				let appWrapper;

				beforeAll(() => {
					appWrapper = shallow(<App />);
				});
	-----Notice how const appWrapper changed to let appWrapper.
	-----Notice there is no statement in beforeAll so the label is removed.
	-----You can delete the following test completely which is now redundant.
		 it('renders without crashing', () => {
		    const appWrapper = shallow(<App />)
		  });
	-----Don't forget to name your last test
		  it('has a people property on state', () => {...
	-----TEST PASS(GREEN)
		
- Next test(RED)...make sure the people property is passed to the PersonList.(Write test first)
	Add to App.test.js
		it('', () => {
		    const personList = appWrapper.find(PersonList);

		    expect(personList.props().people).toEqual(appWrapper.state().people);
		  })
	-----TEST FAIL(RED)
	-----Expected empty array but received undefined.

- Create people prop and send it at state.people (App.js)
	<PersonList people={this.state.people} />
	-----TEST PASS(GREEN)

- Refactor(Naming)
	Add to App.test.js
	  it('passes people property of state to personList as prop', () => {
	-----TEST PASS(GREEN)

- Keep in mind these tests are made to see if the app is working, 
not to see if anything is rendered in the browser.
- The tests for PersonList is now finished but nothing will appear in the browser by running our 
development server with 'npm start' because we did not render anything in the PersonList component yet.


- You can either bundle all your tests files in a test folder or 
have your test file next to you component so everything is easy to track.
- In this exemple I will have my tests files created next to the corresponding component file.
- Create a test file for the PersonList component in your src folder and name it PersonList.test.js.
	Add to PersonList.test.js
		import React from 'react';
		import { shallow } from 'enzyme';
		import PersonList from './PersonList';

		describe('PersonList', () => {
		  it('', () => {
		    const personListWrapper = shallow(<PersonList />);
		    const peopleListUls = personListWrapper.find('ul');

		    expect(peopleListUls).toHaveLength(1);
		  })
		})
	-----TEST FAIL(RED)
	----- Expected length: 1, Received length: 0

- Implement unordered list(Uls) in PersonList.js
	import React from 'react';

	export default () => <ul></ul>
	----TEST PASS(GREEN)
	----Notice that you don't need a return statement when there's only 
	one line of command in your function. 
	-----Curly braces are used to define a scope for multiple things happening in a function.

- Refactor(Naming)
	Add to PersonList.test.js
		  it('renders a ul element', () => {...
	-----TEST PASS(GREEN)

- Next Test(RED)...Create test that checks if list elements(li) are passed to the ul element
- First start by implementing (0 in ZOMBIES(Z)).
	it('', () => {
	const personListWrapper = shallow(<PersonList />);
	const peopleListItems = personListWrapper.find('li');

	expect(peopleListItems).toHaveLength(0);

	})
	-----OOOPPPSS TEST PASS(GREEN) but we were supposed to write a test that fails first.
	-----Altough this is true, we still want to keep this valid test because we do want to check 
	if we get 0 items(people) in the unordered list(ul).(0 case in ZOMBIES)

- Refactor(Naming)
	it('renders no li element when no people exist', () => {...
	-----TEST PASS(GREEN)

- Now let's make sure we write a test sufficient enough to cause a failure(RED)(1 case in ZOMBIES(O)).
	Add in PersonList.test.js
		it('', () => {
		    const people = [{firstName: 'Lionel', lastName: 'Mudpudel'}];
		    const personListWrapper = shallow(<PersonList people={people} />);
		    const peopleListItems = personListWrapper.find('li');

		    expect(peopleListItems).toHaveLength(1);
		  })
	-----TEST FAIL(RED)
	-----The test noticed that we don't have 1 list item(person) in our ul.

- Add to PersonList.js	
	export default () => 
	<ul><li></li></ul>
	-----TEST FAIL(RED)
	-----Expected length: 0, Received length: 1
	-----Now we have a different test failing which is the one checking for 0 list people. 
	-----Only at this point, the importance of the 0 test is reveiled even tough it passed the first time.

- We must check if the props.people exist and props.people.lenght is equal to 1.
	Add to PersonList.js
		export default (props) => {
		  if (props.people && props.people.length == 1) {
		    return <ul><li></li></ul>
		  }
		  return <ul></ul>
		}
	-----PASS TEST(GREEN)
	
- Refactor(NAMING)
	  it('renders 1 li element when 1 person exists', () => {...

- Refactor, implement single responsibility principle(function that does 1 thing only)and rewrite 
the if statement with a turnary operator.
	Add to PersonList.js
	export default (props) => 
  		<ul>{props.people && props.people.length == 1 ? <li></li>: undefined}</ul>
	-----TEST PASS(GREEN)

- Next test (multiple in ZOMBIES(M)).
	Add to PeopleList.test.js
		it('', () => {
		    const people = [
		      {firstName: 'Lionel', lastName: 'Mudpudel'},
		      {firstName: 'Tiffany', lastName: 'Sancasel'}
		    ];
		    const personListWrapper = shallow(<PersonList people={people} />);
		    const peopleListItems = personListWrapper.find('li');

		    expect(peopleListItems).toHaveLength(2);  
		  })

	-----TEST FAIL(RED)
	-----Expected length: 2, Received length: 0

- Add multiple items(people) to unordered list.
- Change code for map method(high order function) in PersonList.js 
which maps every person from an array into a new array with list items(li).
	export default (props) => 
 	<ul>{props.people ? props.people.map(() => <li></li>): undefined }</ul>
	-----TEST PASS(GREEN)
	-----But we still have an error...
	-----Warning: Each child in a list should have a unique "key" prop.

- Implement key to with person and index parameter to map().
	  <ul>{props.people ? props.people.map((person, i) => <li key={i}></li>): undefined }</ul>
	----- We fixed the error and all our tests are still passed.

- Refactor(NAMING)
	it('renders 1 li element for every person that exists', () => {

- Refactor
(destructuring the people property from the props)
(set default to empty array)
(map over people array)
	Add to personList.js
		export default ({ people =  [] }) => 
  		<ul>{people.map((person, i) => <li key={i}></li>)}</ul>
	-----TEST PASS(GREEN)

- Write a test that checks if the names are appearing inside the list item elements.
- IMPORTANT...
You shouldn't have multiple assertions inside one test(single responsibility principle)
but in this case, even tho we implement multiple assertions in one test
they're part of the same "thing" that we are testing which is the name.
	Add to PersonList.test.js
		it('', () => {
		    const people = [
		      {firstName: 'Lionel', lastName: 'Mudpudel'}
		    ];
		  const personListWrapper = shallow(<PersonList people={people} />);

		  expect(personListWrapper.find('li').text()).toContain(people[0].firstName);
		  expect(personListWrapper.find('li').text()).toContain(people[0].lastName);  
		  });
	-----TEST FAIL(RED)
	-----Expected substring: "Lionel", Received string:  ""

- Add firstName and lastName inside list item element.
	export default ({ people =  [] }) => 
  	<ul>{people.map((person, i) => <li key={i}>{person.firstName} {person.lastName}</li>)}</ul>
	-----TEST PASS(GREEN)

- Refactor(NAMING)
	  it('renders the first and last name of a person', () => {...
	-----TEST PASS(GREEN)

- The Personlist component tests is done and we can move on to a new component now...
- TO BE CONTINUED...
