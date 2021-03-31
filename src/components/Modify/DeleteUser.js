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

const DeleteUser = ({userEmail}) =>{
	const [modalDelete, setModalDelete] = useState(false)
	var subtitle;
	const openModalDelete = () =>{
		setModalDelete(true);
	}
	const afterOpenModal = () => {
	    // references are now sync'd and can be accessed.
	    subtitle.style.color = '#f00';
  	}
  	
  	const closeModalDelete = () =>{
  		setModalDelete(false);
  	}

	const onClickDeleteUser = () =>{
		fetch (`https://ancient-forest-08678.herokuapp.com/delete`, {//fetch will automatically use GET method, but we want PUT
				method : 'delete',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: userEmail
				})
			})
	        .then(response => response.json())
	        .then(modifiedElement=> {
	        	console.log(modifiedElement);
	        	localStorage.removeItem("userId");
	        	window.location.reload(true);
	        })
	        .catch(error =>console.log(error));
	}
	return (
		<div className="fl w-100 w-50-ns pa2">
			<button className= 'w-100 grow f4 link ph3 pv2 dib white bg-dark-red'
					onClick={openModalDelete}>
					Delete User
			</button>
			<Modal
											isOpen={modalDelete}
											onAfterOpen={afterOpenModal}			          
											onRequestClose={closeModalDelete}			          
											style={customStyles}		          
											contentLabel= 'Delete'>
											<h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
											<main className="pa4 black-80">
											  <form className="measure center">
											    <fieldset id="Delete" className="ba b--transparent ph0 mh0">
											      <p>
											      	{`Do you really want to delete this user? There's no going back!`}

											      </p>
											      <div className="">
												      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
												      type="button" 
												      value="Delete" 
												      onClick = {()=>onClickDeleteUser()}/>
												  </div>
											    </fieldset>
											    
											  </form>
											</main>
										 </Modal>

		</div>
		)

}

export default DeleteUser;