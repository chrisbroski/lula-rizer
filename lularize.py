#!/usr/bin/env python

import sys, os, random
import argparse
from PIL import Image, ImageFont, ImageDraw

colors = [
    (254, 209, 65),  # yellow
    (255, 157, 110), # orange
    (246, 117, 153), # pink
    (221, 127, 211), # fuschia
    (149, 149, 210), # purple
    (139, 184, 232), # blue
    (100, 204, 201), # mint
    (136, 139, 141)] # gray

styleData = {
    'joy': {'price': 60, 'sizes': ['xs', 's', 'm', 'l', 'xl']},
    'tween': {'price': 23},
    'tall_&_curvy': {'price': 25},
    'kids_s/m': {'price': 23},
    'sloan': {'price': 28, 'sizes': [2, 4, 6, 8, 10, 12, 14]},
    'sarah': {'price': 70, 'sizes': ['xs', 's', 'm', 'l', 'xl']},
    'randy': {'price': 35, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'perfect_t': {'price': 36, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'patrick': {'price': 40, 'sizes': ['m', 'l', 'xl', '2xl', '3xl']},
    'one_size': {'price': 25},
    'nicole': {'price': 48, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'monroe': {'price': 48, 'sizes': ['s', 'l']},
    'maxi': {'price': 42, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'madison': {'price': 48, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'kids_l/xl': {'price': 23},
    'lucy': {'price': 52, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl']},
    'lola': {'price': 48, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl']},
    'lindsay': {'price': 48, 'sizes': ['s', 'm', 'l']},
    'kids_azure': {'price': 25, 'sizes': [2, 4, 6, 8, 10, 12, 14]},
    'julia': {'price': 45, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'jordan': {'price': 65, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl']},
    'jill': {'price': 55, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl']},
    'jade': {'price': 55, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl']},
    'irma': {'price': 35, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'gracie': {'price': 28, 'sizes': [2, 4, 6, 8, 10, 12, 14]},
    'dotdotsmile': {'price': 36, 'sizes': [2, '3/4', '5/6', 7, '8/10', '12/14']},
    'classic_t': {'price': 35, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'cassie': {'price': 35, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'azure': {'price': 35, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'ana': {'price': 60, 'sizes': ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl']},
    'amelia': {'price': 65, 'sizes': ['xxs', 'xs', 's', 'm', 'l', 'xl', '2xl']},
    'carly': {'price': 55, 'sizes': ['xs', 's', 'm']}
}

# Globals
color = colors[random.randrange(0, len(colors) - 1)]
running_total = 0

logo = Image.open('logo.jpg')
finalWidth = 612

def formatStyle(styleType):
    styleType = styleType.replace('_', ' ')
    return styleType.upper()

def centerText(draw, msg, font, width):
    w, h = draw.textsize(msg, font=font)
    return (width / 2) - (w / 2)

def lularizedName(style, size, i):
    return style + "_" + size + "_" + str(i) + '.jpg'

def isLularizedName(fn, style, size):
    fileName = os.path.basename(fn)

    if len(fileName) < 1:
        return False
    if fileName.count('_') < 2:
        return False
    if fileName[:fileName.rfind('_')] == style + '_' + size:
        return True
    return False

def centerLocation(size, center):
    selectionSize = 285
    xLoc = int((size[0] * center[0] / 100) - (selectionSize / 2))
    yLoc = int((size[1] * center[1] / 100) - (selectionSize / 2))
    return (xLoc, yLoc, xLoc + selectionSize, yLoc + selectionSize)

def processImage(file, folder, style, size, watermark, detail, exportPath, deleteSource):
    photo_increment = 1

    if isLularizedName(file, style, size):
        return

    img = Image.open(file)

    # add LuLaRoe logo or close-up
    if not detail:
        closeup = logo
    else:
        imgCloseup = Image.open(file)
        closeup = imgCloseup.crop(centerLocation(imgCloseup.size, detail))

    if not exportPath:
        exportPath = folder

    img.thumbnail((finalWidth, 816))
    newImage = Image.new("RGBA", size=(int(finalWidth * 1.5), 816), color=(255,255,255))
    newImage.paste(img, (0, 0, finalWidth, 816))
    newImage.paste(closeup, (624, 520, 909, 805))
    draw = ImageDraw.Draw(newImage)

    if watermark != '':
        # Official font is Maven Pro Light but regular is extremely close
        font = ImageFont.truetype("www/css/MavenPro-Regular.ttf", 40)
        xWatermark = centerText(draw, watermark, font, finalWidth)
        draw.text((xWatermark + 2, 760), watermark, (0, 0, 0), font=font)
        draw.text((xWatermark, 758), watermark, color, font=font)

    # Style
    draw.rectangle([(finalWidth, 0), (int(finalWidth * 1.5), 130)], fill=color)
    msg = formatStyle(style)
    # Try to get license from https://www.fontspring.com/custom-licenses
    font = ImageFont.truetype("www/css/steelfish rg.ttf", 80)
    msg = msg.upper()
    draw.text((finalWidth + centerText(draw, msg, font, int(finalWidth * 0.5)), 15), msg, (255, 255, 255), font=font)

    # Size
    font = ImageFont.truetype("www/css/steelfish rg.ttf", 100)
    msg = msg.upper()
    draw.text((finalWidth + centerText(draw, size.upper(), font, int(finalWidth * 0.5)), 150), size.upper(), color, font=font)

    # Price
    msg = "$" + str(styleData[style]['price'])
    draw.text((finalWidth + centerText(draw, msg, font, int(finalWidth * 0.5)), 275), msg, color, font=font)

    # Save image
    while os.path.exists(exportPath + lularizedName(style, size, photo_increment)):
        photo_increment += 1

    newImage.save(exportPath + lularizedName(style, size, photo_increment))

    if deleteSource:
        os.remove(file)

    global running_total
    running_total += 1

def getFinalDir(folder):
    folder = folder[:-1]
    return folder[folder.rfind('/') + 1:]

def processSize(folder, style, watermark, detail, exportPath, deleteSource):
    size = getFinalDir(folder)

    for fn in os.listdir(folder):
        if os.path.isfile(folder + fn) and os.path.splitext(fn)[1] == '.jpg':
            print('processing ' + folder)
            processImage(folder + fn, folder, style, size, watermark, detail, exportPath, deleteSource)

def processStyle(folder, watermark, detail, exportPath, deleteSource):
    style = getFinalDir(folder)

    for fn in os.listdir(folder):
        if os.path.isfile(folder + fn) and os.path.splitext(fn)[1] == '.jpg':
            print('processing ' + folder)
            processImage(folder + fn, folder, style, '', watermark, detail, exportPath, deleteSource)
        elif os.path.isdir(folder + fn):
            processSize(folder + fn + '/', style, watermark, detail, exportPath, deleteSource)

def processFolder(folder, watermark, detail, exportPath, deleteSource):
    for fn in os.listdir(folder):
        if os.path.isdir(folder + fn):
            processStyle(folder + fn + '/', watermark, detail, exportPath, deleteSource)

if __name__ == "__main__":
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='Add style, size, and price information to LuLaRoe clothing photos.')
    parser.add_argument('source', help='Parent directory of photos')
    parser.add_argument('--watermark', '-w', default='', help='Message embossed over bottom of photo')
    parser.add_argument('--export', '-e', default='', help='Directory path where processed photos will be saved')
    parser.add_argument('--detail', '-d', nargs=2, type=float, help='Use a close-up centered at this %% x, y position instead of logo')
    parser.add_argument('--remove', '-r', action='store_true', help='Delete source photo once processed')

    args = parser.parse_args()

    if args.detail is None:
        detail = False
    else:
        if len(args.detail) == 0:
            detail = [50.0, 50.0]
        elif len(args.detail) == 1:
            detail = [args.detail[0], 50.0]
        else:
            detail = [args.detail[0], args.detail[1]]

    if args.export:
        exportPath = args.export
        if exportPath[-1] != '/':
            exportPath = exportPath + '/'
    else:
        exportPath = False

    print('Lularizing folder: ' + args.source)
    processFolder(args.source + '/', args.watermark, detail, exportPath, args.remove)
    print('Lularized ' + str(running_total) + ' photos.')
