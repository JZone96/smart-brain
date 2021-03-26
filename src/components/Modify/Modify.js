import react, {useState} from 'react';
import '../ImageLinkForm.css';
import Modal from 'react-modal' ;

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

const ModifyUser = ({user, toggle, changeUsername}) =>{
	var subtitle;
	const email = user.email;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalEmail, setModalEmail] = useState(false);
	const [modalPassword, setModalPassword] = useState(false);
	const [newName, setNewName] = useState('');
	const [oldName, setOldName] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [oldEmail, setOldEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [oldPassword, setOldPassword] = useState('');

	const openModalUsername = () =>{
		setModalIsOpen(true);
	}
	const openModalEmail = () =>{
		setModalEmail(true);
	}
	const openModalPassword = () =>{
		setModalPassword(true);
	}
	const afterOpenModal = () => {
	    // references are now sync'd and can be accessed.
	    subtitle.style.color = '#f00';
  	}
  	const closeModalUsername = () =>{
  		setModalIsOpen(false);
  	}
  	const closeModalEmail = () =>{
  		setModalEmail(false);
  	}
  	const closeModalPassword = () =>{
  		setModalPassword(false);
  	}

  	const onClickFetch = (elementToModify) =>{
  		if (elementToModify==='name'){
  			fetch (`https://ancient-forest-08678.herokuapp.com/modify/${elementToModify}`, {//fetch will automatically use GET method, but we want PUT
				method : 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					newName: newName,
					oldName: oldName
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	console.log(modifiedElement);
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
  		}else if (elementToModify==='email'){
  			fetch (`https://ancient-forest-08678.herokuapp.com/modify/${elementToModify}`, {//fetch will automatically use GET method, but we want PUT
				method : 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					newEmail: newEmail,
					oldEmail: oldEmail
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	console.log(modifiedElement);
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
  		}else if (elementToModify==='password'){
  			fetch (`https://ancient-forest-08678.herokuapp.com/modify/${elementToModify}`, {//fetch will automatically use GET method, but we want PUT
				method : 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					newPassword: newPassword,
					oldPassword: oldPassword,
					email: email
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
  		}
  		
  	}
	


	return(

		<div>
			<div className='tr'>
				<p className='tc f2 lh-title'>User Informations</p>
			</div>
			<div className='form center pa4 br3 shadow-5 w-90'>
			
				<div className = 'container pa3 center tc w-100'>
					<div className='flex flex-column items-center w-100'>
						<div className=' w-75 pa3 mr2'>
						    <div className='flex flex-column'>
								  <div className='user  w-100 pa3 mr2'>
								    <div className='flex justify-around'>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl'>Current Username:</p>
									  </div>
									  <div className=' w-50 pa3 mr2'>
									    <p className='f4 lh-copy tl'>{user.name}</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalUsername}>
									    	Change Username
									    </button>
									    
									    <Modal
											isOpen={modalIsOpen}
											onAfterOpen={afterOpenModal}			          
											onRequestClose={closeModalUsername}			          
											style={customStyles}		          
											contentLabel= 'Username'>
											<h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
											<main className="pa4 black-80">
											  <form className="measure center">
											    <fieldset id="Username" className="ba b--transparent ph0 mh0">
											      <legend className="f4 fw6 ph0 mh0">Change Username</legend>
											      <div className="mt3">
											        <label className="db fw6 lh-copy f6" htmlFor="email-address">New Username</label>
											        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="newUser" 
											        name="newUser"  
											        id="newUser" 
											        onChange = {username => setNewName(username.target.value)}/>
											      </div>
											      <div className="mv3">
											        <label className="db fw6 lh-copy f6" htmlFor="password">Old Username to confirm</label>
											        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="oldUser" 
											        name="oldUser"  
											        id="oldUser"
											        onChange = {username => setOldName(username.target.value)}/>
											      </div>
											      <div className="">
												      <input className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib" type="button" value="Submit" onClick = {()=>onClickFetch('name')}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>


 
									  </div>
									</div>
								  </div>

								  <div className='email  w-100 pa3 mr2'>
								    <div className='flex justify-around'>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl'>Current Email:</p>
									  </div>
									  <div className=' w-50 pa3 mr2'>
									    <p className='f4 lh-copy tl'>{user.email}</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalEmail}>
									    	Change Email
									    </button>

									    <Modal
											isOpen={modalEmail}
											onAfterOpen={afterOpenModal}			          
											onRequestClose={closeModalEmail}			          
											style={customStyles}		          
											contentLabel= 'Email'>
											<h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
											<main className="pa4 black-80">
											  <form className="measure center">
											    <fieldset id="email" className="ba b--transparent ph0 mh0">
											      <legend className="f4 fw6 ph0 mh0">Change Email</legend>
											      <div className="mt3">
											        <label className="db fw6 lh-copy f6" htmlFor="email-address">New Email</label>
											        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="email" 
											        name="email-address"  
											        id="email-address"
											        onChange={email=>setNewEmail(email.target.value)}/>
											      </div>
											      <div className="mv3">
											        <label className="db fw6 lh-copy f6" htmlFor="password">Old Email to confirm</label>
											        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="email" 
											        name="email-address"  
											        id="email-address"
											        onChange={email=>setOldEmail(email.target.value)}/>
											      </div>
											      <div className="">
												      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
												      type="button" 
												      value="Submit" 
												      onClick = {()=>onClickFetch('email')}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>


									  </div>
									</div>
								  </div>

								  <div className='joined  w-100 pa3 mr2'>
								    <div className='flex justify-around'>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl'>Joined:</p>
									  </div>
									  <div className=' w-50 pa3 mr2'>
									    <p className='f4 lh-copy tl'>{user.joined}</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <p></p>
									  </div>
									</div>
								  </div>
							 </div>
						</div>

						<div className=' w-25 pa3 mr2 tc'>
						    <button className= 'w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
						    onClick={openModalPassword}>
						    	Change Password
						    </button>
						    <Modal
											isOpen={modalPassword}
											onAfterOpen={afterOpenModal}			          
											onRequestClose={closeModalPassword}			          
											style={customStyles}		          
											contentLabel= 'Password'>
											<h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
											<main className="pa4 black-80">
											  <form className="measure center">
											    <fieldset id="Password" className="ba b--transparent ph0 mh0">
											      <legend className="f4 fw6 ph0 mh0">Change Password</legend>
											      <div className="mt3">
											        <label className="db fw6 lh-copy f6" htmlFor="email-address">New Password</label>
											        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="password" 
											        name="password-new"  
											        id="password"
											        onChange = {password => setNewPassword(password.target.value)}/>
											      </div>
											      <div className="mv3">
											        <label className="db fw6 lh-copy f6" htmlFor="password">Old Password to confirm</label>
											        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
											        type="password" 
											        name="password-old"  
											        id="password-old"
											        onChange = {password => setOldPassword(password.target.value)}/>
											      </div>
											      <div className="">
												      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
												      type="button" 
												      value="Submit" 
												      onClick = {()=>onClickFetch('password')}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>

						</div>
					</div>
				</div>
			</div>
		</div>

		);
}

export default ModifyUser;
