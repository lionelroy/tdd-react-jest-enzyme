<h1>TDD principles and testing with React, Jest and Enzyme</h1>

<p>The list of testable components will grow with time and I'm open to any suggestions that will make this library a better resource to learn about TDD development.</p>

<h2>Theory</h2>

<p>TDD(Test-Driven-Development) is a process of creating software which uses automated tests not only as a tool for proving the code correctness but it leads to developing applications in a clean and well-designed way.</p>

<h3>Let's start with the TDD-cycle which consists of 3 stages:</h4>
<ol>
  <li>Creating a test that will fail(RED stage of the TDD-cycle).</li>
  <li>Adding the code required to pass the test(GREEN stage of the TDD-cycle).</li>
  <li>Refactoring (GREEN2 stage of the TDD-cycle).</li>
</ol>
<p>I've decided to name the refactoring stage GREEN2 as it is the second check for a PASS TEST which is still green.</p>
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
<p>We'll also use Test-Driven-Development guided by ZOMBIES.</p>
<p>ZOMBIES is an acronym that helps you decide where to start, what test to write next and make sure that, to the best of your ability, you do not forget critical tests and production code behaviors. You can also add N(null) for NZOMBIES.</p>
<h4>NZOMBIES stands for:</h4>
<ul>
  <li>N - Null</li>
  <li>Z - Zero</li>
  <li>O - One</li>
  <li>M - Many (or More complex)</li>
  <li>B - Boundary Behaviors</li>
  <li>I - Interface definition</li>
  <li>E - Exercise Exceptional behavior</li>
  <li>S - Simple Scenarios, Simple Solutions</li>
</ul>
<br/>

<h3>The Test Pyramid</h3>
<p>Here we have Mike Cohn's test pyramid consisting of three layers that should be implemented in your test suite.</p>
<ul>
  <li>Top(more isolation & faster)- User Interface test or End to End test.</li>
  <li>Middle- Service test or integration test.</li>
  <li>Base(more integration & slower)- Unit test, inputs/outpus, (TDD)inside-out testing.</li>
</ul>
<p>Due to its simplicity the essence of the test pyramid serves as a good rule of thumb when it comes to establishing your own test suite.</p>
<p>Your best bet is to remember two things from Cohn's original test pyramid:</P>
<ol>
  <li>Write tests with different granularity.</li>
  <li>The more high-level you get the fewer tests you should have.</li>
</ol>
<br/><br/>

<h2>CREATE THE APP</h2>
<p>You can have your code and this README file open in seperate windows next to each other to follow along.</p>
<p>Let's start by creating the app with all it's dependencies and clean up a bit of the boiler plate code inside our React application, after this is completed, we'll go through the TDD process by following the 3 stages from the TDD-cycle:</p>
<ol>
  <li>Creating a test that will fail(RED stage of the TDD-cycle).</li>
  <li>Adding the code required to pass the test(GREEN stage of the TDD-cycle).</li>
  <li>Refactoring(GREEN2 stage of the TDD-cycle).</li>
</ol>

<h4>Follow the steps bellow to create the app from scratch in Visual Studio code.</h4>
<p>Note that all run commands have "" around them.</p>
<h3>Create app and install dependencies:</h3>
<ol>
  <li>Open up your terminal, "cd" in your project directory and run "mkdir DIRNAME"(This command will create a new directory named DIRNAME but you can change this if you want).</li>
  <li>"cd DIRNAME"(This command will bring you in the directory).</li>
  <li>"code ." (This command will open your directory in visual studio).</li>
  <li>Once Visual Studio is open, open up a new terminal in your development environment.</li>
  <li>"npx create-react-app DIRNAME"(This will create the React app in your directory).</li>
  <li>"cd DIRNAME"(Make sure you are still in your directory).</li>
  <li>"npm i -D enzyme"(This will install Enzyme in your Developer environment).</li>
  <li>"npm i -D enzyme-adapter-react-16"(Install Enzyme adapter).</li>
</ol>

<p>Run "npm test"(This will open up the jest test environment which is created with your React app)...You will see no tests found related to files changed since last commit.</p>
<p>Press "a" to run all tests(manual trigger).</p>
<p>You should now be able to see in your terminal: 1 PASS which is in the App.test.js file.</p>
<p>In the file you will notice that a test is initiated with 'test' but you can also use 'it' which is more popular.</p>
<br/>

