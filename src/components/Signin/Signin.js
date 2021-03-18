import React, {useState} from 'react';

const Signin = (props) =>{

	const [signInEmail, setSigninEmail] = useState('');
	const [signInPassword, setSigninPassword] = useState('');

	const onSubmitSignin = () =>{
		fetch('https://ancient-forest-08678.herokuapp.com/signin', {//fetch will automatically use GET method, but we want POST
			method : 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: signInEmail,
				password: signInPassword,
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if (user.id){
				/*console.log(user)
				localStorage.setItem('email', user.email);
				localStorage.setItem('entries', user.entries);
				localStorage.setItem('id', user.id);
				localStorage.setItem('joined', user.joined);
				localStorage.setItem('name', user.name);*/
				props.loadUser(user);
				props.onRouteChange ('home')
				props.isSignedIn(true)
			}
		})
		
	}
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        		type="email" 
				        		name="email-address"  
				        		id="email-address"
				        		onChange = {(email) => setSigninEmail(email.target.value)}
				        		/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        onChange = {(password) => setSigninPassword(password.target.value)}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick = {() => onSubmitSignin()}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Sign in"
				      />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick = {()=>props.onRouteChange('register')}className="f6 link dim black db pointer">Register</p>
				    </div>
				  </div>
				</main>
			</article>
		);
}

export default Signin;