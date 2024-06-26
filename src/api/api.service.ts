import {  Inject, Injectable } from '@nestjs/common';
import { PollyService } from './aws/aws-polly';
@Injectable()
export class ApiService {
  constructor(
    @Inject(PollyService) private readonly pollyService: PollyService,
  ) {}
  async createAudio(text: string) {
    console.log("here")
    const voice = await this.pollyService.createAudio({
      OutputFormat: 'mp3',
      Text: text,
      VoiceId: 'Joanna',
      Engine: 'neural',
      LanguageCode: 'en-US',
      TextType:'text'
    });

    const stream = await voice.AudioStream.transformToByteArray();
console.log(voice.ContentType)
    return {
      stream: stream,
      headers: new Headers({
        'Content-Type': voice.ContentType,
      }),
      contentType: voice.ContentType,
    };
  }

}
