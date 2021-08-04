import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';
// import { Component, OnInit } from '../../../assets/mp3/';

export interface Track {
  name: string;
  path: string;
}

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {
  player: Howl = null;
  isplaying = false;
  progress = 0;
  runningTimeMinute = 0
  runningTimeSecond = 0
  totalDurationMinute = 0
  totalDurationSecond = 0
  @ViewChild('range', { static: false }) range: IonRange;
  constructor(private router: Router) {}

  ngOnInit() {}

  home(){
    this.router.navigateByUrl('/');
  }

  playlist: Track[] = [
    { name: 'a', path: '../../../assets/mp3/bensound-anewbeginning.mp3' },
    { name: 'b', path: '../../../assets/mp3/bensound-creativeminds.mp3' },
    { name: 'c', path: '../../../assets/mp3/bensound-ukulele.mp3' },
  ];

  activeTrack: Track = null;

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.path],
      onplay: () => {
        console.log('onplay');

        this.isplaying = true;
        this.activeTrack = track;
        this.updateProgress()
      },

      onend: () => {
        console.log('onend ');
      },
    });

    this.player.play();
  }

  togglePlayer(pause) {
    this.isplaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    let newValue:any = this.range.value;
    let duration = this.player.duration();
  
    // console.log(Math.floor(duration % 3600 / 60));
    // console.log();
    
    // console.log(Math.floor(duration/60));
    // console.log(Math.floor(duration%60));
    console.log(Math.floor(duration/60),":",Math.floor(duration%60));


    
    // let d:number = duration(newValue*100)
    this.player.seek(duration*(newValue/100));
  }

  updateProgress() {
    let seek = this.player.seek()
    this.progress = (seek / this.player.duration())*100 || 0;
    this.runningTimeMinute = Math.floor(this.progress/60)
    this.runningTimeSecond = Math.floor(this.progress%60)
    this.totalDurationMinute = Math.floor(this.player.duration()/60)
    this.totalDurationSecond = Math.floor(this.player.duration()%60)
    // console.log(Math.floor(this.progress/60),":",Math.floor(this.progress%60));
    console.log(Math.round((this.progress%60 + Number.EPSILON) * 100) / 100
    );
    
    
    setTimeout(() =>{
      this.updateProgress();
    },1000) 
  }
}
