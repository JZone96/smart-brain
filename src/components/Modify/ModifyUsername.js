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

const ModifyUsername = ({user}) =>{
	var subtitle;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [newName, setNewName] = useState('');
	const [oldName, setOldName] = useState('');

	const openModalUsername = () =>{
		setModalIsOpen(true);
	}
	const afterOpenModal = () => {
	    // references are now sync'd and can be accessed.
	    subtitle.style.color = '#f00';
  	}
	const closeModalUsername = () =>{
  		setModalIsOpen(false);
  	}

  	const onClickFetchName = () =>{
  		fetch (`https://ancient-forest-08678.herokuapp.com/modify/name`, {//fetch will automatically use GET method, but we want PUT
				method : 'put',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					newName: newName,
					oldName: oldName
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
  	}

  	let userInfoLayout;

  	if (window.screen.width>970){
  		userInfoLayout = (		<div className='flex flex-wrap justify-between'>
  									<div className=' w-25 pa3 mr2'>
									    <p className='f3 lh-copy tl fw5'>Current Username:</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <p className='f4 lh-copy tl'>{user.name}</p>
									  </div>
									  <div className=' w-25 pa3 mr2'>
									    <button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalUsername}>
									    	Change Username
									    </button>
									   </div>
								</div>);
  	}else{
  		userInfoLayout = (		<div className='flex flex-column flex-wrap w-100'>
  									<div className="w-25 pa3 mr2">
  										<p className='f4 lh-copy tl fw5'>Current Username:</p>
  									</div>
  									<div className="w-25 pa3 mr2">
  										<p className='f4 lh-copy tl'>{user.name}</p>
  									</div>
  									
  										<button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue'
									    onClick = {openModalUsername}>
									    	Change Username
									    </button>
  									
								</div>);

  	}

  	return (

  			<div className='user  w-100 pa3 mr2'>
								    
									  {userInfoLayout}
									  
									    
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
												      <input className="b ph3 pv2 ba b--black bg-transparent grow pointer f6 dib" 
												      type="button" 
												      value="Submit" 
												      onClick = {()=>onClickFetchName()}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>


 
									  
									
								  </div>
  		)
}

export default ModifyUsername;