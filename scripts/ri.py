from PIL import Image
import pytesseract
from pytesseract import Output
import cv2
 
source = 'test.png'
img = cv2.imread(source)
text=pytesseract.image_to_string(img)
print(text)

d = pytesseract.image_to_data(img, output_type=Output.DICT)
 
NbBox = len(d['level'])
print ("Number of boxes: {}".format(NbBox))

for i in range(NbBox):
    (x, y, w, h) = (d['left'][i], d['top'][i], d['width'][i], d['height'][i])
    # display rectangle
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
 
cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()