<h3>Clean up boilerplate code and import Enzyme.</h3>
<ol>
  <li>Delete all jsx in App.js except:</li>

    div className="App"

  <li>Delete in App.test.js: initial test and...</li> 

    import { render, screen } from '@testing-library/react';

  <li>Add in App.test.js:</li>

    import { shallow } from 'enzyme';

</ol>
<br/>

<h3>Setup config of adapter</h3>
<p>Add adapter for test runner(jest) by adding to setupTests.js:</p>

    import { configure } from 'enzyme';
    import Adapter from 'enzyme-adapter-react-16';
    configure({ adapter: new Adapter()});

<br/><br/>


<h2>Let's start implementing our tests</h2>

<h4>(RED)Create a test that fails</h4>
<h5> Add to App.test.js</h5>

    describe('App', () => {
      it('', () => {
        const appWrapper = shallow(<App />)
      })
    })

- This test will pass when you run 'npm test' because we haven't set up any assertion to fail.
- Also make sure that Enzyme is installed in order to use shallow.

<h5>Add</h5>
    
    describe('App', () => {
      it('renders without crashing', () => {
        const appWrapper = shallow(<App />)
      });
      it('', () => {
        const appWrapper = shallow(<App />);
        appWrapper.find(PersonList);
      })
    })

- SUCCESS(RED)
- This test should fail because we don't have a person list implemented yet.
- The first step of the process is done(creating a test that fails).

<h4>(GREEN)Create PersonList.js and write only enough of an implementation as to pass the test.</h4>
<h5>Add to PersonList.js</h5>

		export default () => { 
		}

<h5>Add to App.js</h5>

		---THIS LINE--- import PersonList from './PersonList';

		function App() {
		  return (
		    <div className="App">
		     ---THIS LINE---<PersonList />
		    </div>
		  );
		}...

<h5>Add to App.test.js</h5>

		import PersonList from './PersonList';

- SUCCESS(GREEN)The test should now pass as we implemented just enough for the test to pass.
- Now we need to create an assertion.

<h5>Add to App.test.js</h5>

    it('', () => {
    const appWrapper = shallow(<App />);
    const personList = appWrapper.find(PersonList);

    ----THIS LINE---expect(personList).toHaveLength(1);
    })

- The test should still pass and now we have a completed test with an assertion.

