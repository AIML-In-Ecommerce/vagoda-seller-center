import React, { useEffect, useRef, useState } from "react";
import { Button, Drawer, Flex, Radio, Space } from "antd";
import "../../../custom_css/VoiceAnimation.css";
type InputType = "VOICE" | "KEYBOARD";

interface VocieChatProps {
  setInputType(type: InputType): void;
  setUserInput(transcript: string): void;
  handleSendButtonOnClick(): void;
  setUserInputRef(transcript: string): void;
}

const VoiceChat: React.FC<VocieChatProps> = (props) => {
  const [open, setOpen] = useState<boolean>(true);
  //   const [input, setInput] = useState<string>("");
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState("Bắt đầu ghi");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    props.setInputType("KEYBOARD");
  };

  useEffect(() => {
    let finalTranscript = "";
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "vi-VN"; // Đặt ngôn ngữ là tiếng Việt
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      //   recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      //     let interimTranscript = "";
      //     for (let i = event.resultIndex; i < event.results.length; i++) {
      //       const transcript = event.results[i][0].transcript;
      //       if (event.results[i].isFinal) {
      //         setTranscript((prev) => prev + transcript);
      //       } else {
      //         interimTranscript += transcript;
      //       }
      //     }
      //     setTranscript((prev) => prev + interimTranscript);
      //   };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        setTranscript("");
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }

        if (finalTranscript) {
          console.log("Final Transcript: ", finalTranscript);
          setTranscript(finalTranscript);
        }
      };
      recognitionRef.current.start();
    }
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      props.setUserInput(transcript);
      props.setUserInputRef(transcript);
      setTimeout(() => {
        props.setInputType("KEYBOARD");
        props.handleSendButtonOnClick();
        onClose();
        setTranscript("");
      }, 1000);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        closable={false}
        onClose={onClose}
        open={open}
        key="drawer"
        height="100px"
        className="bg-black"
      >
        <div className="w-full h-full flex flex-row justify-between items-center ">
          <div className="w-full flex flex-row justify-start items-center ">
            <div className="w-[10%] h-full flex justify-center items-center">
              <span className={isListening ? "voice" : "start"}></span>
            </div>
            <div className="text-white font-medium text-2xl">{transcript}</div>
          </div>
          {isListening && (
            <button
              onClick={handleListening}
              className="text-white text-xl px-3 py-1 rounded-lg bg-white bg-opacity-20"
            >
              Stop
            </button>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default VoiceChat;
