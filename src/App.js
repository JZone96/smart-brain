import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

/*
  Particles API used for the background
*/
const particlesOptions = {
particles: {                 
  number: {
    value: 30,
    density:{
      enable:true,
      value_area:185,
      }
    }
  }
}               

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState([{}]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
                                    id: '',
                                    name: '',
                                    email: '',
                                    password: '',
                                    entries: '',
                                    joined: '',
                                  });

window.onload = () =>{
      if (localStorage.userId){
        fetch (`https://ancient-forest-08678.herokuapp.com/profile/${localStorage.userId}`)
        .then(response => response.json())
        .then(user=> {
          setUser({
            ...user, 
            email: user.email,
            entries: user.entries,
            id: user.id,
            joined: user.joined,
            name: user.name
          })
        }).catch(err => console.log('Broken Server :('))
        setIsSignedIn(true);
        setRoute('Home');
        setInput('');
        setImageUrl('');
      }
}

  const setInitialState = () =>{
  setInput('');
  setImageUrl('');
  setBox([{}]);
  setRoute('signin');
  setIsSignedIn(false);
  setUser({
            id: '',
            name: '',
            email: '',
            password: '',
            entries: '',
            joined: '',
          });
}
/*
  Function that calculates face location based on coordinates given by CLARIFAI API
  Returns an array with all the coordinates
*/
  const calculateFaceLocation = (data) =>{
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceCoordinates = data.outputs[0].data.regions;
    let facesDetected = [];

    faceCoordinates.forEach(face=>{
      const clarifaiFace = face.region_info.bounding_box
      const coordinates = {
        leftCol: (clarifaiFace.left_col) * width,
        topRow: (clarifaiFace.top_row) * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
      facesDetected.push(coordinates);
    })

    return facesDetected;
  }

  /*
    when the user submits the image link, this function send a request to the server.
    the server handles the CLARIFAI API call, to detect all the faces.
    The server send a response with all the detected faces, and calculateFaceLocation does the rest.
    this response brings us in another fetch to the backend, to update the entries
  */
  const onSubmit = () =>{
    if (input.target === undefined){
      
    }
    setImageUrl(input.target.value);
    fetch ("https://ancient-forest-08678.herokuapp.com/imageurl", {
          method : 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: input.target.value
            })
          })
    .then (response => response.json())
    .then(response=>{
        if (response){
          fetch ("https://ancient-forest-08678.herokuapp.com/image", {
          method : 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id//send the id to the server. it will update that user's count
            })
          })
          .then(response => response.json())
          .then(count =>{
              setUser({...user, entries: count});
          }).catch(console.log);

          setBox(calculateFaceLocation(response));
        }
      }).catch(e=>console.log('error',e))
  }

    let section;

    if (route === 'signin'){
          section = (<Signin loadUser={(user)=> setUser(user)} onRouteChange={(route) => setRoute(route)} isSignedIn = {(value)=> setIsSignedIn(value)}/>);
      }else if(route === 'register'){
          section = (<Register loadUser = {(user)=> setUser(user)} onRouteChange = {(route) => setRoute(route)} isSignedIn = {(value)=> setIsSignedIn(value)}/>);
      }else{
          section = (
          <div>     
            <Logo /> 
            <Rank userName = {user.name} entries = {user.entries}/>
            <ImageLinkForm onInputChange={(link) => setInput(link)} onSubmit={()=>onSubmit()}/>
            <FaceRecognition boxes = {box} imageUrl={imageUrl}/>
          </div>
        )
      }

    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange = {(route) => setRoute(route)} setInitialState = {()=>setInitialState()}/>
        <Particles params={particlesOptions} className='particles'/>
        {section}
      </div>
    );
    
}

export default App;
