import { Injectable } from '@angular/core';
import {Song} from "../interface/song";
import {SongServiceService} from "./song/song-service.service";

declare var $: any;
declare var jPlayerPlaylist: any;
@Injectable({
  providedIn: 'root'
})
export class PlaymusicService {

  constructor(private songService: SongServiceService) { }
  playsong(song: Song) {
    song.views +=1;
    this.songService.editSong(song).subscribe(()=>{});
    $("#jquery_jplayer_1").jPlayer("destroy");
    $(function () {
      "use strict";
      if ($('.audio-player').length) {
        var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';

        let singers = '';

        for (let j = 0; j < song.singers.length; j++) {
          singers += song.singers[j].name
          if (j != song.singers.length - 1) {
            singers += ", "
          }
        }

        var myPlaylist = new jPlayerPlaylist({
          jPlayer: "#jquery_jplayer_1",
          cssSelectorAncestor: "#jp_container_1"
        }, [
          {
            image: "assets/images/svg/play.svg",
            title: song.name,
            artist: singers,
            mp3: song.url,
            option: myPlayListOtion
          }
        ], {
          swfPath: "js/plugins",
          supplied: "oga, mp3",
          wmode: "window",
          useStateClassSkin: true,
          autoBlur: false,
          smoothPlayBar: true,
          keyEnabled: true,
          playlistOptions: {
            autoPlay: true
          }
        });

        $("#jquery_jplayer_1").on($.jPlayer.event.ready + ' ' + $.jPlayer.event.play, function (event) {
          var current = myPlaylist.current;
          var playlist = myPlaylist.playlist;
          $.each(playlist, function (index, obj) {
            if (index == current) {
              $(".jp-now-playing").html("<div class='jp-track-name'><span class='que_img'><img src='" + obj.image + "'></span><div class='que_data'>" + obj.title + " <div class='jp-artist-name'>" + obj.artist + "</div></div></div>");
            }
          });
          $('.knob-wrapper').mousedown(function () {
            $(window).mousemove(function (e) {
              var angle1 = getRotationDegrees($('.knob')),
                volume = angle1 / 270

              if (volume > 1) {
                $("#jquery_jplayer_1").jPlayer("volume", 1);
              } else if (volume <= 0) {
                $("#jquery_jplayer_1").jPlayer("mute");
              } else {
                $("#jquery_jplayer_1").jPlayer("volume", volume);
                $("#jquery_jplayer_1").jPlayer("unmute");
              }
            });

            return false;
          }).mouseup(function () {
            $(window).unbind("mousemove");
          });


          function getRotationDegrees(obj) {
            var matrix = obj.css("-webkit-transform") ||
              obj.css("-moz-transform") ||
              obj.css("-ms-transform") ||
              obj.css("-o-transform") ||
              obj.css("transform");
            if (matrix !== 'none') {
              var values = matrix.split('(')[1].split(')')[0].split(',');
              var a = values[0];
              var b = values[1];
              var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            } else {
              var angle = 0;
            }
            return (angle < 0) ? angle + 360 : angle;
          }


          var timeDrag = false;
          $('.jp-play-bar').mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);

          });
          $(document).mouseup(function (e) {
            if (timeDrag) {
              timeDrag = false;
              updatebar(e.pageX);
            }
          });
          $(document).mousemove(function (e) {
            if (timeDrag) {
              updatebar(e.pageX);
            }
          });
          var updatebar = function (x) {
            var progress = $('.jp-progress');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }
            $("#jquery_jplayer_1").jPlayer("playHead", percentage);
            $('.jp-play-bar').css('width', percentage + '%');
          };
          $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function () {
            $('#playlist-wrap').fadeToggle();
            $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
          });
          $('.hide_player').unbind().on('click', function () {
            $('.audio-player').toggleClass('is_hidden');
            $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
          });
          $('body').unbind().on('click', '.audio-play-btn', function () {
            $('.audio-play-btn').removeClass('is_playing');
            $(this).addClass('is_playing');
            var playlistId = $(this).data('playlist-id');
            myPlaylist.play(playlistId);
          });

        });
      }
    });
  }
  playPlayList(songs: Song[]) {
    $("#jquery_jplayer_1").jPlayer("destroy");
    $(function () {
      "use strict";
      if ($('.audio-player').length) {
        var myPlayListOtion = '<ul class="more_option"><li><a href="#"><span class="opt_icon" title="Add To Favourites"><span class="icon icon_fav"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Queue"><span class="icon icon_queue"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Download Now"><span class="icon icon_dwn"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Add To Playlist"><span class="icon icon_playlst"></span></span></a></li><li><a href="#"><span class="opt_icon" title="Share"><span class="icon icon_share"></span></span></a></li></ul>';

        var myPlaylist = new jPlayerPlaylist({
          jPlayer: "#jquery_jplayer_1",
          cssSelectorAncestor: "#jp_container_1"
        }, [], {
          swfPath: "js/plugins",
          supplied: "oga, mp3",
          wmode: "window",
          useStateClassSkin: true,
          autoBlur: false,
          smoothPlayBar: true,
          keyEnabled: true,
          playlistOptions: {
            autoPlay: true
          }
        });
        let singers = '';
        for (let i = 0; i < songs.length; i++) {
          for (let j = 0; j < songs[i].singers.length; j++) {
            singers += songs[i].singers[j].name
            if (j != songs[i].singers.length - 1) {
              singers += ", "
            }
          }
          myPlaylist.add({
            image: songs[i].coverUrl,
            title: songs[i].name,
            artist: singers,
            mp3: songs[i].url,
            oga: songs[i].url,
            option: myPlayListOtion
          });
        }
        $("#jquery_jplayer_1").on($.jPlayer.event.ready + ' ' + $.jPlayer.event.play, function (event) {
          var current = myPlaylist.current;
          var playlist = myPlaylist.playlist;
          $.each(playlist, function (index, obj) {
            if (index == current) {
              $(".jp-now-playing").html("<div class='jp-track-name'><span class='que_img'><img src='" + obj.image + "'></span><div class='que_data'>" + obj.title + " <div class='jp-artist-name'>" + obj.artist + "</div></div></div>");
            }
          });
          $('.knob-wrapper').mousedown(function () {
            $(window).mousemove(function (e) {
              var angle1 = getRotationDegrees($('.knob')),
                volume = angle1 / 270

              if (volume > 1) {
                $("#jquery_jplayer_1").jPlayer("volume", 1);
              } else if (volume <= 0) {
                $("#jquery_jplayer_1").jPlayer("mute");
              } else {
                $("#jquery_jplayer_1").jPlayer("volume", volume);
                $("#jquery_jplayer_1").jPlayer("unmute");
              }
            });

            return false;
          }).mouseup(function () {
            $(window).unbind("mousemove");
          });


          function getRotationDegrees(obj) {
            var matrix = obj.css("-webkit-transform") ||
              obj.css("-moz-transform") ||
              obj.css("-ms-transform") ||
              obj.css("-o-transform") ||
              obj.css("transform");
            if (matrix !== 'none') {
              var values = matrix.split('(')[1].split(')')[0].split(',');
              var a = values[0];
              var b = values[1];
              var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            } else {
              var angle = 0;
            }
            return (angle < 0) ? angle + 360 : angle;
          }


          var timeDrag = false;
          $('.jp-play-bar').mousedown(function (e) {
            timeDrag = true;
            updatebar(e.pageX);

          });
          $(document).mouseup(function (e) {
            if (timeDrag) {
              timeDrag = false;
              updatebar(e.pageX);
            }
          });
          $(document).mousemove(function (e) {
            if (timeDrag) {
              updatebar(e.pageX);
            }
          });
          var updatebar = function (x) {
            var progress = $('.jp-progress');
            var position = x - progress.offset().left;
            var percentage = 100 * position / progress.width();
            if (percentage > 100) {
              percentage = 100;
            }
            if (percentage < 0) {
              percentage = 0;
            }
            $("#jquery_jplayer_1").jPlayer("playHead", percentage);
            $('.jp-play-bar').css('width', percentage + '%');
          };
          $('#playlist-toggle, #playlist-text, #playlist-wrap li a').unbind().on('click', function () {
            $('#playlist-wrap').fadeToggle();
            $('#playlist-toggle, #playlist-text').toggleClass('playlist-is-visible');
          });
          $('.hide_player').unbind().on('click', function () {
            $('.audio-player').toggleClass('is_hidden');
            $(this).html($(this).html() == '<i class="fa fa-angle-down"></i> HIDE' ? '<i class="fa fa-angle-up"></i> SHOW PLAYER' : '<i class="fa fa-angle-down"></i> HIDE');
          });
          $('body').unbind().on('click', '.audio-play-btn', function () {
            $('.audio-play-btn').removeClass('is_playing');
            $(this).addClass('is_playing');
            var playlistId = $(this).data('playlist-id');
            myPlaylist.play(playlistId);
          });

        });
      }
    });
  }
}
