import face_recognition
import urllib.request

class Encoding:
    
    def getEncodings(img):
        face_image = face_recognition.load_image_file(img)
        image_encodings = face_recognition.face_encodings(face_image)[0]
        list_image_encodings = image_encodings.tolist()
        return list_image_encodings