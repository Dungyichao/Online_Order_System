import React, {Component} from 'react';
import { Redirect, Route } from 'react-router-dom';

export default class ProtectedRoute extends Component {

    constructor(props){
        super(props);

        this.firebase = props.firebase;
        this.user_profile = props.user_profile;
        console.log("Here")
    }

    render() {
        const Component = this.props.component;
        let isAuthenticated = this.props.authed;

        //console.log("ProtectedRoute")

        return isAuthenticated ? (
          
            <Component firebase={this.firebase} user_profile={this.user_profile} />
            
        ) : (
          <Redirect to={{ pathname: '/' }} />
        );
    }
}


export const ProtectedRoutes = ({ component: Component, auth, ...rest }) => {
  //console.log(auth);
  return (auth ? 
    <Route {...rest} render={
      props => <Component {...rest} {...props} />
    } /> : <Redirect to={{ pathname: '/' }} />
  )
}


//<Redirect to={{ pathname: '/customer' }} />

  
  const redirectStart = props => <Redirect to="/console" />

/*
https://ui.dev/react-router-v4-protected-routes-authentication/
https://itnext.io/firebase-login-functionality-from-scratch-with-react-redux-2bf316e5820f
https://blog.logrocket.com/user-authentication-firebase-react-apps/
https://dev.to/mychal/protected-routes-with-react-function-components-dh
https://stackoverflow.com/questions/43164554/how-to-implement-authenticated-routes-in-react-router-4
https://medium.com/javascript-in-plain-english/how-to-set-up-protected-routes-in-your-react-application-a3254deda380
https://www.pluralsight.com/guides/how-to-router-redirect-after-login
https://medium.com/@subalerts/creating-protected-routes-in-react-js-89e95974a822
https://medium.com/@anneeb/redirecting-in-react-4de5e517354a

*/