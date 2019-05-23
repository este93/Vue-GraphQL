import {gql} from 'apollo-boost'

/* Posts Queries */
export const GET_PETS = gql`
	query{
		getPets{
			_id
			name
			description
			image
		}
	}
`;

/* User Queries */
/* Post Mutations */

/* User Mutations */
export const SIGNIN_USER = gql`
	mutation($username: String!, $password: String!) {
	  signinUser(username: $username, password: $password) {
	    token
	  }
	}
`;

export const SIGNUP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
	  signupUser(username: $username, email: $email, password: $password) {
	    token
	  }
	}
`;