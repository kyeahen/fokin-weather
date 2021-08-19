import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Alert} from 'react-native';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "api-key";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async(latitude, longitude) => {
    const { 
      data: {
        main: { temp },
        weather
      } 
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    this.setState({isLoading: false, temp, condition: weather[0].main,});
    console.log(weather[0].main);
  }

  getLocation = async() => {
    try {
      await Location.requestBackgroundPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      
      const { 
        coords: {latitude, longitude} 
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);

      this.getWeather(latitude, longitude);
      this.setState({ isLoading: false });

    } catch (error) {
      Alert.alert("위치를 찾을 수 없습니다.");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? (
      <Loading /> 
    ) : ( 
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, //1 = 모든 공간 사용 가능하다는 것을 의미
//     flexDirection: 'column',  //모든 flex box의 디폴트는 flex direction이 컬럼이다.
//   },
//   text: {
//     color: 'white'
//   },
//   yellowView: { 
//     /* 컨테이너 하위 뷰들의 flex 값이 모두 1일 경우는 두 뷰 모두 모든 공간을 갖기를 원한다. 
//     그래서 두 뷰가 가질 수 있는 만큼 가지게 됨 = 1:1 */
//     flex: 1,
//     backgroundColor: "yellow",
//   },
//   blueView: {
//     flex: 3,
//     backgroundColor: "blue",
//   }
  
// });
