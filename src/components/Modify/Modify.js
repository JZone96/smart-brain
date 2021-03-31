import react, {useState} from 'react';
import '../ImageLinkForm.css';
import Modal from 'react-modal' ;
import ModifyUsername from './ModifyUsername.js';
import ModifyEmail from './ModifyEmail.js';
import ModifyPassword from './ModifyPassword.js';
import DeleteUser from './DeleteUser.js'

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



const ModifyUser = ({user}) =>{

	let joinedInfoLayout

	if (window.screen.width>970){
		joinedInfoLayout = (
				<div className='joined  w-100 pa3 mr2'>
									    <div className='flex flex-wrap justify-between'>
										  <div className=' w-25 pa3 mr2 '>
										    <p className='f4 lh-copy tl fw5'>Joined:</p>
										  </div>
										  <div className=' w-50 pa3 mr2'>
										    <p className='f4 lh-copy tl'>{user.joined}</p>
										  </div>
										</div>
									  </div>
			);
	}else{
		joinedInfoLayout = (
				<div className='joined  w-100 pa3 mr2'>
									    <div className='flex flex-wrap justify-between'>
										  <div className=' w-100 pa3 mr2'>
										    <p className='f4 lh-copy tl fw5'>Joined:</p>
										    <p className='f4 lh-copy tl'>{user.joined}</p>
										  </div>
										</div>
									  </div>
			);
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
								  
						    	<ModifyUsername user={user}/>
						    	<ModifyEmail user={user}/>

								  

								  {joinedInfoLayout}
							 </div>
						</div>
						<div className="mw9 center ph3-ns">
  							<div className="cf ph2-ns">
								<ModifyPassword user={user}/>
								<DeleteUser userEmail={user.email}/>
							</div>
						</div>

						
					</div>
				</div>
			</div>
		</div>

		);
}

export default ModifyUser;
