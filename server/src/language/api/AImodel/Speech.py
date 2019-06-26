import speech_recognition as sr
from googletrans import Translator

import json

class Speech:

    def process_audio(dest_lang, uploaded_file_url): #dest_lang: 'fr', 'en' ..

        print(dest_lang)

        AUDIO_FILE = (uploaded_file_url)

        # use the audio file as the audio source
        r = sr.Recognizer()
        with sr.AudioFile(AUDIO_FILE) as source:
            #reads the audio file. Here we use record instead of
            #listen
            audio = r.record(source)
        try:
            text = r.recognize_google(audio)
            print("The audio file contains: " + format(text))

        except sr.UnknownValueError:
            return "Google Speech Recognition could not understand audio"
        except sr.RequestError as e:
            return "Could not request results from Google Speech Recognition service"

        translator = Translator()
        detected = translator.detect(text)
        print('Detected Language:', detected.lang, ') -> with confidence code: ', detected.confidence)

        translated = translator.translate(text, src=detected.lang, dest=dest_lang)
        print(" Source Language: " + translated.src )
        print(" Translated string: " + translated.text)


        data = '{"srcSpeech":"' + format(text) + '","srcLang":"' + detected.lang + '","transSpeech":"' + translated.text + '"}'
        return json.loads(data)