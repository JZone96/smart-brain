import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ModifyUser from './components/Modify/Modify';
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
/* Declaring all the states, and setInitialState function*/
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState([{}]);
  const [route, setRoute] = useState('loading');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
                                    id: '',
                                    name: '',
                                    email: '',
                                    password: '',
                                    entries: '',
                                    joined: '',
                                  });
  const [text, setText] = useState("");
  let numberOfFaces;

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
/*localStorage variable to store users id*/
window.onload = () =>{
      if (localStorage.userId && !isLoaded){
        setRoute('loading');
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
          });
          setIsLoaded(true);
          setIsSignedIn(true);
          setRoute('home');
        }).catch(err => console.log('Broken Server :(')) 
      }else{
          setRoute('signin')
      }
}


/*
  Function that calculates face location based on coordinates given by CLARIFAI API
  If there are faces in the image, returns an array with all the coordinates otherwise return false
*/
  const calculateFaceLocation = (data) =>{
    if (data.outputs[0].data.regions){
      numberOfFaces = data.outputs[0].data.regions.length;
      if (numberOfFaces===1){
          setText(`I've detected ${numberOfFaces} face`);
      }else{
          setText(`I've detected ${numberOfFaces} faces`);
      }

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
    }else{
      setText(`No faces detected :(`)
      return false;
    }
  }

  /*
    when the user submits the image link, this function send a request to the server.
    the server handles the CLARIFAI API call, to detect all the faces.
    The server send a response with all the detected faces, and calculateFaceLocation does the rest.
    this response brings us in another fetch to the backend, to update the entries
  */
  const onSubmit = () =>{

    if (!input){
      setText("No Link provided")
      
    }else{
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
            if (response === 'unable to call API'){
                setText("Image Not Found :(")
            }else{
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
    
  }
/*
  JSX SECTION
  render is based on the route state
*/
    let section;

    if (route === 'signin' ){
          section = (<Signin loadUser={(user)=> setUser(user)} onRouteChange={(route) => setRoute(route)} isSignedIn = {(value)=> setIsSignedIn(value)}/>);

      }else if(route === 'register' ){
          section = (<Register loadUser = {(user)=> setUser(user)} onRouteChange = {(route) => setRoute(route)} isSignedIn = {(value)=> setIsSignedIn(value)}/>);
      }else if (route === 'modify'){
          section = (
            <div className = 'tc'>
              <Logo/>
              <ModifyUser user = {user}/>
            </div> 
            )
      }else if (route === 'loading' ){
        
        return(
            <Particles params={particlesOptions} className='particles'/>
          );
      }else{
        section = (
          <div className='tc'>     
            <Logo/> 
            <Rank userName = {user.name} entries = {user.entries}/>
            <ImageLinkForm onInputChange={(link) => setInput(link)} onSubmit={()=>onSubmit()} text = {text}/>
            <FaceRecognition boxes = {box} imageUrl={imageUrl}/>
          </div>
        )
      }

    return (
      <div className="App flex flex-column">
        <div className="w-100">
          <Navigation isSignedIn={isSignedIn} 
                    onRouteChange = {(route) => setRoute(route)} 
                    setInitialState = {()=>setInitialState()}
                    route = {route}/>
          <Particles params={particlesOptions} className='particles'/>
        </div>
          {section}
          <div className="w-100 tc pv7 relative">
          <footer>
                  <div>
                    {"2021 - Made by Jason Liberti"}

                  </div>

          </footer>
        </div>
      </div>
    );
    
}

export default App;