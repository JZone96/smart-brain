import React from 'react';

const Navigation = ({onRouteChange, isSignedIn,setInitialState,route}) =>{

	const resetEverything = () =>{
		setInitialState();
		localStorage.removeItem("userId");
	}	
	if (isSignedIn && route === 'home'){
		return(
			<nav style ={{display: 'flex', justifyContent:'flex-end'}}>
				<p onClick = {()=>resetEverything()}
				className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				<p onClick = {() => onRouteChange('modify')}
				className='f3 link dim black underline pa3 pointer'>Modify</p>
			</nav>
		);
	}else if (isSignedIn && route === 'modify'){
		return(
			<nav style ={{display: 'flex', justifyContent:'flex-end'}}>
				<p onClick = {()=>resetEverything()}
				className='f3 link dim black underline pa3 pointer'>Sign Out</p>
				<p onClick = {() => onRouteChange('home')}
				className='f3 link dim black underline pa3 pointer'>Home</p>
			</nav>
			);
		
	}else{
		return(
		<nav style ={{display: 'flex', justifyContent:'flex-end'}}>
			<p onClick = {() => onRouteChange('signin')}className='f3 link dim black underline pa3 pointer'>Sign In</p>
			<p onClick = {() => onRouteChange('register')}className='f3 link dim black underline pa3 pointer'>Register</p>
		</nav>
		);
	}
	
}

export default Navigation;