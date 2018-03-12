# Submission
---
### Notes
- I am using loremflickr URLs to populate my images so they may not always match between list and detail view

- Mobile devices were taken into consideration. I tried to optimize the viewport for both large and small screens. This also led to the decision to use button filtering to allow for easy toggling on a phone. Admittedly, this would be an issue if there were many more categories.

## Future Considerations
If I had more time I would:

- Add pagination
- Add flash messages for actions such as delete
- Implement Redux to manage the state if the project were to grow larger
- Handle loss of internet connection by implementing something like Offline.js
- Add more complex filtering by gathering information such as if the number of categories is constant. Get required search parameters (event name, event time, location, etc.). Do we want to search within a certain time window as opposed to a specific date? Do we want to search within a geographical radius?
- Implement server side rendering by adding a render handler to the server file that uses `ReactDOMServer.renderToString` to convert my components to HTML and then inject it into the `index.html` file.
