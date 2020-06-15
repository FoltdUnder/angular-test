import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public videoBgUrl;
  public youTubeVideoId: string;
  constructor() { }
  ngOnInit(): void {
  }
  onInputChange(event) {
    let equalPosition = event.target.value.indexOf('=');
    this.youTubeVideoId = event.target.value.slice(equalPosition+1);
    console.log(this.youTubeVideoId);
    this.videoBgUrl = 'https://img.youtube.com/vi/' + this.youTubeVideoId + '/maxresdefault.jpg';
  }

}
