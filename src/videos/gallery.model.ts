export class Video {
    constructor(
        public id: string,
        public name: string,
        public description: string, 
        public videoFilename: string,
        public thumbnailFilename: String,
        public uploadDate: Date,
    ) {};
}
