1. What is the difference between Component and PureComponent?
   Give an example where it might break my app.
   A:

2. Context + ShouldComponentUpdate might be dangerous. Why is
   that?
   A:

3. Describe 3 ways to pass information from a component to its
   PARENT.
   A: useImperativeHandle, global states and useContext

4. Give 2 ways to prevent components from re-rendering.
   A: useCallback can be used to prevent functions to be unnecessarily recreated and therefore rerendering the component.
   The same for useMemo when memoizing variables.

5. What is a fragment and why do we need it? Give an example where it
   might break my app.
   A:

6. Give 3 examples of the HOC pattern.
   A:

7. What's the difference in handling exceptions in promises,
   callbacks and async...await?
   A:

8. How many arguments does setState take and why is it async.
   A:

9. List the steps needed to migrate a Class to Function
   Component.
   A:

10. List a few ways styles can be used with components.
    A: JSS inline styling, styled components, regular styling importing from css and css processors

11. How to render an HTML string coming from the server.
    A: Using the dangerouslySetInnerHtml attribute on react, or even setting innerHTML prop on a dom element.
    The string to be rendered should always be sanitized
