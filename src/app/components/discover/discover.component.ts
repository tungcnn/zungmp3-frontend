import {Component, OnInit} from '@angular/core';
import {Song} from "../../interface/song";
import {PlaymusicService} from "../../service/playmusic.service";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  song: Song[] = [
    {
      id: 1,
      name: 'Trốn tìm',
      filename: 'https://firebasestorage.googleapis.com/v0/b/webmusic-cc387.appspot.com/o/Tron%20Tim%20-%20Den_%20MTV.mp3?alt=media&token=0bd5e513-15b3-4486-9bc9-36e8fd6438ac',
      singers: [{
        id: 1,
        name: 'Đen Vâu'
      }]
    },
    {
      id: 1,
      name: 'Giá như',
      filename: 'https://firebasestorage.googleapis.com/v0/b/webmusic-cc387.appspot.com/o/Gia%20Nhu%20-%20Chillies.mp3?alt=media&token=fae03dc8-fdea-4c94-ac80-96156816acc21',
      singers: [{
        id: 1,
        name: 'Chillies'
      }]
    },
    {
      id: 1,
      name: 'Sài gòn đau lòng quá',
      filename: 'https://firebasestorage.googleapis.com/v0/b/webmusic-cc387.appspot.com/o/Sai%20Gon%20Dau%20Long%20Qua%20-%20Hua%20Kim%20Tuyen_%20Ho.mp3?alt=media&token=11cf2afd-eaa7-4627-9401-e87264d6ac9c',
      singers: [{
        id: 1,
        name: 'Hứa Kim Tuyền'
      }]
    }
  ];

  constructor(private playService: PlaymusicService) {
  }

  ngOnInit() {
  }

  playmusic() {
    this.playService.playsong(this.song);
  }
}
