module.exports = {
  speech(req, res) {
    // res.json('testing speeh api')
      // Imports the Google Cloud client library
      const speech = require('@google-cloud/speech');
      const fs = require('fs');
    
      // Creates a client
      const client = new speech.SpeechClient();
    
      // The name of the audio file to transcribe
      // const fileName = './resources/audio.raw';
      const fileName = './audiotest/ManualTest.wav';
    
      // Reads a local audio file and converts it to base64
      
      const file = fs.readFileSync(fileName);
      // const file = req.body.data
      // const audioBytes = req.file.toString('base64');
      // console.log(audioBytes)
      // res.json('output')
      
      // console.log('ini req body coy' ,req.body)
      // // res.json(req.body)
      // var buffer = new Buffer( req.file );
      const path = req.file.path
      console.log(req.file)
      // res.json('testing')
      console.log(path)
      const secondFile = fs.readFileSync(path);
      // console.log(secondFile)
      const audioBytes = secondFile.toString('base64')
      // console.log(audioBytes)
      // res.json('test test')
      // const audioBytes = file.toString('base64');
      // console.log(audioBytes)
      // const audioBytes = req.body.data.toString('base64')
      // The audio file's encoding, sample rate in hertz, and BCP-47 language code
      const audio = {
        content: audioBytes,
      };
      const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 44100,
        languageCode: 'id-ID',
        alternativeLanguageCodes: [`en-US`],
      };
      const request = {
        audio: audio,
        config: config,
      };
    
      // Detects speech in the audio file
      client.recognize(request)
      .then((result) => {
        const [response] = result
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log(`Transcription: ${transcription}`);
        res.json({
          detected: transcription
        })
      }).catch((err) => {
        console.log(err)
        // main().catch(console.error);
        res.status(400).json(err.message)
      });
      
    
  }
}