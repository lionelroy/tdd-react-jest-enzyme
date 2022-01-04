<h1>TDD principles and testing with React, Jest and Enzyme</h1>

<p>This Repository is an extension of Steve Bishops youtube tutorial on TDD testing.</p>
<p>The list of testable components will grow with time and I'm open to any suggestions that will make this library a better resource to learn about TDD development.</p>

<h2>Theory</h2>

<p>TDD(Test-Driven-Dvelopment) is a process of creating software which uses automated tests not only as a tool for proving the code correctness but it leads to developing applications in a clean and well-designed way.</p>

<h3>Let's start with the TDD-cycle which consists of 3 stages:</h4>
<ol>
  <li>Creating a test that will fail(RED stage of the TDD-cycle).</li>
  <li>Adding the code required to pass the test(GREEN stage of the TDD-cycle).</li>
  <li>Refactoring (BLUE stage of the TDD-cycle).</li>
</ol>
<br/>

<h4>Here is Robert C.Martin's(Uncle Bob) 3 laws of TDD from is book Clean Code:<h4>
<ol>
  <li>You are not allowed to write any production code unless it is to make a failing unit test pass.</li>
  <li>You are not allowed to write any more of a unit test that is sufficient to fail, and compilation failures are failures.</li>
  <li>You are not allowed to write any more production code that is sufficient to pass the one failing the unit test.</li>
</ol>

<p>Uncle Bob's method is a classic in TDD but in this project we will use the Martin Fowler method which will let us refactor our code after the test as passed.</p>
<p>Refactoring exemples would be NAMING your tests, SOLID principles, DRY principles...</P>

<h4>Here is Martin Fowler's 3 laws of TDD:<h4>
<ol>
  <li>Write a test for the next bit of functionality you want to add.</li>
  <li>Write the functional code until the test passes.</li>
  <li>Refactor both new and old code to make it well structured.</li>
</ol>
<br/>

<h3>ZOMBIES Testing(One Behavior at a time)</h3>
<p>We will also use Test-Driven-Development guided by ZOMBIES.</p>
<p>ZOMBIES is an acronym that helps you decide where to start, what test to write next and make sure that, to the best of your ability, you do not forget critical tests and production code behaviors. You can also add N(null) for NZOMBIES.</p>
<h4>NZOMBIES stands for:</h4>
<ul>
  <li>N - Null</li>
  <li>Z — Zero</li>
  <li>O — One</li>
  <li>M — Many (or More complex)</li>
  <li>B — Boundary Behaviors</li>
  <li>I — Interface definition</li>
  <li>E — Exercise Exceptional behavior</li>
  <li>S — Simple Scenarios, Simple Solutions</li>
</ul>
<br/>

<h3>The Test Pyramid</h3>
<p>Here we have Mike Cohn's test pyramid that consists of three layers that should be implemented in your test suite.</p>
<ul>
  <li>Top(more isolation & faster)- User Interface tests or End to End test.</li>
  <li>Middle- Service test or integration test.</li>
  <li>Base(more integration & slower)- Unit test, inputs/outpus, (TDD)inside-out testing.</li>
</ul>
<p>Due to its simplicity the essence of the test pyramid serves as a good rule of thumb when it comes to establishing your own test suite. Your best bet is to remember two things from Cohn's original test pyramid:</P>
<ol>
  <li>Write tests with different granularity.</li>
  <li>The more high-level you get the fewer tests you should have.</li>
</ol>
<br/><br/>

<h2>CREATE THE APP</h2>
<p>You can have your code and this README file open in seperate windows next to each other to follow along.</p>
<p>Let's start by creating the app with all it's dependencies and clean up a bit of the boiler plate code inside our React application, after this is complete we will go through the TDD process by following the 3 stages from the TDD-cycle which was:</p>
<ol>
  <li>Creating a test that will fail(RED stage of the TDD-cycle).</li>
  <li>Adding the code required to pass the test(GREEN stage of the TDD-cycle).</li>
  <li>Refactoring (BLUE stage of the TDD-cycle).</li>
</ol>
<h4>Follow the steps bellow to create the app from scratch in Visual Studio code.</h4>
<h3>Create app and install dependencies:</h3>
<ol>
  <li>Open up your terminal and run ```mkdir DIRNAME```(This command will create a new directory)...Don't forget to cd in your projects directory first.</li>
  <li>```cd DIRNAME```(This command will bring you in the directory).</li>
  <li>```code .``` (This command will open your directory in visual studio).</li>
  <li>Once Visual Studio is open, open up a new terminal in your development environment.</li>
  <li>```npx create-react-app DIRNAME```(This will create the React app in your directory).</li>
  <li>```cd DIRNAME```Make sure you are still in your directory).</li>
  <li>In the file you will notice that a test is initiated with 'test' to define a test but you can also use 'it' which is more popular.</li>
  <li>```npm i -D enzyme```(This will install Enzyme in your Developer environment).</li>
  <li>```npm i -D enzyme-adapter-react-16```(Install Enzyme adapter).</li>
</ol>
<p>Run ```npm test```(This will open up the jest test environment which is created with your React app)...You will see no tests found related to files changed since last commit.</p>
<p>Press "a" to run all tests(manual trigger).</p>
<p>You should now be able to see in your terminal: 1 PASS which is in the App.test.js file.</p>
<br/>

<h3>Clean up boilerplate code and import Enzyme.</h3>
<ol>
  <li>Delete all jsx in App.js except ```div className="App"```.</li>
  <li>Delete in App.test.js. ```import { render, screen } from '@testing-library/react';"``` and initial test</li> 
  <li>Add in App.test.js. ```import { shallow } from 'enzyme';```</li>
</ol>
<br/>

<h3>Setup config of adapter.</h3>
<p>add adapter for test runner(jest) by adding to setupTests.js:</p>
```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter()});
```

	

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
- Create library of TDD components and add more theory about TDD.
