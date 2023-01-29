import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { channel } from 'src/app/models/channel';
import { SurveillanceService } from 'src/app/services/surveillance.service';
import { VideoPlayerComponent } from '../card/video-player/video-player.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  channels: channel[];
  selectedChannel: channel;
  playlist: channel[];
  selectedVideo: string;

  wordSearch: string;
  p1: number = 1;
  p2: number = 1;

  loading: boolean = false;

  constructor(
    private surveillanceService: SurveillanceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getChannels();
    this.getPlaylist();
  }

  getChannels() {
    this.surveillanceService.getChannels().subscribe(
      data => {
        this.channels = data as channel[];
      },
      error => console.log(error)
    );
  }

  getPlaylist() {
    this.surveillanceService.getPlaylist().subscribe(
      data => {
        this.playlist = data as channel[];
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  getList(list: channel[]) {
    let channelList = [];
    for(let listitem of list)
    channelList.push(listitem);
    var filteredChannelList = [];
    if (this.wordSearch) {
      filteredChannelList = channelList.filter(element =>
        (element.name.toLowerCase()).includes(this.wordSearch.toLowerCase()));
    } else {
      filteredChannelList = channelList;
    }
    return filteredChannelList;
  }

  checkIfInPlaylist(id: string){
    var index = this.playlist.findIndex(elem => elem.id === id);
    if(index != -1){
      return true;
    }
    return false;
  }

  addToPlaylist(channelId: string) {
    this.surveillanceService.addToPlaylist(channelId).subscribe(
      data => {
        this.channels
        this.getPlaylist();
      },
      error => console.log(error)
    );
  }

  removeFromPlaylist(channelId: string) {
    this.surveillanceService.removeFromPlaylist(channelId).subscribe(
      data => {
        this.getPlaylist();
      },
      error => console.log(error)
    );
  }
}