<h4>(GREEN2)Refactor stage</h4>
- Let's add a name for our test.
<h5>Add to App.test.js</h5>
 		    
		it('renders a person list', () => {...

- SUCCESS(GREEN2)
- Remember to also test after refactoring, your new refactored code might have broken something. In this case, we are simply naming our test so no need to worry.
</br>
	
<h4>State does not exist on functional components so you must edit the App.js file.</h4>
<h5>Add a Class instead of a function in App.js.</h5>

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

</br>

<h4>(RED)Now we must implement test in case the appState returns Null which we don't want(Null NZOMBIES(N))</h4>
<h5>Add to App.test.js</h5>

		it('', () => {
          const appWrapper = shallow(<App />);
          const appState = appWrapper.state();

        ---THIS LINE--- expect(appState).not.toBeNull();
    })

- TEST FAILED(RED)
- Received Null 

<h4>(GREEN)</h4>
<h5>Add to App.js</h5>

	  state = {}

- (GREEN)TEST PASS
- Not receiving NULL anymore

<h4>(GREEN2)Refactor</h4>
<h5>Add name to test</h5>

		it('has state', () => ....

- Always check if refactor stage is causing a test to fail.
</br>

<h4>(RED)Next Test</h4>
- Check if there's a people property defined
<h5>Add to App.test.js</h5>

		it('', () => {
      const appWrapper = shallow(<App />);
      const appState = appWrapper.state();

      expect(appState.people).toBeDefined();
    })

- TEST FAIL(RED)
- People property does not exist on state yet

<h4>(GREEN)</h4>
<h5>Add to App.js</h5>

	  state = { people: [] }

- TEST PASS(GREEN)
- people property is now defined

<h4>(GREEN2)Refactor(DRY principles...)</h4>
- Clean redundancy.
<h5>Delete from every single test in App.test.js</h5>

		const appWrapper = shallow(<App />);
	 
<h4>Refactored code</h4>
<h5>Add at the very top to the first test.</h5>

    describe('App', () => {
    let appWrapper;

    beforeAll(() => {
      appWrapper = shallow(<App />);
    });

- Notice how const appWrapper changed to let appWrapper.
- Also notice there is no statement in beforeAll so the label is removed.

<h5>You can delete the following test completely which is now redundant.</h5>

    it('renders without crashing', () => {
      const appWrapper = shallow(<App />)
    });

<h5>Don't forget to name your last test</h5>

		it('has a people property on state', () => {...

- TEST PASS(GREEN2)

</br>
		
<h4>(RED)Next test...make sure the people property is passed to the PersonList.</h4>
<h5>Add to App.test.js</h5>

		it('', () => {
      const personList = appWrapper.find(PersonList);

      expect(personList.props().people).toEqual(appWrapper.state().people);
    })

- TEST FAIL(RED)
- Expected empty array but received undefined.

<h4>(GREEN)Create people prop and send it at state.people</h4>
<h5>Add to App.js</h5>

	  <PersonList people={this.state.people} />

- TEST PASS(GREEN)

<h4>(GREEN2)Refactor(Naming)</h4>
<h5>Add to App.test.js</h5>

	  it('passes people property of state to personList as prop', () => {...

- TEST PASS(GREEN2)

</br>

- Keep in mind these tests are made to see if the app is working, 
not to see if anything is rendered in the browser.
- The tests for PersonList is now finished but nothing will appear in the browser by running our 
development server with 'npm start' because we did not render anything in the PersonList component yet.

- You can either bundle all your test files in a test folder or 
have your test files next to their corresponding component so everything is easy to track.
- In this exemple I will have my tests files created next to the corresponding component file.

<h4>(RED)Create a test file for the PersonList component in your src folder and name it PersonList.test.js.</h4>
<h5>Add to PersonList.test.js</h5>

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

- TEST FAIL(RED)
- Expected length: 1, Received length: 0

<h4>(GREEN)Implement unordered list(uls)</h4>
<h5>Add in PersonList.js</h5>

	  import React from 'react';

	  export default () => <ul></ul>

- TEST PASS(GREEN)
- Notice you don't need a return statement when there's only one line of command in your function. 
- Curly braces are used to define a scope for multiple things happening in a function.

<h4>(GREEN2)Refactor(Naming)</h4>
<h5>Add to PersonList.test.js</h5>

    it('renders a ul element', () => {...

- TEST PASS(GREEN2)

<h4>(RED)Next Test...Create test that checks if list elements(li) are passed to the ul element<h4>
- First start by implementing (0 in ZOMBIES(Z)).
<h5>Add to PersonList.test.js</h5>

    it('', () => {
    const personListWrapper = shallow(<PersonList />);
    const peopleListItems = personListWrapper.find('li');

    expect(peopleListItems).toHaveLength(0);
    })

- OOOPPS!!! TEST PASS(GREEN) but we're supposed to write a test that fails first.
- Altough this is true, we still want to keep this valid test because we do want to check 
	if we get 0 items(people) in the unordered list(ul).(0 case in ZOMBIES)

<h4>(GREEN2)Refactor(Naming)</h4>
<h5>Add</h5>

    it('renders no li element when no people exist', () => {...

- TEST PASS(GREEN2)

<h4>(RED)Now let's make sure we write a test sufficient enough to cause a failure(1 case in ZOMBIES(O)).</h4>
<h5>Add in PersonList.test.js</h5>

		it('', () => {
      const people = [{firstName: 'Lionel', lastName: 'Mudpudel'}];
      const personListWrapper = shallow(<PersonList people={people} />);
      const peopleListItems = personListWrapper.find('li');

      expect(peopleListItems).toHaveLength(1);
    })

- TEST FAIL(RED)
- The test noticed that we don't have 1 list item(person) in our ul.

<h4>(GREEN)</h4>
<h5>Add li element to PersonList.js</h5>

    export default () => 
      <ul><li></li></ul>

- TEST FAIL(RED)
- Expected length: 0, Received length: 1
- Now we have a different test failing which is the one checking for 0 list people. 
- Only at this point, the importance of the 0 test is reveiled even tough it passed the first time.

- We must check if props.people exist and props.people.lenght is equal to 1.
<h5>Add to PersonList.js</h5>

		export default (props) => {
		  if (props.people && props.people.length == 1) {
		    return <ul><li></li></ul>
		  }
		  return <ul></ul>
		}

- TEST PASS(GREEN)
	
<h4>(GREEN2)Refactor(NAMING)</h4>
<h5>Add</h5>

	  it('renders 1 li element when 1 person exists', () => {...

  - TEST PASS(GREEN2)

<h4>(...GREEN2)Refactor, implement single responsibility principle(function that does 1 thing only)and rewrite 
the if statement with a turnary operator.</h4>
<h5>Add to PersonList.js</h5>

    export default (props) => 
      <ul>{props.people && props.people.length == 1 ? <li></li>: undefined}</ul>

- TEST PASS(GREEN2)

</br>

<h4>(RED)Next test...multiple in ZOMBIES(M).</h4>
<h5>Add to PeopleList.test.js</h5>

		it('', () => {
      const people = [
        {firstName: 'Lionel', lastName: 'Mudpudel'},
        {firstName: 'Tiffany', lastName: 'Sancasel'}
      ];
      const personListWrapper = shallow(<PersonList people={people} />);
      const peopleListItems = personListWrapper.find('li');

      expect(peopleListItems).toHaveLength(2);  
    })

- TEST FAIL(RED)
- Expected length: 2, Received length: 0

<h4>(GREEN2</h4>
<h4>Add multiple items(people) to unordered list.</h4>
- Change code for map method(high order function) in PersonList.js 
which maps every person from an array into a new array with list items(li).</h5>

    export default (props) => 
    <ul>{props.people ? props.people.map(() => <li></li>): undefined }</ul>

- TEST PASS(GREEN)
- But we still have an error...
- Warning: Each child in a list should have a unique "key" prop.

- Implement key to list with person and index parameter to map(
<h5>Add</h5>

	  <ul>{props.people ? props.people.map((person, i) => <li key={i}></li>): undefined }</ul>

- We fixed the error and all our tests are still passed(GREEN).

<h4>(GREEN2)Refactor(NAMING)</h4>
<h5>Add</h5>

	  it('renders 1 li element for every person that exists', () => {

- TEST PASS(GREEN2)

<h4>Refactor</h4>
- Destructuring the people property from the props.
- Set default to empty array.
- Map over people array.
<h5>Add to personList.js</h5>

		export default ({ people =  [] }) => 
  	  <ul>{people.map((person, i) => <li key={i}></li>)}</ul>

- TEST PASS(GREEN2)
</br>

<h4>(RED)Write a test that checks if the names are appearing inside the list item elements.</h4>
<h5>IMPORTANT...</h5>
<p>You shouldn't have multiple assertions inside one test(single responsibility principle)
but in this case, even though we implement multiple assertions in one test,
they're part of the same "thing" that we are testing which is the name.</p>
<h5>Add to PersonList.test.js</h5>

		it('', () => {
      const people = [
        {firstName: 'Lionel', lastName: 'Mudpudel'}
      ];
    const personListWrapper = shallow(<PersonList people={people} />);

    expect(personListWrapper.find('li').text()).toContain(people[0].firstName);
    expect(personListWrapper.find('li').text()).toContain(people[0].lastName);  
    });

- TEST FAIL(RED)
- Expected substring: "Lionel", Received string:  ""

<h4>(GREEN)</h4>
<h5>Add firstName and lastName inside list item element.</h5>
	
    export default ({ people =  [] }) => 
  	  <ul>{people.map((person, i) => <li key={i}>{person.firstName} {person.lastName}</li>)}</ul>

- TEST PASS(GREEN)

<h4>(GREEN2)Refactor(NAMING)</h4>
<h5>Add</h5>

	  it('renders the first and last name of a person', () =cd > {...

- TEST PASS(GREEN2)
- The Personlist component tests is now completed.
</br>

- TO DO: Create library of TDD components and add more theory about TDD.
