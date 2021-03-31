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

const ModifyPassword = ({user}) =>{
	var subtitle;
	const email = user.email;
	const [modalPassword, setModalPassword] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [oldPassword, setOldPassword] = useState('');

	const openModalPassword = () =>{
		setModalPassword(true);
	}
	const afterOpenModal = () => {
	    // references are now sync'd and can be accessed.
	    subtitle.style.color = '#f00';
  	}
  	
  	const closeModalPassword = () =>{
  		setModalPassword(false);
  	}

  	const onClickFetchPassword = () =>{
  		fetch (`https://ancient-forest-08678.herokuapp.com/modify/password`, {//fetch will automatically use GET method, but we want PUT
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

  	return (
  			<div className="fl w-100 w-50-ns pa2">
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
												      onClick = {()=>onClickFetchPassword()}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>

						</div>
  		)
}

export default ModifyPassword;