// 轮询类型的图片type为0, 相应的有一个images列表
// 静态类型的图片type为1, 相应的有一个image
const MI4ParseJSONMapElements = {
  'Background.Image': {
    image: '000',
    height: 240,
    width: 120,
    type: 1,
  },
  'Time.Hours.Tens': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
    width: 16, height: 31,
  },
  'Time.Hours.Ones': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
    width: 16, height: 31,
  },
  'Time.Minutes.Tens': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
    width: 16, height: 31,
  },
  'Time.Minutes.Ones': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
    width: 16, height: 31,
  },
};

(function() {
  const MI4BoxElement = document.querySelector('.mi4-preview');
  for (const key in MI4ParseJSONMapElements) {
    const elementInfo = MI4ParseJSONMapElements[key];
    const element = document.createElement('div');
    element.classList.add(key);
    element.classList.add('MI4Modular');

    const image = new Image();
    image.onload =function(){
      elementInfo.width = image.width;
      elementInfo.height = image.height;
    }

    // background
    switch(elementInfo.type) {
      case 1:
        element.style.backgroundImage = `url(resources/${elementInfo.image}.png)`;
        image.src = `url(resources/${elementInfo.image}.png)`;
        break;
      case 0:
        setElementBackgroundType1(element, elementInfo);
        image.src = `url(resources/${elementInfo.images[0]}.png)`;
        break;
      default:
        break;
    }

    element.style.width = elementInfo.width + 'px';
    element.style.height = elementInfo.height + 'px';
    elementInfo.element = element;
    // 设置位置
    MI4BoxElement.appendChild(element);
  }

  function setElementBackgroundType1(element, elementInfo) {
    const { images } = elementInfo;
    let index = 0;
    element.style.backgroundImage = `url(resources/${images[index]}.png)`;
    setInterval(() => {
      index ++;
      images.length === index && (index = 0);
      element.style.backgroundImage = `url(resources/${images[index]}.png)`;
    }, 1000);
  }
})()

// "Activity": {
//   "Steps": { // 步数
//     "Number": {
//       "TopLeftX": 0,
//       "TopLeftY": 80,
//       "BottomRightX": 0,
//       "BottomRightY": 90,
//       "Alignment": "TopRight",
//       "Spacing": 1,
//       "ImageIndex": 11,
//       "ImagesCount": 10
//     }
//   },
//   "Calories": { 卡路里
//     "Number": {
//       "TopLeftX": 0,
//       "TopLeftY": 100,
//       "BottomRightX": 0,
//       "BottomRightY": 110,
//       "Alignment": "TopRight",
//       "Spacing": 1,
//       "ImageIndex": 11,
//       "ImagesCount": 10
//     }
//   },
//   "Pulse": { 心跳
//     "Number": {
//       "TopLeftX": 0,
//       "TopLeftY": 120,
//       "BottomRightX": 0,
//       "BottomRightY": 130,
//       "Alignment": "TopLeft",
//       "Spacing": 1,
//       "ImageIndex": 11,
//       "ImagesCount": 10
//     }
//   }
// },
// "Date": {
//   "MonthAndDay": {
//     "Separate": {
//       "Month": {
//         "TopLeftX": 0,
//         "TopLeftY": 140,
//         "BottomRightX": 0,
//         "BottomRightY": 150,
//         "Alignment": "TopCenter",
//         "Spacing": 1,
//         "ImageIndex": 21,
//         "ImagesCount": 10
//       },
//       "Day": {
//         "TopLeftX": 0,
//         "TopLeftY": 160,
//         "BottomRightX": 9,
//         "BottomRightY": 170,
//         "Alignment": "TopCenter",
//         "Spacing": 1,
//         "ImageIndex": 21,
//         "ImagesCount": 10
//       }
//     },
//     "TwoDigitsMonth": false,
//     "TwoDigitsDay": false
//   },
//   "WeekDay": {
//     "X": 40,
//     "Y": 0,
//     "ImageIndex": 31,
//     "ImagesCount": 7
//   }
// },
// "StepsProgress": {
//   "Linear": {
//     "StartImageIndex": 38,
//     "Segments": [
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       },
//       {
//         "X": 5,
//         "Y": 46
//       }
//     ]
//   }
// },
// "Status": {
//   "Bluetooth": {
//     "Coordinates": {
//       "X": 56,
//       "Y": 125
//     },
//     "ImageIndexOff": 48
//   },
//   "Lock": {
//     "Coordinates": {
//       "X": 46,
//       "Y": 125
//     },
//     "ImageIndexOff": 49
//   },
//   "DoNotDisturb": {
//     "Coordinates": {
//       "X": 66,
//       "Y": 125
//     },
//     "ImageIndexOn": 50
//   }
// },
// "Battery": {
//   "Text": {
//     "Number": {
//       "TopLeftX": 12,
//       "TopLeftY": 140,
//       "BottomRightX": 55,
//       "BottomRightY": 11,
//       "Alignment": "TopLeft",
//       "Spacing": 2,
//       "ImageIndex": 11,
//       "ImagesCount": 10
//     }
//   },
//   "Icon": {
//     "X": 4,
//     "Y": 140,
//     "ImageIndex": 51,
//     "ImagesCount": 5
//   }
// }
// }
