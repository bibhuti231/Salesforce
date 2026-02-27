import { LightningElement,api } from 'lwc';
import vid from "@salesforce/resourceUrl/video";

export default class VideoChild extends LightningElement {
    @api videoPlay(){
        let player=this.template.querySelector('video');
        player.play();
    }
    vidUrl = vid;
    @api videoPause(){
        let player=this.template.querySelector('video');
        player.pause();
    }
}