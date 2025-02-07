'use strict';

(() => {
  const noop = (value) => value;


  const createCanvas = (container, {width, height}) => {
    const canvasEl = document.createElement(`canvas`);
    canvasEl.classList.add(`video`);
    canvasEl.setAttribute(`width`, width);
    canvasEl.setAttribute(`height`, height);
    return canvasEl;
  };


  const decorateContainer = (container, options) => {
    container.style.maxWidth = `${options.width}px`;
    container.insertAdjacentElement(`afterbegin`, createCanvas(container, options));
    container.insertAdjacentHTML(`afterbegin`, `<div class="video-controls">
      <div class="video-controls__separator"></div>
    </div>`);
    return container;
  };


  const updateSeparatorPosition = (element, position) => {
    element.style.left = `${position}%`;
  };


  const clamp = (val, min, max) => Math.max(Math.min(max, val), min);


  const compose = (...fns) => fns.reduce((prevFn, nextFn) =>
    (value) => nextFn(prevFn(value)),
  noop);


  const BehaviourID = {
    MOUSE: 1,
    TOUCH: 2
  };


  const BehaviourIDToEventType = {
    [BehaviourID.MOUSE]: {
      START: `mouseenter`,
      PROCESS: `mousemove`,
      STOP: `mouseleave`
    },

    [BehaviourID.TOUCH]: {
      START: `touchstart`,
      PROCESS: `touchmove`,
      STOP: `touchend`
    }
  };


  const BehaviourToGetCoordinateFn = {
    [BehaviourID.MOUSE]: (evt) => evt.clientX,
    [BehaviourID.TOUCH]: (evt) => evt.targetTouches[0].clientX
  };


  const initDND = (element, container, updateFn, behaviour = BehaviourID.MOUSE) => {
    const containerOffset = container.offsetLeft;
    const containerWidth = container.offsetWidth;

    const eventType = BehaviourIDToEventType[behaviour];
    const getCoordinate = BehaviourToGetCoordinateFn[behaviour];

    const onProcess = (evt) => {
      updateFn(clamp((getCoordinate(evt) - containerOffset) / containerWidth, 0, 1));
    };

    const onStop = () => {
      document.body.removeEventListener(eventType.PROCESS, onProcess);
      document.body.removeEventListener(eventType.STOP, onStop);
    };

    const onStart = () => {
      document.body.addEventListener(eventType.PROCESS, onProcess);
      document.body.addEventListener(eventType.STOP, onStop);
    };

    element.addEventListener(eventType.START, onStart);

    return () => element.removeEventListener(eventType.START, onStart);
  };


  const createVideoElement = (src, autoplay = true) => {
    const videoElement = document.createElement(`video`);

    videoElement.loop = true;
    videoElement.muted = true;
    videoElement.src = src;

    if (autoplay) {
      videoElement.play();
    }

    return videoElement;
  };


  const getAnimationStepFn = (ctx, videoLeft, videoRight, options) => {
    return () => {
      ctx.clearRect(0, 0, options.width * options.seprator, options.height);

      ctx.fillStyle = `#fff`;
      ctx.fillRect(0, 0, options.width, options.height);

      ctx.drawImage(videoLeft,
          0, 0, options.width * options.separator, options.height,
          0, 0, options.width * options.separator, options.height);

      ctx.drawImage(videoRight,
          options.width * options.separator, 0, options.width * 1 - options.separator, options.height,
          options.width * options.separator, 0, options.width * 1 - options.separator, options.height);
    };
  };


  const initAnimationLoop = (ctx, animationFrame) => {
    let frameID;

    const loop = (fn) => {
      frameID = requestAnimationFrame(fn);
    };

    const frameFn = () => {
      animationFrame();
      loop(frameFn);
    };

    frameFn();

    return () => window.cancelAnimationFrame(frameID);
  };


  const getUpdateStateFn = (pin, ctx, videoLeft, videoRight) => {
    let stopLoopFn;

    return (options) => {
      if (typeof stopLoopFn === `function`) {
        stopLoopFn();
      }

      updateSeparatorPosition(pin, options.separator.toFixed(4) * 100);
      stopLoopFn = initAnimationLoop(ctx, getAnimationStepFn(ctx, videoLeft, videoRight, options));
    };
  };


  const init = (container, videoLeftSrc, videoRightSrc, options) => {
    if (typeof options.separator === `undefined`) {
      options = Object.assign({}, options, {
        separator: 0.5
      });
    }

    const decoratedContainer = decorateContainer(container, options);
    const pin = decoratedContainer.querySelector(`.video-controls__separator`);

    const videoLeft = createVideoElement(videoLeftSrc, true);
    const videoRight = createVideoElement(videoRightSrc, true);

    const updateStateFn = getUpdateStateFn(
        pin,
        decoratedContainer.querySelector(`canvas`).getContext(`2d`),
        videoLeft, videoRight, options);

    const DNDStepFn = (pos) => updateStateFn(Object.assign({}, options, {
      separator: pos
    }));

    let resizeFn;

    const setupDNDForSize = () => compose(
        initDND(container, container, DNDStepFn, BehaviourID.MOUSE),
        initDND(pin, container, DNDStepFn, BehaviourID.TOUCH));

    window.onresize = () => {
      resizeFn();
      resizeFn = setupDNDForSize();
    };

    resizeFn = setupDNDForSize();
    updateStateFn(options);
  };


  init(
      document.querySelector(`.layout`),
      `./video-1.mp4`,
      `./video-2.mp4`,
      {
        height: 320,
        separator: 0.62,
        width: 640
      });
})();
