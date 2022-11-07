import React from 'react';
import { Link, Redirect, Route, useParams, Switch } from 'react-router-dom';

const users = [0, 1, 2, 3, 4];
const isUserExist = (userId) => users.some((uid) => uid === Number(userId));

function MainPage() {
   return (
      <>
         <h2>Main Page</h2>
      </>
   );
}

function UsersLayout() {
   return (
      <>
         <h2>Users Layout</h2>
         <p>
            <Link to="/">Main Page</Link>
         </p>
         <Switch>
            <Route path="/users" exact component={UsersList} />
            <Route
               path="/users/:userId/profile"
               exact
               component={UserProfilePage}
            />
            <Route path="/users/:userId/edit" exact component={UserEditPage} />
            <Redirect to="/users/:userId/profile" />
         </Switch>
      </>
   );
}

function UsersList() {
   return (
      <>
         <h2>User List Page</h2>
         <ul>
            {users.map((uid) => (
               <li key={uid}>
                  <Link to={`/users/${uid}`}>{`User ${uid}`}</Link>
               </li>
            ))}
         </ul>
      </>
   );
}

function UserProfilePage() {
   const { userId } = useParams();

   if (!isUserExist(userId)) return <Redirect to={'/users'} />;

   return (
      <>
         <h2>User Page</h2>
         <ul>
            <li>
               <Link to="/users">Users List page</Link>
            </li>
            <li>
               <Link to={`/users/${userId}/edit`}>Edit this user</Link>
            </li>
         </ul>
         <p>{`userId: ${userId}`}</p>
      </>
   );
}

function UserEditPage() {
   const { userId } = useParams();

   if (!isUserExist(userId)) return <Redirect to={'/users'} />;

   return (
      <>
         <h2>Edit User Page</h2>
         <ul>
            <li>
               <Link to={`/users/${userId}`}>User profile Page</Link>
            </li>
            <li>
               <Link
                  to={
                     isUserExist(Number(userId) + 1)
                        ? `/users/${Number(userId) + 1}`
                        : `/users/${users[0]}`
                  }
               >
                  Another User
               </Link>
            </li>
            <li>
               <Link to="/users">Users List page</Link>
            </li>
         </ul>
      </>
   );
}

function App() {
   return (
      <>
         <h1>App Layout v5</h1>
         <Link to="/users">Users list Page</Link>
         <Switch>
            <Route path="/" exact component={MainPage} />
            <Route path="/users/:userId?/:page?" component={UsersLayout} />
            <Redirect from="*" to="/" />
         </Switch>
      </>
   );
}

export default App;
