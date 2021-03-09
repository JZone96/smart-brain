import react from 'react';

 const Rank = ({userName, entries}) =>{
	return (
		 <div>
		 	<div className='white f3'>
		 		{userName  + ', Your current rank is... '}
		 	</div>
		 	<div className='white f1'>
		 		{'#1 '+ entries}
		 	</div>
		 </div>
	);
}

export default Rank;