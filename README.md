Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)



## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./assets/images/review.png)
![](./assets/images/review_light_theme.png)
![](./assets/images/review_active.png)




### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Javascript Functionality



### What I learned


<h3>Dynamic DOM Manipulation</h3>
    <p>Learned how to generate HTML elements (cards) dynamically from a JSON data source using JavaScript.<br>
   Used `document.createElement`, `classList`, and `innerHTML` to build and update the UI.</p>

<h3>State Management</h3>
    <p>Managed a global array (`allExtensions`) to store and update the state of all extensions.
    <br> Implemented a filter state (`currentFilter`) to control which cards are shown (All, Active, Inactive).</p>

<h3>Event Handling</h3>
    <p>Attached event listeners to dynamically created elements for removing cards and toggling their active/inactive state.
   <br> Used event delegation and `stopPropagation` to prevent unwanted event bubbling (e.g., clicking Remove doesn't toggle the switch).
    </p>

<h3>Unique Identification</h3>
    <p>Assigned a unique `_uid` to each extension to reliably identify and update/remove the correct card, even after filtering or reordering.</p>

<h3>Filtering and Rendering</h3>
    <p>Implemented filtering logic to show only active, inactive, or all extensions based on user selection.
    <br>Ensured the UI updates correctly after any change (removal, toggle, or filter switch).</p>


<h3>Accessibility and Usability</h3>
    <p>Used `tabindex` and `type="button"` to improve keyboard navigation and prevent accidental form submissions.
    <br>Wrapped controls in separate containers to avoid event overlap and improve user experience.</p>

<h3>Code Organization</h3>
    <p>Broke down logic into clear functions: rendering, event attachment, filtering, and theme management.
    <br>Used comments and clear variable names for maintainability.</p>

<h3>Debugging and Iteration</h3>
     <p>Learned to debug issues with event bubbling, index mismatches, and UI glitches by isolating problems and testing fixes.
    <br>Improved reliability by using unique IDs and careful event handling.</p>


Summary:
This project deepened my understanding of dynamic UI rendering, event handling, state management, and user experience best practices in vanilla JavaScript. I also learned how to debug tricky UI bugs and make my code more robust and maintainable.

