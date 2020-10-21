/*Example of React Native Video*/
import React, { Component } from 'react';
//Import React
import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
 import Playicon from '../assets/images/playicon.png'
class Demo extends Component {
  videoPlayer;
 
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 5,
      isFullScreen: false,
      isLoading: false,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
    };
  }
 
  // renderPoster(){

  //   if (this.state.paused && this.elapsedTime === 0) {
  //     return (
  //       <Image
  //         style={styles.container}
  //         source={Playicon}
  //         resizeMode="contain"
  //       />
  //     );
  //   } else {
  //     return (null);
  //   }
  // }


  


  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };
 
  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => this.setState({ duration: data.duration, isLoading: false });
  
  onLoadStart = data => this.setState({ isLoading: true });
  
  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'content' });
  };
  renderToolbar = () => (
    <View style={{backgroundColor:'red',marginTop:wp('10%')}} >
      <Text> MEDIA </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({ currentTime });
 
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity  style={styles.container} onPress={() => this.setState({
      paused: !this.state.paused})}>
        <Video
        posterResizeMode="center"

          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart} 
          onProgress={this.onProgress}
          // paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode="contain"
          onFullScreen={this.state.isFullScreen}
          source={ require('../assets/video/video04b43877-a326-4d05-be99-c893889f6a21video.mp4') }
          style={styles.mediaPlayer}
          // volume={15}
          ignoreSilentSwitch={'obey'}
          
        />
</TouchableOpacity>
{/* { this.renderPoster() } */}
        <View  style={{backgroundColor:'green',marginTop:wp('10%')}}>
        {/* <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          //mainColor="green"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        /> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  mediastyle:{
      // backgroundColor:"",
    marginTop:wp('100%')

  },
  toolbar: {
    // marginTop: 30,
    // backgroundColor: 'white',
    // padding: 10,
    // borderRadius: 5,
  },
  mediaPlayer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'white',
    alignSelf: "center",
     marginVertical: wp('-5%'),
    // position: "absolute",
    width: wp('90%'),
    height: hp('30%'),
  },
});
export default Demo;