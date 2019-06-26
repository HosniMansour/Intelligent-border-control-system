import face_recognition
import json

class FaceRecognition:

    def imageMatch(img1, img2):
        
        res = 0
        face_distance = 0
        face_locations = []

        try:
            passenger_image = face_recognition.load_image_file(img1)
            passenger_image_encoding = face_recognition.face_encodings(passenger_image)[0]

            passport_image = face_recognition.load_image_file(img2)

            face_locations = face_recognition.face_locations(passport_image)
            passport_image_encoding = face_recognition.face_encodings(passport_image, known_face_locations=face_locations)

            results = face_recognition.compare_faces(passenger_image_encoding, passport_image_encoding, tolerance=0.5)

            face_distance = face_recognition.face_distance(passenger_image_encoding, passport_image_encoding)
            face_distance = 100-(face_distance[0]*100)

            if results[0]:
                res = 1
        except:
            res = -1

        return '{"match":"' + str(res) + '","accuracy":"' + json.dumps(face_distance) + '","locations":"' + json.dumps(face_locations) + '"}'
