import react from 'react';
import './ImageLinkForm.css';

 const ImageLinkForm = ({onInputChange, onSubmit}) =>{//DESTRUCTURING
	return (
		 <div>
		 	<p className='f3'>
		 		{'This thing will detect faces in your pictures. Try it'}
		 	</p>
		 	<div className='form center pa4 br3 shadow-5'>{/*Created center css class, adding flex, justifying center*/}
		 		<input type='text' 
		 			   className='f4 pa2 w-70 center' 
		 			   onChange={onInputChange}
		 			   placeholder='Insert image link here...'/>
		 		<button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue' 
		 		        onClick={onSubmit}>Detect</button>
		 	</div>
		 </div>
	);
}

export default ImageLinkForm;