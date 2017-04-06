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

- TDD helps you define the shape of your objects and names for your functions.
- Put interfaces and associated functions all in one place.
- See the [ngrx example app](https://github.com/rangle/angular-ngrx-example/blob/master/src/app/video-games/interfaces/video-game/video-game.interface.spec.ts)

---

# Pipes and Component Logic

---

## Isolated Unit Tests

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

## Creating an Instance

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

## Pipe Test

Testing a pipe is similar.

---

# Components With Templates

---

## Angular TestBed

TestBed helps when you have non-trivial logic in your template (`ngFor`s, `ngIfs`).

TestBed also helps you provide any dependecies when testing components and services.

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

## The Example App

A simple landing page

- As a product owner I want the rainbow logo to be feature-toggled based on a configuration that is received from the backend API.
- As a marketing person I want the color of the title to be determined by the configuration set on the backend and recieved from the API.

```json
{
  "customizations": {
    "toggles": {
      "logo": true,
    },
    "colors": {
      "landingPageTitle": "#ff0066"
    }
  }
}
```

---

## Use Helpers That Wrap TestBed Utilities

Example in the [ngrx example app](https://github.com/rangle/angular-ngrx-example/blob/master/src/app/test/test-component-support.class.ts).

---

# Services

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

## Appendix: More Component Tests

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

## Appendix: Components that Depend on Other Components

* Component stubs help us satisfy dependencies on other components while keeping our tests focused.
* We can also do a shallow render to avoid having to declare custom components for our tests.
* Use `NO_ERRORS_SCHEMA` or `CUSTOME_ELEMENTS_SCHEMA`.
* Or we can import the actual components
* What problems might you encounter with each of the above approaches?

Notes:
- TODO: example like https://angular.io/docs/ts/latest/guide/testing.html#!#stub-component
- Shallow rendering suppresses the errors that we often see in the console when we use a component in our Angular templates without including it in the `declarations` of our module.

