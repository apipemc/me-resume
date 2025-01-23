import React, { useEffect, useState } from "react";
import svgSound from "../../assets/icons/sound.svg";
import svgSoundOff from "../../assets/icons/sound-off.svg";

const Speak = ({ text }) => {
  const [speak, setSpeak] = useState("end");
  let utterance = null;

  useEffect(() => {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.addEventListener("start", () => {
      setSpeak("start");
    });

    return () => {
      utterance.removeEventListener("end", () => {
        setSpeak("end");
      });
    };
  }, [text, setSpeak]);

  const handleSpeak = async () => {
    if (speak !== "start") {
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <button
      type="button"
      className={`text-sm p-2.5 text-center`}
      onClick={handleSpeak}
    >
      {speak ? (
        <img src={svgSound.src} alt="Play" />
      ) : (
        <img src={svgSoundOff.src} alt="Cancel" />
      )}
    </button>
  );
};

export default Speak;
