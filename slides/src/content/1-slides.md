# Angular Unit Testing Workshop

# Rangle.io

Notes:
- Angular + Unit Testing
- Slack channel

---

## Setup

- Download code from the repo.

Notes:

- send link: https://drive.google.com/open?id=0Bwy32YPUV0oicFNtSDZuNFBRQkU

---

## Unit Testing

### A Good Test
* is simple (don’t write tests that need tests)
* is singular in purpose (test one behaviour/path/thing at a time, and only test it once)
* is isolated (don’t share state between tests)
* is blind (test behaviour, not implementation)

+++

### The Three A's
* Arrange
* Act
* Assert

---

## Angular Testing 😁 😡 😢

Notes:
- Slow, getting better, use Jest!
- Advanced
- Good: "isolated testing" is possible

---

## Angular is Object Oriented

- *Services* are classes
- *Pipes* are classes with a transform method
- *Components* are classes that angular combines with templates

- Logic often lives in our templates (in `*ngFor`s and in `*ngIf`s), so to test them we need help from TestBed, but first let's talk about TDD.

+++

### How To Insert an Emoji Into Your Angular App

`control + command + spacebar`

#🐎

---

## TDD In Angular

write test ➡ see test fail ➡ write code to make it pass ➡ refactor ➡ write next text

+++

Most important tests are for the business logic, which should be in functions.

