import React, {useState} from 'react';

 const Register = (props) => {
	
	const [name, setName] = useState('');
	const [email,setEmail] = useState('');
	const [password, setPassword] = useState('');
	
	const onSubmitSignin = () =>{
		fetch('https://ancient-forest-08678.herokuapp.com/register', {//fetch will automatically use GET method, but we want POST
			method : 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if (user.id){
				props.loadUser(user);
				props.onRouteChange ('home');
				props.isSignedIn(true);
			}
		})
		
	}
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				         		type="name"
				          		name="name"
				            	id="name"
				            	onChange = {(name)=>setName(name.target.value)}
				            />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address"
				        onChange = {(email) => setEmail(email.target.value)}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
				         type="password" 
				         name="password"  
				         id="password"
				         onChange = {(password) => setPassword(password.target.value)}
				         />
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick = {() => onSubmitSignin()}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Submit"
				      />
				    </div>
				  </div>
				</main>
			</article>
		);
}

export default Register;