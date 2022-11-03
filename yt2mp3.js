const ytdl = require('ytdl-core');
const fs = require('fs');

const path = 'C:\\_TQP\\music_to_file';

const urlList = [
    'https://www.youtube.com/watch?v=etr7UtnUflM'
];

const getVideoTitle = url =>
    new Promise(resolve =>
        setTimeout(() => {
            ytdl.getInfo(url).then(info => {
                resolve(info.videoDetails.title);
            })
        }, 0)
    );

const downloadAll = async () => {
    let url;
    for (url of urlList) {
        const title = await getVideoTitle(url);
        // const cleanTitle = title.replace(/[^a-zA-Z ]/g, "");
        const cleanTitle = title.replace(/[$@%]/g, '');
        console.log(`Downloading ${cleanTitle} (${url})`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
        }).pipe(fs.createWriteStream(path + '\\' + cleanTitle + '.mp3'));
    }
    console.log('Finished');
};

downloadAll().then();
