import face_recognition
import numpy as np

from models.models import Wanted as WantedModel


class Wanted:

    def criminalMatch(img):
        res = -1
        try:
            criminals = list(WantedModel.objects.all())
            #print(criminals)
            passenger_image = face_recognition.load_image_file(img)
            # Encode the known image
            passenger_image_encoding = face_recognition.face_encodings(passenger_image)[0]
            # Variables to keep track of the most similar face match we've found
            comp_faces = False

            # Loop over all the images we want to check for similar people
            for criminal in criminals:
                criminal_image_encodings = np.array(criminal.encodings)
                # Get the face distance between the known person and all the faces in this image
                comp_faces = face_recognition.compare_faces([passenger_image_encoding], criminal_image_encodings)[0]
                # If this face is more similar to our known image than we've seen so far, save it
                if comp_faces == True:
                    print(criminal)
                    res = 1
                    return res
            res = 0

        except Exception as e:
            if hasattr(e, 'message'):
                print(e.message)
            else:
                print(e)
            res = -1

        return res
