import RecordRTC from "recordrtc";
import { useEffect, useState, useRef } from "react";

const PER_MS = 10000;
export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const recorder = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then((stream) => {
        recorder.current = RecordRTC(stream, {
          type: "audio",
          // recorderType: RecordRTC.StereoAudioRecorder,
          // checkForInactiveTracks: true,
          // timeSlice: PER_MS,
          // numberOfAudioChannels: 2,
          // previewStream: function(stream)
          ondataavailable: (blob) => {
            // event fired PER_MS interval
            console.log("wav blob", blob);

          }
        });
        // let blob = recorder.current.getBlob();
        // invokeSaveAsDialog(blob);
      });
  }, []);
      // console.log(recorder.current.blob)
  return (
    <div className="App">
      <button
        onClick={() => {
          setRecording((prev) => {
            if (!prev) {
              recorder.current.startRecording();
  
            } else {
              recorder.current.stopRecording();
            //   recorder.current.save(function(task) {
            //     let blob = recorder.getBlob();
            //     invokeSaveAsDialog(blob);
            // })
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
