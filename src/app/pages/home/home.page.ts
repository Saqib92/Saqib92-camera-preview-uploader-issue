import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonFab, IonButton } from '@ionic/angular/standalone';
import { CameraPreview, CameraPreviewOptions } from '@capgo/camera-preview'
import { Uploader } from '@capgo/capacitor-uploader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFabButton, IonFab, IonButton],
})
export class HomePage implements OnInit {

  isRecording: boolean = false;
  isCameraOpen: boolean = false;
  constructor() { }

  ionViewWillEnter() {

  }

  async startCamera() {
    this.isCameraOpen = true;
    let opt: CameraPreviewOptions = {
      position: 'rear',
      toBack: true
    }

    await CameraPreview.start(opt);
  }

  ionViewWillLeave() {
    setTimeout(async () => {
      await CameraPreview.stop();
    }, 1000)
  }

  ngOnInit() {
  }


  async flip() {
    await CameraPreview.flip();
  }

  async startRecording() {
    this.isRecording = true;
    await CameraPreview.startRecordVideo({ storeToFile: true })
  }

  async stopRecording() {
    this.isRecording = false;
    const fileUrl = await CameraPreview.stopRecordVideo()
    console.log(fileUrl)
    setTimeout(async () => {
      await this.uploadVideo(fileUrl.videoFilePath)
    }, 1000)

  }

  async uploadVideo(filePath: string) {
    // events not working
    Uploader.addListener('events', (event) => {
      console.log(event);
      switch (event.name) {
        case 'uploading':
          console.log(`Upload progress: ${event.payload.percent}%`);
          break;
        case 'completed':
          console.log('Upload completed successfully');
          console.log('Server response status code:', event.payload.statusCode);
          break;
        case 'failed':
          console.error('Upload failed:', event.payload.error);
          break;
      }
    });

    try {
      const result = await Uploader.startUpload({
        filePath,
        serverUrl: '', // add server url
        method: 'POST',
        headers: {
          'Content-Type': 'video/mp4',
          'Authorization': 'Bearer ' + 'My token here'
        },
        mimeType: 'video/mp4',
      });
      //always cnsole video uploaded. and notification shows upload error
      console.log('Video uploaded successfully:', result.id);

    } catch (error) {
      console.error('Error uploading video:', error);
      throw error;
    }
  }
}