- TDD helps you define the shape of your objects and names for your functions.
- Put interfaces and associated functions all in one place.
- See the [ngrx example app](https://github.com/rangle/angular-ngrx-example/blob/master/src/app/video-games/interfaces/video-game/video-game.interface.spec.ts)

---

# Components

## How to test them

---

## Using Static Methods

### The Component

```javascript
@Component({
  templateUrl: './myWidget.component.html',
  selector: 'my-widget'
})
export default class MyWidget {
  constructor() {}
  static confirmationMessage() {
    return 'Yup, that\'s fine!';
  }
}
```

+++


## Using Static Methods

### The Test

```javascript
// no need to create an instance of MyWidget
describe('My Widget', () => {
  it('returns confirmation message', () => {
    expect(MyWidget.confirmationMessage()).toEqual('Yup, that\'s fine!');
  });
});

```

---

## Creating an Instance of the Class Without Angular's Help

### The Component

```javascript
@Component({
  templateUrl: './myWidget.component.html',
  selector: 'my-widget'
})
export default class MyWidget() {
  constructor(private copyService: CopyService) {}
  public confirmationMessage() {
    return this.copyService.getConfirmationMessage();
  }
}
```

+++

## Creating an Instance without Angular

### The Test

```javascript
// create the dependencies and create the instance
describe('My Widget', () => {
  let mockCopyService;
  let myWidget;
  beforeEach(() => {
    mockCopyService = { getConfirmationMessage: ()=>'Yup, that\'s fine.' };
    myWidget = new MyWidget(mockCopyService);
  })
  it('returns confirmation message', () => {
    expect(myWidget.confirmationMessage()).toEqual('Yup, that\'s fine!');
  });
});
```

---

## Angular TestBed

TestBed helps when you have non-trivial logic in your template (`ngFor`s, `ngIfs`) and you want to make sure things are being rendered properly.

TestBed "Configures and initializes the environment for unit testing and provides methods for creating components and services in unit tests." - Angular.io

+++

* Customize the test module with
```javascript
TestBed.configureTestingModule({
  imports: [],
  declarations: [MyComponent],
  providers: [{provide: EssentialService, useValue: mockEssentialService}]
})
```
* Create the fixture:
```javascript
let fixture: ComponentFixture<MyComponent> = TestBed.createComponent(MyComponent);
```
* Create the component instance:
```javascript
let comp: MyComponent = fixture.componentInstance;
```
* Create the native element:
```javascript
let el: HTMLElement = fixture.nativeElement;
```
* Use DebugElement to access the DOM representation.
```javascript
let de = fixture.debugElement;
```

Notes:
* **Should you import the actual module?**
* **Should you import actual services instead of mocks?**

+++

## Angular TestBed

MyComponent

```javascript
@Component({
  template: '<h3>{{greeting}}</h3>',
  selector: 'my-component'
})
export class MyComponent {
  private greeting = '';
  constructor(private essentialService: EssentialService){}
  public greet() {
    this.greeting = this.essentialService.getGreeting();
  };
}
```

+++

### Testing `MyComponent` with Mock Dependencies

```javascript
const mockEssentialService = {
  getGreeting: () => {
    return 'hello world';
  }
};

TestBed.configureTestingModule({
  declarations: [
    MyComponent
  ],
  providers: [
    { provide: EssentialService, useValue: mockEssentialService }
  ]
});

```

+++

```javascript
describe('My Component', () => {

  let comp: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let el: HTMLElement;

  const mockEssentialService = // you know...

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent],
      providers: [
        { provide: EssentialService, useValue: mockEssentialService }
      ]
    });
    fixture = TestBed.createComponent(MyComponent);
    comp = fixture.componentInstance;
  });

  it('should show hello world when greet is invoked', () => {
    el = fixture.nativeElement;
    comp.greet();
    fixture.detectChanges();
    expect(el.textContent).toContain('hello world');
  });

});
```

+++

## Angular TestBed

### A Test that Imports a Real Module

```javascript

TestBed.configureTestingModule({
  imports: [MyFeatureModule],    // <- the real module
  providers: []
});

```

* `MyFeatureModule` will declare the component and provide the real `EssentialService`.
* If `EssentialService` depends on `Http`, you will have to provide it.
* If you decide to add additional providers here, they will override those provided by `MyFeatureMoule`.

+++


## Angular TestBed

### Import Real Dependencies

```javascript
TestBed.configureTestingModule({
  declarations: [MyComponent],
  providers: [
    EssentialService // <- provide the actual service
  ]
});

```

+++

## Angular TestBed - Choosing an Approach

Try different options and consider:

* Do you want to do an integration test or a unit test?
* Will tests break when dependencies change?

---

## Testing Components in a Host Component

* You can configure the TestBed to declare a host component that in turn renders the component you want to test.

---

## Use Helpers That Wrap TestBed Utilities

Example in the [ngrx example app](https://github.com/rangle/angular-ngrx-example/blob/master/src/app/test/test-component-support.class.ts). 

---

## Async

- Keeps track of any asynchronous execution (task and microtasks) so you don't have to worry about calling `done` like this:
```javascript
it('should...', (done) => {
  myobject.getData.then(data => {
    expect(data).toEqual({abc: 123});
    done();
  });
});
```
Zone.js helps...

Notes:
- `async`
- `whenStable`
- `fakeAsync`, `tick()`
- `fixture.debugElement.nativeElement`

+++

## Zone Resources

* Julie Ralph's conference talks:
  * **ng-conf 2016 from May 2016** (caution, `TestComponentBuilder` has since been removed from Angular!)
  * **AngularConnect talk from October 2016**
* **Rangle Gitbook** - https://angular-2-training-book.rangle.io/handout/zones/

+++

## Async

```javascript
it('should...', async(() => {
  myobject.getData.then(data => {
    expect(data).toEqual({abc: 123});
  });
}));
```

+++

## FakeAsync and tick

```javascript
it('should debounce change to search query for 300 ms', fakeAsync(() => {
  spyOn(comp.queryChanged, 'emit');
  comp.onChange('abc');
  tick(100);
  expect(comp.queryChanged.emit).not.toHaveBeenCalled();
  tick(200);
  expect(comp.queryChanged.emit).toHaveBeenCalledWith('abc');
}));
```

Simplied exerpt from the [ngrx example app](https://github.com/mdegani/angular-ngrx-example/blob/unit-test/src/app/video-games/listing/components/video-game-search/video-game-search.component.ts).

---

## The Example App

A simple landing page

- As a product owner I want the rainbow logo to be feature-toggled based on a configuration that is received from the backend API.
- As a marketing guru I want the color of the title to be determined by the configuration set on the backend and recieved from the API.
- Bonus Story: As as logged in user, I should see the rainbow logo (only when the feature is enabled), but I should never see it when I am not logged in.

---

## Exercise 1. Create Tests for a Service

Create some tests and a service for the landing page configuration.

**Create a service that will give a component a colour and a feature flag for a CTA.**

Assume that `ApiService.getConfig()` returns an observable with the following data from our API:

```json
{
  "customizations": {
    "toggles": {
      "logo": true
    },
    "colors": {
      "landingPageTitle": "#ff0066"
    }
  },
  "user": {
    "logged-in": true
  }
}
```

---

## Testing a Component

Here is an example of a test for an Angular component.

```javascript
describe('MyComponent', () => {
  let comp: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyComponent]
    });
    fixture = TestBed.createComponent(MyComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.confirmation'));
    el = de.nativeElement;
  });

  it('should show confirmation message', async(() => {
    comp.getConfirmation();
    fixture.detectChanges();
    expect(el.textContent).toContain('Yup, that\'s fine!');
  }));
});
```

Notes:
- *concepts*: Angular Testing Utilities: `TestBed.configureTestingModule`, `compileComponents()`, `TestBed.createComponent` (fixture), `fixture.componentInstance` (component instance), `fixture.detectChanges()`, `async`.
- *concepts*: Spying on outputs.
- Docs show subscribing to an output: `src/app/dashboard/dashboard-hero.component.spec.ts`.

+++

## Components that Depend on Other Components

- Component stubs help us satisfy dependencies on other components while keeping our tests focused.
- We can also do a shallow render to avoid having to declare custom components for our tests.
- Or we can import the actual components
- What problems might you encounter with each of the above approaches?

Notes:
- TODO: example like https://angular.io/docs/ts/latest/guide/testing.html#!#stub-component
- Shallow rendering suppresses the errors that we often see in the console when we use a component in our Angular templates without including it in the `declarations` of our module.

---

## Example 2. Testing a Component

Create some tests and a component that will accept the configuration from the service and satisfy the AC.

+++

#### AC
- As a product owner I want the rainbow logo to be feature-toggled based on a configuration that is received from the backend API.
- As a marketing guru I want the color of the title to be determined by the configuration set on the backend and recieved from the API.
- Bonus Story: As as logged in user, I should see the rainbow logo (only when the feature is enabled), but I should never see it when I am not logged in.

+++

- Test whether the `*ngIf` (show/hide) feature is working as expectd given the state of the component.
- Test whether the feature is being toggled based on the server response.
- Create a spy for an output
- Try importing the actual module?  Does it work?
- Is it worth trying to mock the required dependencies?

---

## Exercise 2: Components with Rangle Testing Utilities

* use the utilities to simplify the tests we wrote

+++

## Exercise 2b: Add a Component to the Template

* Use `NO_ERRORS_SCHEMA` or `CUSTOME_ELEMENTS_SCHEMA`.
* What problems could this cause?  Try mocking the required Angular component instead.

---

## Sidenote: Look at Angular's Tests

- Look at Angular's source for examples of tests, or type files for documentation.
- Use Angular's own tests for ideas. For example, you can look at tests for `*ngIf` to get ideas on how to parts of the DOM that should or should not be there. https://github.com/angular/angular/blob/master/packages/common/test/directives/ng_if_spec.ts#L46. This tests show uses of debugElement _and_ nativeElement side-by-side.
- We're not covering directives in this workshop, but the tests for `ngFor` are a good example [ngFor unit tests](https://github.com/angular/angular/blob/master/packages/common/test/directives/ng_for_spec.ts)

---

## Example 3: Testing pure Pipes

* To test a pipe, run assertions against its `transform` method. Ideally `transform` is a pure function.
* Let's create a pipe that makes some text bold.

---

## Example 4: TDD Pure Logic

+++
##The ngrx example application

This example application shows best practices for building a modern Angular application using a redux-style architecture.s
- It groups configurations with relevant objects. For example, if you delete a component's directory, you'll be deleting it's routing configuration automatically.
- It demonstrates use of ngrx effects and integrating a REST api with ngrx (redux).
- Updated to Angular 4.
- Demonstrates a variety of testing scenarios because the applcation contains different types of Angular elements including components with inputs and outputs and services that depend on Http.

Notes:
- https://github.com/rangle/angular-ngrx-example
- **Architecture - Refactoring - Unit Testing** are all related and connected to each other.
- Take the time to explore this application. The exercise app in this workshop is based on a simplified version of it. 