import react from 'react';
import './ImageLinkForm.css';

 const ImageLinkForm = ({onInputChange, onSubmit}) =>{//DESTRUCTURING
	return (
		 <div>
		 	<p className='f3'>
		 		{'This thing will detect faces in your pictures. Try it'}
		 	</p>
		 	<div className='form center pa4 br3 shadow-5'>{/*Created center css class, adding flex, justifying center*/}
		 		<div className='flex flex-column'>
		 			<div class="mw9  ">
					  <div class="cf ">
					    <div class="fl w-100 w-50-ns ">
					      <div>
					      	<input type='text' 
					 			   className='f4 pa2 w-100 center' 
					 			   onChange={onInputChange}
					 			   placeholder='Insert image link here...'
					 			   style={{ width: "400px" }}/>
					 		
					      </div>
					    </div>
					    <div class="fl w-100 w-50-ns ">
					      <div>
					      	<button className='w-100 grow f4 link ph3 pv2 dib white bg-dark-blue' 
					 		        onClick={onSubmit}
					 		        style={{ width: "150px" }}>Detect</button>
					      </div>
					    </div>
					  </div>
					</div>
					<div>
						<p className= 'tc white'>teeeeeesto</p>
					</div>
		 		</div>	
		 	</div>
		 </div>
	);
}

export default ImageLinkForm;