import './App.css';
import react, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';

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

const initialState = {
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',//where we are aon the page
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        password: '',
        entries: '',
        joined: '',
      }
    }
class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

/*
  componentDidMount(){
    fetch ('http://localhost:3000/')
    .then(response=> response.json())
    .then(data => console.log(data));
  }

  //google secures access from other computers, by using Access-Control-Allow-Origin. this is first set to no cors
  //to enable access from other computers, we have to use npm cors
*/

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: (clarifaiFace.left_col) * width,//197
      topRow: (clarifaiFace.top_row) * height,//59
      rightCol: width - (clarifaiFace.right_col * width),//195.7
      bottomRow: height - (clarifaiFace.bottom_row * height),//274
    }
  }
  displayFaceBox = (box) =>{
    this.setState ({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onSubmit = () =>{
    this.setState ({imageUrl : this.state.input})
    fetch ("https://git.heroku.com/ancient-forest-08678.git/imageurl", {
          method : 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input//send the id to the server. it will update that user's count
            })
          })
          .then (response => response.json())
    .then(response=>{
        if (response){
          fetch ("https://git.heroku.com/ancient-forest-08678.git/image", {
          method : 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id//send the id to the server. it will update that user's count
            })
          })
          .then(response => response.json())
          .then(count =>{
              this.setState(Object.assign(this.state.user, {entries: count}));//use object assign (the object to update, {the element to add})
          }).catch(console.log);
          this.displayFaceBox(this.calculateFaceLocation(response));
        }
      })
    .catch(e=>console.log('error',e))
  }

  onRouteChange = (route) =>{
    if (route === 'signin'){
      this.setState(initialState);
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  loadUser = (user) =>{
    this.setState({user:{
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined,
    }})
  }
  render(){
    let section;

    if (this.state.route === 'signin'){
          section = (<Signin loadUser={this.loadUser}onRouteChange={this.onRouteChange}/>);
      }else if(this.state.route === 'register'){
          section = (<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>);
      }else{
          section = (
          <div>     
            <Logo /> 
            <Rank userName = {this.state.user.name} entries = {this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box = {this.state.box} imageUrl={this.state.imageUrl}/>
          </div>
        )
      }

    return (
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange = {this.onRouteChange} />
        <Particles params={particlesOptions} className='particles'/>
        {section}
      </div>
    );
  }  
}

export default App;
