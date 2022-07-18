import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Player from "./Player";
import { songsdata } from "./audios";
import Part from "./Part";
const App = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[1]);
  const [isSetToPlay, changeIsSetToPlay] = useState(false);
  const [search, updateSearch] = useState("");
  const [searchData, setSearchData] = useState(songsdata);
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

  const checkPlayPause = () => {
    if (isplaying) {
      setisplaying(!isplaying);
    }
  };

  const setToPlay = useCallback(() => {
    if (currentSong.title !== "PART_1") {
      setisplaying(true);
    }
    changeIsSetToPlay(true);
  }, [currentSong]);

  const setToLoad = () => {
    changeIsSetToPlay(false);
    setisplaying(false);
  };

  const changeSong = (title) => {
    console.log(title);
    let song = songsdata.filter((song) => song.title === title);
    console.log(song);
    changeIsSetToPlay(false);
    checkPlayPause();
    setCurrentSong(song[0]);
  };

  useEffect(() => {
    //console.log(search);
    const searchData = songsdata.filter((song) => song.title.includes(search));
    //console.log(searchData);
    setSearchData(searchData);
  }, [search]);

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
    <div className="d-flex flex-column">
      <div className="h-75 d-inline-block">
        <div className="App">
          <audio
            src={currentSong.url}
            ref={audioElem}
            onTimeUpdate={onPlaying}
            onCanPlay={setToPlay}
            onWaiting={setToLoad}
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
      </div>
      <div className="mx-auto">
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(evt) => updateSearch(evt.target.value)}
        ></input>
      </div>
      <div className="p-2">
        <div className="d-grid">
          {searchData.map((part) => (
            <Part key={part.title} title={part.title} changeSong={changeSong} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
