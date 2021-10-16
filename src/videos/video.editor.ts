import { v4 as uuid } from 'uuid';
import { extname } from "path";
import { ThumbnailFolder, VideoFolder } from './gallery.service';

var ffmpeg = require('fluent-ffmpeg');

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.').slice(0, -1).join('.');
    const ext = extname(file.originalname);
    const rand = uuid().split('-')[0];
    callback(null, `${name}-${rand}${ext}`);
};

export function generateThumbnail(file: Express.Multer.File) {
    let thumbnail: String
    const res = ffmpeg(`${VideoFolder}/${file.filename}`)
    .on('filenames', function(filenames) {
        thumbnail = filenames[0]
    })
    .on('end', function() {
        console.log('completed taking screenshot for file %s', file.filename)
    })
    .screenshots({
        timemarks: [1],
        filename: file.filename.split('.').slice(0, -1).join('.'),
        folder: ThumbnailFolder
    });

    console.log(thumbnail)
    return thumbnail
};
