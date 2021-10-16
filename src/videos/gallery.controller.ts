import { Controller, Post, Body, Get, UseInterceptors, UploadedFile, Param, StreamableFile, Response } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "./video.editor";
import { GalleryService, VideoFolder } from "./gallery.service";
import { Video } from "./gallery.model";
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('gallery')
export class GalleryController {
    constructor(private readonly service: GalleryService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({ 
            destination: VideoFolder,
            filename: editFileName
        }),
      }))
    addItem(
        @Body('name') name: string, 
        @Body('description') description: string, 
        @UploadedFile('file') file: Express.Multer.File
    ): any {
        console.log('uploading new file %s', file.originalname);
        const video = this.service.addVideo(name, description, file);
        return {id: video.id}
    };

    @Get()
    getAllItems() {
        return { videos: this.service.getVideos()
            .map(video => 
                new Video(
                    video.id,
                    video.name,
                    video.description,
                    `gallery/video/${video.id}`,
                    `gallery/thumbnail/${video.id}`,
                    video.uploadDate
                )
            )
        }
    };

    getFile(path: string): StreamableFile {
        return new StreamableFile(createReadStream(join(process.cwd(), path)));
    }

    @Get('/video/:id') 
    getItem(
        @Response({ passthrough: true }) res,
        @Param('id') videoId: string
    ): StreamableFile {
        res.set({'Content-Type': 'video/mp4'}) 
        return this.getFile(this.service.getVideoFilePath(videoId))
    }

    @Get('/thumbnail/:id')
    getItemThumbnail(
        @Response({ passthrough: true }) res,
        @Param('id') videoId: string
    ) {
        res.set({'Content-Type': 'image/png'}) 
        return this.getFile(this.service.getVideoThumbnailPath(videoId))
    }
}
