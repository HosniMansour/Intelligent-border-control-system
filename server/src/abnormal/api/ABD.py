from keras.models import load_model
import cv2
from django.conf import settings
from scipy.misc import imresize
import numpy as np
from background_task import background
from django.utils import timezone

def mean_squared_loss(x1,x2):
    diff=x1-x2
    a,b,c,d,e=diff.shape
    n_samples=a*b*c*d*e
    sq_diff=diff**2
    Sum=sq_diff.sum()
    dist=np.sqrt(Sum)
    mean_dist=dist/n_samples

    return mean_dist


@background(schedule=timezone.now())
def startABD(params):

    model = load_model(settings.MEDIA_ROOT+"/media/model/model.h5")
    threshold = float(params)
    vc = cv2.VideoCapture(1)
    rval = True
    text = ""
    while rval:
        imagedump = []
        for i in range(10):
            ok_flag, frame = vc.read()
            cv2.putText(frame, text, (250, 50), cv2.FONT_HERSHEY_DUPLEX, 2, (0, 0, 255))
            cv2.imshow("Camera", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                rval = False

            if cv2.waitKey(1) == 27:
                rval = False

            frame = imresize(frame, (227, 227, 3))

            # Convert the Image to Grayscale

            gray = 0.2989 * frame[:, :, 0] + 0.5870 * frame[:, :, 1] + 0.1140 * frame[:, :, 2]
            gray = (gray - gray.mean()) / gray.std()
            gray = np.clip(gray, 0, 1)
            imagedump.append(gray)

        imagedump = np.array(imagedump)

        imagedump.resize(227, 227, 10)
        imagedump = np.expand_dims(imagedump, axis=0)
        imagedump = np.expand_dims(imagedump, axis=4)

        text = ""

        output = model.predict(imagedump)
        loss = mean_squared_loss(imagedump, output)

        if loss > threshold:
            print('Anomalies Detected')
            text = "Alert"

    cv2.destroyAllWindows()