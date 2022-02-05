# Getting Started with Create React App

Brivity - React Coding Excercise
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Welcome

Using the API endpoints documented below, create a React application that serves as the front-end for a very simple blogging platform.

ie: POST https://brivity-react-exercise.herokuapp.com/users

Your app should provide the UI for users to perform the following actions
Create an Account and authenticate against protected API endpoints using JWT
Create, edit and delete posts
Comment on posts
Browse and read blog posts and comments from other users
Not required, but bonus points will be awarded for any of the following...
Style your application with Tailwind CSS
Utilize an efficient state management pattern such as Context
Demonstrate appropriate error handling
Support pagination or 'Load More...' button for posts and/or comments
Implament a front-end testing framework such as Cypress
Use React Router to create a single-page application

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## APIs

/users
Create an Account
POST - /users
Request Parameters
{"user": {"email": "abc@123.com", "password": "super-secret", "display_name": "Superman"}}
Response
{"id": 1, "display_name": "Superman"}
NOTE: The Authorization response header will contain the JWT Bearer token for the newly created user.
Sign In
POST - /users/sign_in
Request Parameters
{"user": {"email": "abc@123.com", "password": "super-secret"}}
Response
{"id": 1, "display_name": "Superman"}
NOTE: The Authorization response header will contain the JWT Bearer token for the newly created user.

/posts
Posts Index - Paginated
GET - /posts
Request Parameters
/posts?page=1
Response
{"posts": [], "meta": {"current_page": 1, "per_page": 30, "total_entries": 0}}
Post Details
GET - /posts/post_id
Request Parameters
/posts/1
Response
{"post": {"id": 1, "title": "A new post", "body": "Something very interesting!", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "comment_count": 1, "user": {"id": 1, "display_name": "Superman"}}}
Post Comments - Paginated
GET - /posts/post_id/comments
Request Parameters
/posts/1/comments?page=1
Response
{"comments": [{"id": 1, "content": "A comment on the first post!", "created_at": "2021-11-09T17:04:51.895Z", "updated_at": "2021-11-09T17:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}], "meta": {"current_page": 1, "per_page": 30, "total_entries": 1} }
Create a Post - Protected
POST - /posts
Request Headers
Authorization: Bearer 123abc......
Request Parameters
{"post": {"title": "My post from React", "body": "Lorem ipsum..."}}

Response
{"post": {"id": 2, "title": "My post from React", "body": "Lorem ipsum...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
Edit an Existing Post - Protected
PATCH - /posts/post_id
Request Headers
Authorization: Bearer 123abc......
Request Parameters
{"post": {"title": "My Edited Post", "body": "Some new content!"}}

Response
{"post": {"id": 2, "title": "My Edited Post", "body": "Some new content!", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:09:13.895Z", "user": {"id": 1, "display_name": "Superman"}}}
Delete a Post - Protected
DELETE - /posts/post_id
Request Headers
Authorization: Bearer 123abc......
Response
HTTP 204

/comments
Create a Comment - Protected
POST - /comments
Request Headers
Authorization: Bearer 123abc......
Request Parameters
{"comment": {"post_id": 1, "content": "My interesting thought on your post..."}}

Response
{"comment": {"id": 6, "content": "My interesting thought on your post...", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:04:51.895Z", "user": {"id": 1, "display_name": "Superman"}}}
Edit an Existing Comment - Protected
PATCH - /comment/comment_id
Request Headers
Authorization: Bearer 123abc......
Request Parameters
{"comment": {"contents": "My comment edited"}}

Response
{"comment": {"id": 6, "content": "My comment edited", "created_at": "2021-11-09T16:04:51.895Z", "updated_at": "2021-11-09T16:07:45.895Z", "user": {"id": 1, "display_name": "Superman"}}}
Delete a Comment - Protected
DELETE - /comments/comment_id
Request Headers
Authorization: Bearer 123abc......
Response
HTTP 204

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
