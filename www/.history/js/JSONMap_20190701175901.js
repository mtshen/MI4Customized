// 轮询类型的图片type为0, 相应的有一个images列表
// 静态类型的图片type为1, 相应的有一个image
// 其他类型type为2, 有一个images列表, 并且有一个 repeat 重复数量
const MI4ParseJSONMapElements = {
  'Background.Image': {
    type: 1, image: '000', title: '背景',
  },
  'Time.Hours.Tens': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'], title: '时间 - 时 - 十位数',
  },
  'Time.Hours.Ones': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'], title: '时间 - 时 - 个位数',
  },
  'Time.Minutes.Tens': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'], title: '时间 - 分 - 十位数',
  },
  'Time.Minutes.Ones': {
    type: 0, images: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'], title: '时间 - 分 - 个位数',
  },
  'Activity.Steps.Number': {
    type: 2, images: ['011', '012', '013', '014', '015', '016', '017', '018', '019', '020'], title: '步数', repeat: 4,
  },
  'Activity.Calories.Number': {
    type: 2, images: ['011', '012', '013', '014', '015', '016', '017', '018', '019', '020'], title: '卡路里数', repeat: 3,
  },
  'Activity.Pulse.Number': {
    type: 2, images: ['011', '012', '013', '014', '015', '016', '017', '018', '019', '020'], title: '心跳', repeat: 2,
  },
  'Date.WeekDay': {
    type: 0, images: ['031', '032', '033', '034', '035', '036', '037'], title: '周数',
  },
  'Status.Bluetooth.Coordinates': {
    type: 1, image: '048', title: '蓝牙图标',
  },
  'Status.Lock.Coordinates': {
    type: 1, image: '049', title: '锁屏图标',
  },
  'Status.DoNotDisturb.Coordinates': {
    type: 1, image: '050', title: '请勿打扰图标',
  },
  'Battery.Icon': {
    type: 0, images: ['051', '052', '053', '054', '055'], title: '电池图标',
  },
};

$.ajax({
  url: 'resources/vcasio_clasic_packed-2831-26605766b3.json',
  type: 'get',
  async: false,
  success: (json) => {
    const VCASIO_CLASIC_PACKED = JSON.parse(json);
    window.VCASIO_CLASIC_PACKED = VCASIO_CLASIC_PACKED;
    const MI4BoxElement = document.querySelector('.mi4-preview');
    for (const key in MI4ParseJSONMapElements) {
      const elementInfo = MI4ParseJSONMapElements[key];
      const element = document.createElement('div');
      element.classList.add(key);
      element.classList.add('MI4Modular');
      element.setAttribute('data-type', key);
      const image = new Image();
      image.onload =function(){
        elementInfo.height = image.height;
          element.style.height = image.height + 'px';
        if (elementInfo.type === 2) {
          elementInfo.width = image.width * elementInfo.repeat;
          element.style.width = (image.width * elementInfo.repeat) + 'px';
        } else {
          elementInfo.width = image.width;
          element.style.width = elementInfo.width + 'px';
        }
      }

      // background
      switch(elementInfo.type) {
        case 1:
          element.style.backgroundImage = `url(resources/${elementInfo.image}.png)`;
          image.src = `resources/${elementInfo.image}.png`;
          // 解析x,y
          parseXY(VCASIO_CLASIC_PACKED, key, elementInfo);
          break;
        case 0:
          setElementBackgroundType1(element, elementInfo);
          image.src = `resources/${elementInfo.images[0]}.png`;
          // 解析x,y
          parseXY(VCASIO_CLASIC_PACKED, key, elementInfo);
          break;
        case 2:
          setElementBackgroundType1(element, elementInfo);
          image.src = `resources/${elementInfo.images[0]}.png`;
          // 解析x,y
          parseXY2(VCASIO_CLASIC_PACKED, key, elementInfo);
        default:
          break;
      }

      element.style.left = elementInfo.x + 'px';
      element.style.top = elementInfo.y + 'px';
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
  },
});

function parseXY(VCASIO_CLASIC_PACKED, key, elementInfo) {
  let VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED;
  const keyList = key.split('.');
  keyList.forEach((keyItem) => {
    VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED_TARGET[keyItem];
  });
  elementInfo.x = VCASIO_CLASIC_PACKED_TARGET.X;
  elementInfo.y = VCASIO_CLASIC_PACKED_TARGET.Y;
}

function parseXY2(VCASIO_CLASIC_PACKED, key, elementInfo) {
  let VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED;
  const keyList = key.split('.');
  keyList.forEach((keyItem) => {
    VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED_TARGET[keyItem];
  });
  elementInfo.x = VCASIO_CLASIC_PACKED_TARGET.TopLeftX;
  elementInfo.y = VCASIO_CLASIC_PACKED_TARGET.TopLeftY;
}

function setParseXY(VCASIO_CLASIC_PACKED, key, elementInfo) {
  let VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED;
  const keyList = key.split('.');
  keyList.forEach((keyItem) => {
    VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED_TARGET[keyItem];
  });
  VCASIO_CLASIC_PACKED_TARGET.X = elementInfo.x;
  VCASIO_CLASIC_PACKED_TARGET.Y = elementInfo.y;
}

function setParseXY2(VCASIO_CLASIC_PACKED, key, elementInfo) {
  let VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED;
  const keyList = key.split('.');
  keyList.forEach((keyItem) => {
    VCASIO_CLASIC_PACKED_TARGET = VCASIO_CLASIC_PACKED_TARGET[keyItem];
  });
  VCASIO_CLASIC_PACKED_TARGET.TopLeftX = elementInfo.x;
  VCASIO_CLASIC_PACKED_TARGET.TopLeftY = elementInfo.y;
}

// "Date": { 日期
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
// },
// "StepsProgress": {  // 这个不知道是啥...
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
// "Battery": {  // 电池
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
