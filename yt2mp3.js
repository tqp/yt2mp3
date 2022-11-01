const ytdl = require('ytdl-core');
const fs = require('fs');

const path = 'C:\\_TQP\\music_to_file';

const urlList = [
    'https://www.youtube.com/watch?v=bgv_YB4Kvbc',
    'https://www.youtube.com/watch?v=YsMB0i5YTOc',
    'https://www.youtube.com/watch?v=2xcx26_z4As',
    'https://www.youtube.com/watch?v=BBHfk4-KBtM'
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
        console.log(`Downloading ${title}`);
        ytdl(url, {
            format: 'mp3',
            filter: 'audioonly',
        }).pipe(fs.createWriteStream(path + '\\' + title + '.mp3'));
    }
    console.log('Finished');
};

downloadAll().then();
