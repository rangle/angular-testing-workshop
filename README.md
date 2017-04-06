# Angluar Testing Workshop

## View the slides

`cd slides`
`npm install`
`npm start`
http://localhost:8081/

## Resources

### Angular.io

### Rangle's ngrx architecture example app

https://github.com/rangle/angular-ngrx-example/

## exercises

Using Angular 4.0.0

`cd exercises`

`yarn` or `npm install`

`npm run ex1`

API: http://localhost:3000

App: http://localhost:4200

`npm test ex1`

Code for exercise is in `ex1/app/landing-page`.

To modify backend data, stop the app edit `mock-api/database.json` and restart.

For the solution replace "ex1" with "ex1-sol".

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
