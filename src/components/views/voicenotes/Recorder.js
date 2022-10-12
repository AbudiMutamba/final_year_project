import RecordRTC from "recordrtc";
import { useEffect, useState, useRef } from "react";

const PER_MS = 10000;
export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const recorder = useRef();
  const [data, setData] = useState();
  // let size = bytesToSize(recorder.getBlob().size);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then((stream) => {
        recorder.current = RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/wav",
          bufferSize: 16384,
          sampleRate: 96000,
          recorderType: RecordRTC.StereoAudioRecorder,
          // checkForInactiveTracks: true,
          timeSlice: PER_MS,
          numberOfAudioChannels: 2,
          // previewStream: function(stream)
          ondataavailable: (blob) => {
            // event fired PER_MS interval
            console.log("wav blob", blob);

          }
        });
      });
  }, []);
      // console.log(recorder.current.getBlob())
      let size = bytesToSize(recorder.current.getBlob().size);
      console.log(size)
  return (
    <div className="App">
      <button
        onClick={() => {
          setRecording((prev) => {
            if (!prev) {
              recorder.current.startRecording();
              recorder.current.Recorderfunction()
            } else {
              recorder.current.stopRecording();
              recorder.current.save("task");
              
            }

            return !prev;
          });
        }}
      >
        {recording ? "stop" : "record"}
      </button>
    </div>
  );
}
