# Intern list

Project in VUE/Vite for managing list of users/interns that provied possibility to show list of all users, creating new one, editing and deleting entries.

- [Usage](#usage)
- [Limitations](#Limitations)
- [Project features](#project-features)
- [Author and licence](#author-and-license)

## Usage

Firstly we need to install 3rd party libraries:

```sh
npm install
```

To run development environment with hot-reload:

```sh
npm run dev
```

Build for production compiled and minified version:

```sh
npm run build
```

## Limitations

Due to used external API (https://reqres.in/) that requires JSON format for all REST calls I have to send images as base64 formatted data. Since files used in avatars shouldn't be large I guess it's not a big deal, but worth a mention.

Another one is not working search. Given API doesn't have known to me possibility to add param for filtering purposes, so currently it does nothing. I could limit list locally, but it would be confusing and inaccurate (if searched value would exist in other page than the one we are currently on it wouldn't be shown) or it could have performance issues (this would be possible by fetching all pages and than adding local filtering).

Design might be a little bit different than given reference pictures, but I tried to keep form elements to be consistent in all pages. I won't be a problem to add search bar background or round more 'Add users' button and it might be done in scoped styles, but that would give mentioned inconsistency.

I also didn't limit avatar props (weight, diamentions or extenstions - except it must be an image), so sometimes avatar aspect ratios can be weird.

## Project features

Basic features:

- [x] Show list of all users
- [x] Create new user form
- [x] Edit existing user
- [x] Delete user entry
- [x] Pagination of list of users
- [x] Responsive UI/UX
- [x] Page is SPA made in VUE framework with lazy loaded components

Extra features:

- [x] 'Go back' icon button on add/edit user forms
- [x] Prevent page leave if forms are dirty (different than original values)
- [x] Allow in edit form to revert names or avatar image to original state
- [x] Toasts for informing user about progress
- [x] Confirm delete modal
- [x] Prevent double send (block sending buttons while API call is pending)

## Author and license

Author: Krzysztof 'Shlizer' Hinc<br>
License: MIT
