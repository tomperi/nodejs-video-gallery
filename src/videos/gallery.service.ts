import { Injectable, NotFoundException } from "@nestjs/common";
import { Video } from "./gallery.model";
import { v4 as uuid } from 'uuid';
import { generateThumbnail } from "./video.editor";

export const StoragePrefix = './gallery'
export const VideoFolder = `${StoragePrefix}/videos`
export const ThumbnailFolder = `${StoragePrefix}/thumbnails`
export const PreviewFolder = `${StoragePrefix}/preview`

@Injectable()
export class GalleryService {
    private videos: Video[] = [
        new Video(
            "6d5679cc-fd85-4cbf-a649-d95869d8e39b",
            "first gallery video",
            "this is the first video in this gallery!",
            "pexels-ruvim-miksanskiy-5573504-01c6f483.mp4",
            "pexels-ruvim-miksanskiy-5573504-01c6f483.png",
            new Date("2021-10-16T22:41:00.788Z")
        )
    ];

    addVideo(name: string, description: string, file: Express.Multer.File): Video {
        console.log('processing new video...')
        console.log('generating video thumbnail')
        const thumbnail = generateThumbnail(file)        
        const video = new Video(uuid(), name, description, file.filename, thumbnail, new Date())
        this.videos.push(video)
        return video
    }

    getVideos(): Video[] {
        return [...this.videos];
    }

    getSingleVideo(videoId: string): Video {
        const video = { ...this.videos.find(video => video.id === videoId)}
        if (Object.keys(video).length === 0) {
            console.log('no video found')
            throw new NotFoundException()
        }

        return video
    }

    getVideoFilePath(videoId: string) {
        return `${VideoFolder}/${this.getSingleVideo(videoId).videoFilename}`
    }

    getVideoThumbnailPath(videoId: string) {
        return `${ThumbnailFolder}/${this.getSingleVideo(videoId).thumbnailFilename}`
    }
}