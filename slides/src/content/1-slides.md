# Angular Unit Testing Workshop

# Rangle.io

+++

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

## Setup

- Clone the repo.

---

## Angular is Object Oriented

- *Services* are classes
- *Pipes* are classes with a transform method
- *Components* are classes that angular combines with templates
  - Logic often lives in our templates (in `*ngFor`s and in `*ngIf`s), so to test them we need help from TestBed, but first let's talk about TDD.

---

## Business Logic

Most important tests are for the business logic, which should be in functions.

- Put interfaces and associated functions all in one place.
- See the [ngrx example app](https://github.com/rangle/angular-ngrx-example/blob/master/src/app/video-games/interfaces/video-game/video-game.interface.spec.ts)

---

# Isolated Unit Tests

Testing without the use of `TestBed`.

---

## Example

### The Class

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

## Example

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

+++

## Exercise 1

### Pipe Test

Write a test for the Capitalize pipe.

---

# Dependency Injection and Mocking

---

## Dependency Injection in Angular

- Angular has an injector that takes care of DI for us.
- We can provide dependencies in our tests

+++

## Exercise 2

### Service Test

Write a test for the ToDoService. Mock the dependency and provide and instance of it to the constructor of the service.

+++

## Exercise 3

### Testing a Service that Depends on Http

Write a test for ApiService. Provide a light mock for the Http service.

+++

## Exercise 4

### Testing Logic in a Component

- Let's practice TDD 😊
- Story: "As a user, I want to be able to see the number of to do's on the main page".
- Technical plan: create a method on the component class that returns an observable of the number of to do's.
- Let's not worry about whether or not Angular can show this number -- let's just **test the method**.

---

# Integration Testing with Testbed

---

## Angular TestBed

- TestBed is a class that creates a real Angular runtime for the purposes of testing Angular elements
- It is helpful when:
  - you have logic in your templates and you want to render a component class along with its template for testing (`ngFor`s, `ngIfs`)
  - you want to use Angular's injector to handle dependency injection for you
  - you want to test how different elements integrate in the Angular runtime

- We do not instantiate the class we want to test when using TestBed
  - We let Angular do that for us

- Using the test fixture, Angular will give us the instance it created


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

- `NO_ERRORS_SCHEMA` tells Angular to shallow-render this component.

```javascript
@Component({
  template: '<h3>{{greeting}}</h3>',
  selector: 'my-component'
  schemas: [NO_ERRORS_SCHEMA]
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
* If you decide to add additional providers here, they will override those provided by `MyFeatureMoule`.
* If `EssentialService` depends on `Http`, you will have to override it or use Angular's [mockBackend](https://angular.io/docs/ts/latest/api/http/testing/index/MockBackend-class.html) to override the Angular service that expects to be able to make HTTP requests.

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
  * **[ng-conf 2016 from May 2016](https://www.youtube.com/watch?v=DltUEDy7ItY)** (caution, `TestComponentBuilder` has since been removed from Angular!)
  * **[AngularConnect talk from October 2016](https://www.youtube.com/watch?v=f493Xf0F2yU)**
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

- Use `FakeAsync` as you would use `Async`.
- When you use `FakeAsync` you can control the passage of time by calling `tick()`.

+++

## Exercise 5

- Write a test checks that the list properly filtered.

+++

## Exercise 6

- Write a test to make the search input is properly debounced.


