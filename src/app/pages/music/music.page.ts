import { Component, OnInit } from '@angular/core';
import{Howl} from 'howler'
// import { Component, OnInit } from '../../../assets/mp3/';

export interface Track{
  name: string,
  path:string
}

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  player:Howl = null;
  constructor() {}

  ngOnInit() {}

  playlist: Track[] = [
    { name: 'a', path: '../../../assets/mp3/bensound-anewbeginning.mp3' },
    { name: 'b', path: '../../../assets/mp3/bensound-creativeminds.mp3' },
    { name: 'c', path: '../../../assets/mp3/bensound-ukulele.mp3' }
  ];

  activeTrack: Track= null;

  start(track:Track){
this.player = new Howl({
  src:[track.path]
})

this.player.play()
  }

  togglePlayer(pause){

  }
  
  next(){

  }

  prev(){

  }

  seek(){

  }

  updateProgress(){

  }

}
