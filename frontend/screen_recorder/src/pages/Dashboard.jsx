import { Button, Heading } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const Dashboard = () => {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
//   const [mediaRecorder, setMediaRecorder] = useState({});
  const [recordedChunks, setRecordedChunks] = useState([]);
  const startCapture = async () => {
    try {
        setIsRecording(true)
      let stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "window",
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          suppressLocalAudioPlayback: true,
        },
        surfaceSwitching: "include",
        selfBrowserSurface: "exclude",
        systemAudio: "exclude",
      });
      let video = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      videoRef.current.srcObject = video;
      const recorder = new MediaRecorder(stream);
    //   setMediaRecorder(recorder);
      recorder.start();
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
        }
      };
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  };

  const stopCapture = (evt) => {
    let tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;

    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    localStorage.setItem("recording", url);
    setIsRecording(false)
  };

  return (
    <div>
      <Heading mt={4}>Screen Recoder App</Heading>
      {!isRecording ? (
        <Button onClick={startCapture} mt={4}>Start Recording</Button>
      ) : (
        <Button onClick={stopCapture} mt={4}>Stop Recording</Button>
      )}
      <div
        style={{
          position: "fixed",
          top: 15,
          right: 0,
          width: "400px" /* adjust the width as needed */,
          height: "300px" /* or set a specific height */,
          zIndex: 2,
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          width={"200px"}
          height={"200px"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
