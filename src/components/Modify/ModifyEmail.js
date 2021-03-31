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

const ModifyEmail = ({user}) =>{

	var subtitle
	const [modalEmail, setModalEmail] = useState(false);
	const [newEmail, setNewEmail] = useState('');
	const [oldEmail, setOldEmail] = useState('');

	const openModalEmail = () =>{
		setModalEmail(true);
	}
	const afterOpenModal = () => {
		    // references are now sync'd and can be accessed.
		    subtitle.style.color = '#f00';
	 }
	const closeModalEmail = () =>{
	  		setModalEmail(false);
	}

	const onClickFetchEmail = () =>{
		fetch (`https://ancient-forest-08678.herokuapp.com/modify/email`, {//fetch will automatically use GET method, but we want PUT
				method : 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					newEmail: newEmail,
					oldEmail: oldEmail
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
	}

	let emailInfoLayout;

	if (window.screen.width>970){
		emailInfoLayout = (
									<div className='flex flex-wrap justify-between'>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl fw5'>Current Email:</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl'>{user.email}</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalEmail}>
									    	Change Email
									    </button>
									    </div>
									 </div>
			);
	}else{
		emailInfoLayout = (
									<div className='flex justify-around'>
									  <div className=' w-100 pa3 mr2'>
									  	<p className='f4 lh-copy tl fw5'>Current Email:</p>
									  	<p className='f4 lh-copy tl'>{user.email}</p>
									    <button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalEmail}>
									    	Change Email
									    </button>
									    </div>
									 </div>

			);
	}

	return(
			<div className='email  w-100 pa3 mr2'>
								    
										{emailInfoLayout}
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
												      onClick = {()=>onClickFetchEmail()}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>
								  </div>
		)
}

export default ModifyEmail;