import { Module } from '@nestjs/common';
import { VideosModule } from './videos/gallery.module';

@Module({
  imports: [VideosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
