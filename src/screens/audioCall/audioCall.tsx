import React, {useRef, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {JoinCallView} from '../../components/JoinCallView';
import {IncomingCallView} from '../../components/IncomingCallView';
import {CallSessionView} from '../../components/CallSessionView';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngine,
  RtcConnection,
  IRtcEngineEventHandler,
} from 'react-native-agora';

// 🔑 Replace with your real credentials
const appId = 'b7cfccb0e80642c689c945a667f7ba29';
const token =
  '007eJxTYJDh/fQ5ca+xifaypXy3fWv9bxz5x9gSK1ifWtuSsvMEp5ECQ5J5clpycpJBqoWBmYlRspmFZbKliWmimZl5mnlSopHlY/6JGQ2BjAyc63xZGRkgEMQXYEjOSMzLS83RTc5ITc7OzEtnYAAAlJsizQ==';
const channelName = 'channel-checking';
const localUid = 0;

const AudioCall = () => {
  const agoraEngineRef = useRef<IRtcEngine>();
  const [isJoined, setIsJoined] = useState(false);
  const [remoteUid, setRemoteUid] = useState(0);
  const [message, setMessage] = useState('');
  const [isSpeakerphoneEnabled, setIsSpeakerphoneEnabled] = useState(true);
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentView, setCurrentView] = useState<
    'joinScreen' | 'incomingCall' | 'onCall'
  >('joinScreen');
  const [isTimeLimitModalVisible, setIsTimeLimitModalVisible] = useState(false);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
    }
  };

  const setupAgora = async () => {
    if (Platform.OS === 'android') await getPermission();
    agoraEngineRef.current = createAgoraRtcEngine();
    await agoraEngineRef.current?.initialize({appId});
    setupListeners();
  };

  const eventHandler: IRtcEngineEventHandler = {
    onJoinChannelSuccess: () => {
      setMessage(`✅ Joined channel: ${channelName}`);
      setIsJoined(true);
    },
    onUserJoined: (_conn: RtcConnection, uid: number) => {
      setMessage(`👤 Remote user joined: ${uid}`);
      setRemoteUid(uid);
    },
    onUserOffline: (_conn: RtcConnection, uid: number) => {
      setMessage(`❌ Remote user left: ${uid}`);
      setRemoteUid(0);
    },
  };

  const setupListeners = () => {
    agoraEngineRef.current?.registerEventHandler(eventHandler);
  };

  const showIncomingCall = () => {
    setCurrentView('incomingCall');
  };

  const acceptCall = async () => {
    setCurrentView('onCall');
    join();
  };

  const rejectCall = () => {
    setCurrentView('joinScreen');
  };

  const join = async () => {
    agoraEngineRef.current?.joinChannel(token, channelName, localUid, {
      channelProfile: ChannelProfileType.ChannelProfileCommunication,
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      publishMicrophoneTrack: true,
      autoSubscribeAudio: true,
    });
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      setMessage('You left the channel');
      setCurrentView('joinScreen'); // Return to join screen after leaving call
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSpeakerphone = () => {
    const newSpeakerphoneState = !isSpeakerphoneEnabled;
    agoraEngineRef.current?.setEnableSpeakerphone(newSpeakerphoneState);
    setIsSpeakerphoneEnabled(newSpeakerphoneState);
    setMessage(
      `🎤 Audio output switched to ${newSpeakerphoneState ? 'Speaker' : 'Earpiece'}`,
    );
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    agoraEngineRef.current?.muteLocalAudioStream(newMuteState);
    setIsMuted(newMuteState);
    setMessage(newMuteState ? '🎤 Muted' : '🎤 Unmuted');
  };

  React.useEffect(() => {
    setupAgora();
    return () => {
      agoraEngineRef.current?.unregisterEventHandler(eventHandler);
      agoraEngineRef.current?.release();
    };
  }, []);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isJoined) {
      timer = setInterval(() => {
        setCallTime(prevTime => {
          const newTime = prevTime + 1;
          if (newTime === 10) {
            setIsTimeLimitModalVisible(true);
          }
          return newTime;
        });
      }, 1000);
    } else {
      setCallTime(0);
      setIsTimeLimitModalVisible(false);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isJoined]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (currentView === 'joinScreen') {
    return (
      <JoinCallView
        onSimulateIncomingCall={showIncomingCall}
        message={message}
      />
    );
  }

  if (currentView === 'incomingCall') {
    return (
      <IncomingCallView
        onAccept={acceptCall}
        onDecline={rejectCall}
        name="Iris James"
        avatar="https://randomuser.me/api/portraits/women/43.jpg"
      />
    );
  }

  if (currentView === 'onCall') {
    return (
      <CallSessionView
        name="Jessica Smith"
        avatar="https://randomuser.me/api/portraits/women/43.jpg"
        timer={formatTime(callTime)}
        isMuted={isMuted}
        isSpeakerphoneEnabled={isSpeakerphoneEnabled}
        onToggleMute={toggleMute}
        onToggleSpeakerphone={toggleSpeakerphone}
        onEndCall={leave}
        isTimeLimitModalVisible={isTimeLimitModalVisible}
        onCloseTimeLimitModal={() => setIsTimeLimitModalVisible(false)}
      />
    );
  }

  return null;
};

export default AudioCall;
