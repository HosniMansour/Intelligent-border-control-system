import json
import datetime
from django.conf import settings
from passporteye import read_mrz
import numpy as np
import imutils
import cv2


def process_img(img_path):
    
    rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (13, 5))
    sqKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (35, 35))

    image = cv2.imread(img_path)
    image = imutils.resize(image, height=600)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.GaussianBlur(gray, (3, 3), 0)
    blackhat = cv2.morphologyEx(gray, cv2.MORPH_BLACKHAT, rectKernel)

    gradX = cv2.Sobel(blackhat, ddepth=cv2.CV_32F, dx=1, dy=0, ksize=-1)
    gradX = np.absolute(gradX)
    (minVal, maxVal) = (np.min(gradX), np.max(gradX))
    gradX = (255 * ((gradX - minVal) / (maxVal - minVal))).astype("uint8")

    gradX = cv2.morphologyEx(gradX, cv2.MORPH_CLOSE, rectKernel)
    thresh = cv2.threshold(gradX, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, sqKernel)
    thresh = cv2.erode(thresh, None, iterations=4)

    p = int(image.shape[1] * 0.05)
    thresh[:, 0:p] = 0
    thresh[:, image.shape[1] - p:] = 0

    cnts = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

    for c in cnts:
        (x, y, w, h) = cv2.boundingRect(c)
        ar = w / float(h)
        crWidth = w / float(gray.shape[1])
        if ar > 5 and crWidth > 0.75:
            pX = int((x + w) * 0.03)
            pY = int((y + h) * 0.03)
            (x, y) = (x - pX, y - pY)
            (w, h) = (w + (pX * 2), h + (pY * 2))
            roi = image[y:y + h, x:x + w].copy()
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
            break

    cv2.imwrite(settings.MEDIA_ROOT+"/media/tmp/roi.png", roi)

class OCR:

    def passportMatch(img):
        try:
            try:
                process_img(img)
                mrz = read_mrz(settings.MEDIA_ROOT+"/media/tmp/roi.png")
            except:
                mrz = read_mrz(img)
            mrz_data = mrz.to_dict()
        except:
            mrz_data = {
                "mrz_type": "",
                "valid_score":"",
                "type": "",
                "country":"",
                "number": "",
                "date_of_birth": "",
                "expiration_date": "",
                "nationality": "",
                "sex": "",
                "names": "",
                "surname": "",
                "personal_number": "",
                "check_number": "",
                "check_date_of_birth": "",
                "check_expiration_date": "",
                "check_composite": "",
                "check_personal_number": "",
                "valid_number": "",
                "valid_date_of_birth": False,
                "valid_expiration_date": False,
                "valid_composite": False,
                "valid_personal_number": False,
                "method": ""
            }
        
        
        json_mrz_data = json.dumps(mrz_data)
        json_mrz_data_load = json.loads(json_mrz_data)
        try:
            birthDate = datetime.datetime.strptime(json_mrz_data_load["date_of_birth"],'%y%m%d').date()
            if birthDate.year > 2019:
                birthDate = birthDate.replace(year=birthDate.year-100)
            expirationDate = datetime.datetime.strptime(json_mrz_data_load["expiration_date"],'%y%m%d').date()

            json_mrz_data_load['date_of_birth'] = birthDate
            json_mrz_data_load['expiration_date'] = expirationDate
        except:
            json_mrz_data_load['date_of_birth'] = '1900-01-01'
            json_mrz_data_load['expiration_date'] = '1900-01-01'

        return json_mrz_data_load
