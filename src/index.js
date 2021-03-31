import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';

ReactDOM.render(
  <React.StrictMode>

    <div className="flex flex-column">
    	<div className="w-100">
    		<App />
    	</div>
    	<div className="w-100 tc pv7 relative">
	    	<footer>
		            <div>
		              {"2021 - Made by Jason Liberti"}

		            </div>

		    </footer>
    	</div>
	    

    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
