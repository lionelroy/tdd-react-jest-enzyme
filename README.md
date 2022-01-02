TDD principles 

#1 Write a failing test before any production code. ----RED
#2 Write an implementation that makes the test pass ----GREEN
#3 Refactor (SOLID principle, naming...)


3 laws of TDD:
    - You are not allowed to write any production code unless it is to make a failing unit test pass.
    - You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
    - You are not allowed to write any more production code than is sufficient to pass the one failing unit test.

Zombie Testing: One Behavior at a Time
Zombie testing is an acronym for:
Z — Zero
O — One
M — Many (or More complex)
B — Boundary Behaviors
I — Interface definition
E — Exercise Exceptional behavior
S — Simple Scenarios, Simple Solutions


The Test Pyramid:
    top(more isolation & faster)- User Interface Tests or End to End test
    middle- Service Tests or integration test
    base(more integration & slower)- Unit Test inputs/outpus (TDD)inside-out testing


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
	
- Create an object in the root component for next text(write test first)
	
				


