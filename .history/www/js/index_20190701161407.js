const MI4BoxElement = document.querySelector('.mi4-preview');
const XElement = document.querySelector('.elementX');
const YElement = document.querySelector('.elementY');
const MI4Config = {};

MI4Config.width = MI4BoxElement.offsetWidth;
MI4Config.height = MI4BoxElement.offsetHeight;
MI4Config.curElement = null;
MI4Config.isKeyDown = false;

// 初始化
function onDragElement(element, config = {}) {
  const elementEvent = { target: element, x: 0, y: 0, w: 0, h: 0, selected: false, isDown: false };
  const mouseEvent = { elementX: 0, elementY: 0, x: 0, y: 0 };

  // 初始化 element
  elementEvent.x = config.x || 0;
  elementEvent.y = config.y || 0;
  elementEvent.w = element.offsetWidth;
  elementEvent.h = element.offsetHeight;

  element.elementEvent = elementEvent;

  // 鼠标按下事件
  element.addEventListener('mousedown', (event) => {
    mouseEvent.elementX = event.offsetX;
    mouseEvent.elementY = event.offsetY;
    mouseEvent.x = event.screenX;
    mouseEvent.y = event.screenY;
    elementEvent.isDown = true;
    elementEvent.selected = true;
    if (MI4Config.curElement) {
      const { curElement } = MI4Config;
      curElement.elementEvent.selected = false;
      curElement.classList.remove('selected');
    }

    MI4Config.curElement = element;
    element.classList.add('selected');
    console.log(element, elementEvent);
    reposition(element, elementEvent);
  });

  //鼠标抬起事件
  document.body.addEventListener('mouseup', () => {
    elementEvent.isDown = false;
    reposition(element, elementEvent);
  });

  // 鼠标移动事件
  window.addEventListener('mousemove', (event) => {
    if (elementEvent.isDown) {
      elementEventX = elementEvent.x + (event.screenX - mouseEvent.x);
      elementEventY = elementEvent.y + (event.screenY - mouseEvent.y);
      mouseEvent.x = event.screenX;
      mouseEvent.y = event.screenY;

      elementEventX = elementEventX <= 0 ? 0 : elementEventX;
      elementEventY = elementEventY <= 0 ? 0 : elementEventY;
      elementEventX = elementEventX >= MI4Config.width - elementEvent.w ? MI4Config.width - elementEvent.w : elementEventX;
      elementEventY = elementEventY >= MI4Config.height - elementEvent.h ? MI4Config.height - elementEvent.h : elementEventY;

      elementEvent.x = elementEventX;
      elementEvent.y = elementEventY;

      reposition(element, elementEvent);
    }
  })
}

document.body.addEventListener('mousedown', (event) => {
  const findIndex = event.path.findIndex((element) => {
    return element === MI4BoxElement;
  });

  if (findIndex === -1) {
    if (MI4Config.curElement) {
      const { curElement } = MI4Config;
      curElement.elementEvent.selected = false;
      curElement.classList.remove('selected');
      MI4Config.curElement = null;
    }
  }
});

function reposition(element, elementEvent) {
  element.style.left = elementEvent.x + 'px';
  element.style.top = elementEvent.y + 'px';
  XElement.value = elementEvent.x;
  YElement.value = elementEvent.y;
}

// 键盘修改
window.addEventListener('keydown', (event) => {
  moveElement(event);
  setTimeout(() => {
    if (MI4Config.isKeyDown) {
      const timer = setInterval(() => {
        MI4Config.isKeyDown ? moveElement(event) : clearInterval(timer);
      }, 100);
    }
  }, 800);
});

window.addEventListener('keyup', () => {
  MI4Config.isKeyDown = false;
});

// 移动
function moveElement(event) {
  if (!MI4Config.curElement) return;
  const elementEvent = MI4Config.curElement.elementEvent;
  let elementEventY, elementEventX;
  switch(event.keyCode) {
    case 38: // 左
      elementEventY = elementEvent.y - 1;
      elementEvent.y = elementEventY <= 0 ? 0 : elementEventY;
      reposition(elementEvent.target, elementEvent);
      break;

    case 37: // 上
      elementEventX = elementEvent.x - 1;
      elementEvent.x = elementEventX <= 0 ? 0 : elementEventX;
      reposition(elementEvent.target, elementEvent);
      break;

    case 40: // 右
      elementEventY = elementEvent.y + 1;
      elementEvent.y = elementEventY >= MI4Config.height - elementEvent.h ? MI4Config.height - elementEvent.h : elementEventY;
      reposition(elementEvent.target, elementEvent);
      break;

    case 39: // 下
      elementEventX = elementEvent.x + 1;
      elementEvent.x = elementEventX >= MI4Config.width - elementEvent.w ? MI4Config.width - elementEvent.w : elementEventX;
      reposition(elementEvent.target, elementEvent);
      break;

    default:
      break;

  }
}

for (const key in MI4ParseJSONMapElements) {
  onDragElement(MI4ParseJSONMapElements[key].element);
}

function updateExpJSON() {

}
