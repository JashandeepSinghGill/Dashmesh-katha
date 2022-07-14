import "./App.css";
import Player from "./Player";
import { songsdata } from "./audios";
import { useRef, useState, useEffect } from "react";
const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);
  const [isSetToPlay, changeIsSetToPlay] = useState(false);
  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);

  // useEffect(() => {
  //   console.log(canPlay);
  //   audioElem.current.play();
  // }, [canPlay]);

  const setToPlay = () => {
    if (currentSong.title !== "Part_1") {
      setisplaying(true);
    }
    changeIsSetToPlay(true);
  };

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <div className="App">
      <audio
        src={currentSong.url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onCanPlayThrough={setToPlay}
      />
      <Player
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isSetToPlay={isSetToPlay}
        changeIsSetToPlay={changeIsSetToPlay}
      />
    </div>
  );
};

export default App;
