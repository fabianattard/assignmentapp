import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from '../../providers/posts/posts';

/**
 * Generated class for the NewsFeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({name : 'newsFeed'})
@Component({
  selector: 'page-news-feed',
  templateUrl: 'news-feed.html',
})
export class NewsFeedPage {

  public posts: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private postService: PostsProvider) {
  }

  public ionViewDidLoad()
  {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data.posts;
        
      },
      error => {

      }
    )
  }

}
