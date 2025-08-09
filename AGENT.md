## Module Purpose

The **EventManagement** module is a lazily loaded feature module that manages the creation, editing, deletion, and display of events.  
It contains its own routing configuration and utilizes the shared module for common services and UI components.

The main page of this module displays a list of events, which can be viewed in two layouts:

- **Table view**
- **Card view**

Key features:

- Create new events with details such as title, cover image, start date, and more.
- Edit existing events.
- Delete events.
- Support for both **private** and **public** events. Public events provide a shareable link.
- Filter events using:
  - A toggle between private and public events.
  - A search input that filters by event title.
- For public events, copying the event link provides a URL that, when opened in a browser, will:
  - Load the event list page.
  - After events are loaded, automatically open the **details sidebar**.
  - Display the details of the event whose link was copied.

## Architecture Overview

The **EventManagement** module follows a modular, component-driven architecture with clear separation of concerns.

### Folder Structure

### Layout

The main layout includes:

- A header component (`app-em-header`) at the top.
- A `<router-outlet>` for rendering the active page.
- Responsive layout using NG-ZORRO grid system.
- Folder name is _layout in /private/event-management

- **pages/**  
  Contains the main feature pages.  
  Pages handle:

  - Fetching data from API services.
  - Managing page-level state.
  - Coordinating communication between child components via `@Input()` and `@Output()` bindings.

- **components/**  
  Contains reusable UI building blocks.  
  Components are designed to be composable and stateless where possible, receiving data and emitting events to their parent page components.

- **routing file**  
  Defines the lazy-loaded routes for the module, allowing for additional pages to be added easily.

### Data & State Handling

- **Signals** are used for managing and updating reactive state within components.
- **RxJS** is used for:
  - Reading query parameters from the route.
  - Managing asynchronous data flows such as API calls.

### External Dependencies

The module depends on:

- **Shared module** – for common services and UI modules.
- **Common directory** (outside the module) – contains globally used directives, components, services, pipes, and models.

## How to Extend

### Add a New Field to the Form

To add a new field in the **Add/Edit Event Modal** component (`add-edit-event-modal`):

1. **Update the HTML template**  
   Add the new field using Angular Reactive Forms and Ant Design inputs inside the modal’s HTML, using the appropriate `formControlName` and Ant Design components.

2. **Update the FormGroup**  
   In the component class, add a new control to the `FormGroup` instance:

   ```typescript
   form = new FormGroup({
     ...
     yourNewField: new FormControl('', [Validators.required]),
     ...
   });

   ### Sync the New Field Data for Edit Mode
   ```

- The modal is used for both creating and editing events.
- When in `editMode`, the form must be populated with existing event data using the `fillEventFormData` method.
- Make sure to update this method to set the new field’s value correctly when editing.

---

### Update the Event Model/Interface

- Define the new field in the Event model or interface.
- If the field is mandatory, define it as:

  ```typescript
  yourNewField: type;
  ```

- Make sure to update this method to populate the new field's value when editing.

---

- **Update the Event model/interface**  
  Define the new field in the Event model or interface:

  ```typescript
  yourNewField?: type;

  ```

- **Handling form submission**  
  When the modal closes, the form’s current values are emitted to the parent component for processing (e.g., saving the event).

---

# AI Agent Notes

- Used ChatGPT for onboarding with Ant Design.
- Used ChatGPT for writing a global sidebar.
- Utilized Cursor for refactoring, speeding up coding, and managing paths across different files.
- Naming convention followed: **camelCase**.

## Known Limitations / TODOs

- Consider using Ant Design's **Carousel** component to display an event photo gallery in the sidebar details.

- Add the ability to **select multiple events** in the list view (via checkboxes or row selection) and delete them in a single action.

  - Use Ant Design's built-in table row selection feature.
  - Provide a "Delete Selected" button in the toolbar.
  - Confirm deletion with a modal before proceeding.
