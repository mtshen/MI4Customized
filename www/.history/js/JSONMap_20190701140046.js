// 轮询类型的图片type为0, 相应的有一个images列表
// 静态类型的图片type为1, 相应的有一个image
// let Mi4Config;
// $.ajax({
//   url: './../resources/vcasio_clasic_packed-2831-26605766b3.json',
//   type: 'get',
//   async: false,
//   success: (data) => {
//     debugger;
//   }
// });
const MI4BoxElement = document.querySelector('.mi4-preview');

const MI4ParseJSONMapElements = {
  'Background.Image': { type: 1, image: '000' },
  'Time.Hours.Tens': { type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'] },
  'Time.Hours.Ones': { type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'] },
  'Time.Minutes.Tens': { type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'] },
  'Time.Minutes.Ones': { type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'] },
}

for (const key in MI4ParseJSONMapElements) {
  const elementInfo = MI4ParseJSONMapElements[key];
  const element = document.createElement('div');
  element.classList.add('MI4Modular');
  element.classList.add(key);
  elementInfo.element = element;

  // background
  switch(type) {
    case 1:
      element.style.backgroundImage = `url(${elementInfo.image})`;
      break;
    case 0:
      setElementBackgroundType1(element, elementInfo);
      break;
    default:
      break;
  }

  // 设置位置

  MI4BoxElement.appendChild(element);
}

function setElementBackgroundType1(element, elementInfo) {
  const { images } = elementInfo;
  let index = 0;
  element.style.backgroundImage = `url(${images[index]})`;
  setInterval(() => {
    index ++;
    images.length === index && (index = 0);
    element.style.backgroundImage = `url(${images[index]})`;
  }, 1000);
}
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
