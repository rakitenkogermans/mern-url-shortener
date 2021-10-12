import React from 'react';
import LinksPage from "../pages/LinksPage";
import CreatePage from "../pages/CreatePage";
import DetailPage from "../pages/DetailPage";
import AuthPage from "../pages/AuthPage";

//Here we define our routes.
export const privateRoutes = [
    {path: '/links', component: LinksPage, exact: true},
    {path: '/create', component: CreatePage, exact: true},
    {path: '/detail/:id', component: DetailPage, exact: true},
]

export const publicRoutes = [
    {path: '/', component: AuthPage, exact: true},
]

//Here we define our routes. Need to wrap it inside BrowserRouter
// function useRoutes(isAuthenticated) {
//     if (isAuthenticated) {
//         return (
//             <Switch>
//                 <Route path="/links" exact>
//                     <LinksPage/>
//                 </Route>
//                 <Route path="/create" exact>
//                     <CreatePage/>
//                 </Route>
//                 <Route path="/detail/:id" >
//                     <DetailPage/>
//                 </Route>
//                 <Redirect to="/create" />
//             </Switch>
//         );
//     }
//
//     return (
//         <Switch>
//             <Route path="/" exact>
//                 <AuthPage/>
//             </Route>
//             <Redirect to="/" />
//         </Switch>
//     );
// }
//
// export default useRoutes;
