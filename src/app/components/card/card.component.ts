import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { channel } from 'src/app/models/channel';
import { MatDialog } from '@angular/material/dialog';
import { SurveillanceService } from '../../services/surveillance.service';
import { VideoPlayerComponent } from './video-player/video-player.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() channel:channel = null;
  @Input() inPlaylist: boolean = false;
  @Input() color: string = 'clear';
  @Input() playlistView: boolean = false;

  @Output() addChannel = new EventEmitter<string>();

  @Output() removeChannel = new EventEmitter<string>();
  
  selectedVideo: any;

  constructor(
    public dialog: MatDialog,
    private surveillanceService: SurveillanceService
  ) { }

  ngOnInit(): void {
  }

  addToPlaylist(channelId: string) {
    this.addChannel.emit(channelId)
  }

  removeFromPlaylist(channelId: string) {
    this.removeChannel.emit(channelId)
  }

  displayVideo(channel: channel) {
    this.selectedVideo = this.surveillanceService.getVideo(channel.id);

    this.dialog.open(VideoPlayerComponent, {
      data: {video: this.selectedVideo, name: channel.name},
    });
  }

}
