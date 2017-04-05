# angluar-testing-workshop

write test
  ➡ see test fail 
    ➡ write code to make it pass 
      ➡ refactor 

## View the slides

`cd slides`
`npm install`
`npm start`
http://localhost:8081/

### Draft guide

* Basic TestBed: http://localhost:8081/#/9 (press ⬇️)
* Async and FakeAsyc usage: http://localhost:8081/#/12
* Component example: http://localhost:8081/#/15

## Resources

### Angular.io

https://angular.io/docs/ts/latest/guide/testing.html
### Rangle's ngrx architecture example app

https://github.com/rangle/angular-ngrx-example/

## exercises

Based on ngrx example app (above) using Angular 4.0.0

`cd exercises`

`yarn`✨ or `npm install`

`npm run ex1`

API: http://localhost:3000

App: http://localhost:4200

`npm test ex1`

Code for exercise is in `ex1/app/landing-page`.

To modify backend data, stop the app edit `mock-api/database.json` and restart.

The backend will accept starndard REST style requests and persist data to the json file as well.

For the solution replace "ex1" with "ex1-sol".

### Goal for the Exercise

#### Test Utility Wrappers

Configure test module: `import { configureTestModule } from './test/configure-test-module.function';

```javascript
// usage:
beforeEach(configureTestModule({
  imports: [],
  declarations: []
  providers: [],
}));
```

Wrappers: `import {TestComponentSupport} from './test/test-component-support.class'

```javascript
// usage:
let support:TestComponentSupport<MyComponent> = new TestComponentSupport(MyComponent);

```
public API:

* `component` Type `T` (an instance of your component)
* `detectChanges()` Runs change detection on your component.
* `update()` Runs `ngOnChanges` on your component, if available.
* `whenStable()` Same as Fixture method of same name.
* `querySelector(selector: string): any` Retuns an HTMLElement.  Could probably be `querySelector(selector: string): HTMLElement`
* `querySelectorAll(selector: string): any[]`
* `getAttributeValue(selector: string, attributeName: string)`
* `getStyle(selector: string)`
* `getClassNames(selector: string)`
* `getInnerHtml(selector: string)`

#### AC
- As a product owner I want the rainbow logo to be feature-toggled based on a configuration that is received from the backend API.
- As a marketing guru I want the color of the title to be determined by the configuration set on the backend and recieved from the API.
- Bonus Story: As as logged in user, I should see the rainbow logo (only when the feature is enabled), but I should never see it when I am not logged in.

#### Implementatin Plan

Create interfaces for Cusomizations to express the shape of data.  We will need:
```javascript
export interface ICustomizations {
  colors: IColors,
  toggles: IToggles
}

export interface IColors {
  landingPageTitle: string
}

export interface IToggles {
  logo: boolean
}
```

We will also need functions such as `isMyFunctionEnabled(IToggles):boolean` to satisfy the AC.

Create a service (@Injectable) for `Customizations` that gets data from the API that has `getColor():Observable<IColors>` and `getToggles():Observable<IToggles>` methods.

Create a container component that will use `AsyncPipe` to get data from the service and pass the actual values down a component that will show the title and the rainbow.  This means we'll have to move the title from the container into a new component and replace the container's template with something that looks like this:

```html
<my-component
  [title-color] = "(customizationsService.getColor() | async)?.landingPageTitle"
  [logo-toggle] = "(customizationService.getToggles() | async)?.logo">
</my-component>
```

`MyComponent` should not have to worry about observables and just the values it needs.  This component will have template logic, that we should test.