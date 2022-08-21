import { useRef, useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsMusicNoteList } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
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
  const [view, setView] = useState(true);
  const [cTime, setCTime] = useState(0);
  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      setCTime(audioElem.current.currentTime);
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
    if (currentSong.title === "PART_1" && audioElem.current.currentTime === 0) {
    } else {
      setisplaying(true);
    }
    changeIsSetToPlay(true);
  }, [currentSong]);

  const setToLoad = () => {
    changeIsSetToPlay(false);
    setisplaying(false);
  };

  const changeSong = (title) => {
    updateSearch("");
    setSearchData(songsdata);
    console.log(title);
    let song = songsdata.filter((song) => song.title === title);
    console.log(song);
    changeIsSetToPlay(false);
    checkPlayPause();
    setView(true);
    setCurrentSong(song[0]);
  };

  useEffect(() => {
    //console.log(search);
    const searchData = songsdata.filter((song) => song.title.includes(search));
    //console.log(searchData);
    setSearchData(searchData);
  }, [search]);

  const handleError = () => {
    fetch(currentSong.url, { mode: "no-cors" }).then(async (response) => {
      // check for error response
      if (response.ok) {
        audioElem.current.pause();
        console.log("error handled");
        console.log(cTime);

        //audioElem.current.pause();

        const index = songsdata.findIndex((x) => x.title === currentSong.title);
        console.log(index);

        audioElem.current.src = songsdata[index].url;
        // setTimeout(() => {
        //   audioElem.current.src = songsdata[index - 1].url;
        // }, 3000);
        //const song = songsdata[index];
        // setCurrentSong({
        //   song,
        //   progress: (cTime / duration) * 100,
        //   length: duration,
        // });

        // audioElem.current.url = currentSong.url;
        //audioElem.current.play();
        // setTimeout(() => {
        //   setisplaying(!isplaying);
        // }, 3000);
        audioElem.current.play();
        audioElem.current.currentTime = cTime;
      }
    });
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
  const changeView = () => {
    setView(!view);
  };

  return (
    <div className="d-flex flex-column">
      <audio
        src={currentSong.url}
        ref={audioElem}
        onTimeUpdate={onPlaying}
        onCanPlay={setToPlay}
        onLoadedMetadata={setToPlay}
        onWaiting={setToLoad}
        onError={handleError}
        autoPlay
      >
        {/* <source src={currentSong.url}></source> */}
      </audio>
      {view ? (
        ""
      ) : (
        <div className="mt-1 mb-3">
          <BiArrowBack onClick={changeView}></BiArrowBack>
        </div>
      )}

      {view ? (
        <div className="align-self-stretch">
          <div className="App">
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
      ) : (
        <div>
          <div className="mx-auto my-4 ">
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
                <Part
                  key={part.title}
                  title={part.title}
                  changeSong={changeSong}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {view ? (
        <div className=" mx-auto mb-3">
          <BsMusicNoteList onClick={changeView}></BsMusicNoteList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
