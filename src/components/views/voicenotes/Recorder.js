import React, { useRef,useEffect, useState } from "react";
// import "./styles.css";
import RecordRTC from "recordrtc";
import { Formik, Form, Field } from "formik";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from "../../helpers/supabase";
import { useOutletContext } from 'react-router-dom'
import DatePicker from 'react-datepicker';

export default function Recorder() {
  const [ profile] = useOutletContext();
  const [ names, setNames] = useState([])
  const video = useRef(null);
  let recorder;

  useEffect( () => {
    let getUser = async () => {
        let { data, error } = await supabase.from('profiles').select('username, id').eq('roles', 'member')
        // console.log("data is", data)
         if(error) throw error
         setNames(data)
    }
    getUser()
  }, []);

  const handleSubmit = async (values, { resetForm }) => {

    const {data, error} = await supabase
      .from('tasks')
      .insert ({
            voice_note: audioResult,
            assigned_person: values.workwith,
            title: values.workon,
            deadline: values.date,
            status: "pending"
      })
      if (error){
        toast.error(error.message, {
        position: "top-center"
      });
      }else {
        toast.success("Assigned", {
        position: "top-center"
      });
       resetForm();
       setActivities([...activities, values]);
    };
  }


  const startRecord = () => {
    captureCamera(function (camera) {
      video.current.muted = true;
      video.current.volume = 0;
      video.current.srcObject = camera;

      recorder = RecordRTC(camera, {
        type: "video",
        mimeType: "video/webm;codecs=h264"
      });

      recorder.startRecording();

      // release camera on stopRecording
      recorder.camera = camera;
      console.log(video.current);
      console.log(window.MediaRecorder.stream);
    });
  };

  const stopRecord = () => {
    recorder?.stopRecording?.(stopRecordingCallback);
  };

  const stopRecordingCallback = () => {
    var blob = recorder.getBlob();
    var fileName = "video.mp4";
    var file = new File([blob], fileName, {
      type: "video/mp4"
    });
    RecordRTC.invokeSaveAsDialog(file); // or  invokeSaveAsDialog(file, fileName); or  invokeSaveAsDialog(blob, fileName);
    video.current.src = video.srcObject = null;
    video.current.muted = false;
    video.current.volume = 1;
    video.current.srcObject = null;
    video.current.src = URL.createObjectURL(recorder.getBlob());

    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
  };

  const captureCamera = (callback) => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(function (camera) {
        callback(camera);
      })
      .catch(function (error) {
        console.log(
          "Unable to capture your camera. Please check console logs."
        );
        console.error(error);
      });
  };

  return (
    <div className='px-10'>
      <ToastContainer />
      <h1 className='font-bold p-5'>VoiceNote</h1>
      <div className='p-8 rounded-xl bg-zinc-100 border'>
        <video ref={video} controls autoPlay={true} playsInline={true}></video>
        <div>
            <button onClick={startRecord} className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300"> Start </button>
            <button  onClick={stopRecord} className="danger py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300" >
              Stop
            </button>
        </div>
        <div className='py-8'>
              <Formik
                initialValues={{
                    workwith: "",
                    workon: "",
                    deadline: "",
                }}
                onSubmit={ handleSubmit}
              >
                {({ isSubmitting, isValid, values, setFieldValue}) => (
                  <Form >
                    <div className="py-2">
                        <label>Title of Task</label>
                        <Field
                            placeholder="title"
                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline "
                            type="text"
                            name="workon"
                        />
                    </div>
                  <div className="py-2">
                        <label>Who will do the task?</label>
                        <Field
                            as="select"
                            name="workwith"
                            className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline ">
                            <option>- Select -</option>
                            {names && names.map((name, index) => 
                                <option value={name.id}>{name.username}</option>
                            )}
                        </Field>
                  </div>
                  <div className="py-2">
                      <label>Deadline</label>
                      <DatePicker placeholderText="Select Date" name="date" selected={values.date } onChange={(date) => setFieldValue("date",date)}  className="p-2 appearance-none leading-tight outline-0 bg-gray-300 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline"/>
                  </div>
                  <button type="submit" className="py-2 px-5 transition hover:-translate-y-1 hover:bg-orange-600 duration-300 mx-auto max-w-md rounded-full border bg-emerald-300">
                     Assign
                  </button>
                  </Form>
                )}
              </Formik>
        </div>
      </div>
    </div>
  );
}
