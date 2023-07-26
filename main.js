const synth = window.speechSynthesis;

//dom element
const textform = document.querySelector('form');
const textInput = document.querySelector('#textInput');
const voiceSelect = document.querySelector('#voiceSelect');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rateValue');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');

//init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //Loop throught voices and create an option for each one

};
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;

}
//speak
const speak = () => {
    //check its speaking
    if (synth.speaking) {
        console.error('Already speaking...');
        return;

    }
    if (textInput.value !== '') {
        //get speak text
        const speaktext = new SpeechSynthesisUtterance(textInput.value);
        //speak and
        speaktext.onend = e => {
            console.log('Done speaking...');

        }
        //speak error
        speaktext.onerror = e => {
            console.error('something went wrong');
        }
        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

        //loop through voices
        voices.forEach(voices => {
            if (voices.name === selectedVoice) {
                speaktext.voice = voices;
            }
        });

        //set pitch and rate
        speaktext.rate = rate.value;
        speaktext.pitch = pitch.value;
        //speak
        synth.speak(speaktext);

    }
};

//Event Listener

//text from submit
textform.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

//pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

//voice select change
voiceSelect.addEventListener('change', e => speak());

