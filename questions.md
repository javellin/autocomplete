1. **What is the difference between Component and PureComponent?
   Give an example where it might break my app.**\
   A: PureComponent will run a shallow version of shouldComponentUpdate when checking for rerendering (e.g comparing only the object's references instead of its attributes and values) for performance reasons (less checks). In Component you have full control of shouldComponentUpdate on every render cycle.

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?\
   A: Because if shouldComponentUpdate doesn't run for any reason (e.g a shallow comparison with PureComponent where nothing changes), it will not propagate the context to the children.

3. Describe 3 ways to pass information from a component to its
   PARENT.\
   A: useImperativeHandle, useContext and calling a function from the parent with the child data inside

4. Give 2 ways to prevent components from re-rendering.\
   A: useCallback can be used to prevent functions to be unnecessarily recreated and therefore rerendering the component. The same for useMemo when memoizing variables.

5. What is a fragment and why do we need it? Give an example where it
   might break my app.\
   A: So you don't need to introduce addicional html. Every time you return a function component you can only return a single node This is not allowed:

   ```
   items.map(item => (
    <span>{item.id}</span>
    <span>{item.name}</span>
   ))
   ```

   This could be achieved with fragments:

   ```
   items.map(item => (
   <React.Fragment>
      <span>{item.id}</span>
      <span>{item.name}</span>
   </React.Fragment>
   ))
   ```

   Sometimes adding extra divs just to serve as a wrapper can break your app, because of a display:flex for example. Or even cause bad html syntax when using
   elemnents with specific structures like `<ul><li></li></ul>`

6. Give 3 examples of the HOC pattern.\
   A: Authentication, logging and prefetching data

7. What's the difference in handling exceptions in promises,
   callbacks and async...await?\
   A: try catch when using async/await and there's a catch method that's returned from the promise where you
   can handle errors. When using a callback you could pass in a success function and an error function so the method
   can call it by the end of the execution

8. How many arguments does setState take and why is it async.\
   A: You can pass in the updated value or a callback to run only after the state is finally set
   setState could be an expensive operation so they make it async for better perfomance/ui experience

9. List the steps needed to migrate a Class to Function
   Component.\
   A: The render method goes to the return of the function
   State needs to be moved to hooks
   All methods needs to be converted
   All the logic from shouldComponentUpdate should move to multipleUseEffects or different hooks
   Remove all uses of this

10. List a few ways styles can be used with components.\
    A: JSS inline styling, styled components, regular styling importing from css and css preprocessors (Sass/Less)

11. How to render an HTML string coming from the server.\
    A: Using the dangerouslySetInnerHtml attribute on react, or even setting innerHTML prop on a dom element.
    The string to be rendered should always be sanitized
