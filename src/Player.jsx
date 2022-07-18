import React, { useRef, useState } from "react";
import "./player.scss";
import pic1 from "./data/wp2936837.jpeg";
import pic2 from "./data/wp2936838.jpeg";
import pic3 from "./data/p3.jpeg";
import pic4 from "./data/p4.jpeg";
import pic5 from "./data/p5.jpeg";
import pic6 from "./data/p6.jpeg";
import pic7 from "./data/p7.jpeg";
import pic8 from "./data/p8.jpeg";
import pic9 from "./data/p9.jpeg";
//import pic10 from "./data/p10.jpeg";
import pic11 from "./data/p11.jpeg";
import loading from "./data/loading.gif";

import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";

let pics = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic11];
let i = Math.floor(Math.random() * pics.length - 1 + 1);

const Player = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
  isSetToPlay,
  changeIsSetToPlay,
}) => {
  const [pic, setPic] = useState(pics[i]);

  const clickRef = useRef();

  const PlayPause = () => {
    setisplaying(!isplaying);
  };
  const checkPlayPause = () => {
    if (isplaying) {
      setisplaying(!isplaying);
    }
  };

  const convertTimeInMins = (time) => {
    if (audioElem.current) {
      let mins = Math.floor(time / 60);
      let secs = Math.floor(time % 60);
      if (secs < 10) {
        secs = "0" + secs;
      }

      return mins + ":" + secs;
    }
  };

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = (offset / width) * 100;
    if (audioElem.current.currentTime) {
      audioElem.current.currentTime = (divprogress / 100) * currentSong.length;
    } else {
      audioElem.current.currentTime = 0;
    }
  };

  const skipBack = (e) => {
    changeIsSetToPlay(false);
    setPic(pics[--i >= 0 ? i : (i = pics.length - 1)]);
    checkPlayPause();
    const index = songs.findIndex((x) => x.title === currentSong.title);
    if (index === 0) {
      setCurrentSong(songs[songs.length - 1]);
    } else {
      setCurrentSong(songs[index - 1]);
    }
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = (e) => {
    changeIsSetToPlay(false);
    setPic(pics[++i === pics.length ? (i = 0) : i]);
    checkPlayPause();
    const index = songs.findIndex((x) => x.title === currentSong.title);

    if (index === songs.length - 1) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[index + 1]);
    }
    audioElem.current.currentTime = 0;
  };

  return (
    <div className="player_container">
      <div className="title">
        <p>{currentSong.title}</p>
      </div>
      <div className="coverPic">
        <img
          src={isSetToPlay ? pic : loading}
          alt="Guru Gobind Singh Ji"
          className="pic"
        ></img>
      </div>
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          {/* <input
            type="range"
            min="0"
            max="100"
            value={currentSong.progress}
            onClick={checkWidth}
            ref={clickRef}
          ></input> */}
          <div
            className="seek_bar"
            style={{ width: `${currentSong.progress + "%"}` }}
          ></div>
          <div className="current_time">
            {audioElem.current
              ? convertTimeInMins(audioElem.current.currentTime)
              : ""}
          </div>
          <div className="total_time">
            {audioElem.current
              ? isSetToPlay
                ? convertTimeInMins(audioElem.current.duration)
                : "00:00"
              : "00:00"}
          </div>
        </div>
      </div>
      <div className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isplaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill className="btn_action" onClick={skiptoNext} />
      </div>
    </div>
  );
};

export default Player;
