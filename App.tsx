// In a React Native application
// import Parse from 'parse/react-native.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductCreation } from './components/ProductCreation';

// //Initializing the SDK
// Parse.setAsyncStorage(AsyncStorage);
// //Paste below the Back4App Application ID AND the JavaScript KEY
// Parse.initialize('i77Wb8Q3wNaHn6FXWG7phrBHMI0FKDI2zAGdnO8E', 'Khh3vehvys98XRfwPoMsxIIHoYtVaCsJSohG1XOA');
// //Point to Back4App Parse API address
// Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {
  return (
    <ProductCreation></ProductCreation>
  )
}

export default App;
