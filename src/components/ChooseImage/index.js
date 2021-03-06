import React, { useEffect, useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setColorInfo } from '../../store/imgData/action';

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const SX = 0;
const SY = 0;

const ChooseImage = (props) => {
  const canvasRef = React.createRef();
  const [ctx, setCtx] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const initCanvas = () => {
    const cas = canvasRef.current;
    cas.width = CANVAS_WIDTH;
    cas.height = CANVAS_HEIGHT;
    setCanvas(cas);
    if (cas.getContext) {
      const context = cas.getContext('2d');
      setCtx(context);
    }
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const handleChange = (e) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function l() {
      const { naturalWidth, naturalHeight } = img;
      let dx;
      let dy;
      let dWidth;
      let dHeight;
      if (naturalWidth > naturalHeight) {
        dWidth = CANVAS_WIDTH;
        dHeight = (naturalHeight * CANVAS_WIDTH) / naturalWidth;
        dy = (CANVAS_HEIGHT - dHeight) / 2;
        dx = 0;
      } else {
        dWidth = (naturalWidth * CANVAS_HEIGHT) / naturalHeight;
        dHeight = CANVAS_HEIGHT;
        dy = 0;
        dx = (CANVAS_WIDTH - dWidth) / 2;
      }
      ctx.drawImage(img, SX, SY, naturalWidth, naturalHeight, dx, dy, dWidth, dHeight);
    };
  };

  const handlePix = (evt) => {
    const { setColor, location } = props;
    let x = evt.clientX;
    let y = evt.clientY;
    const rect = canvas.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    const colorData = ctx.getImageData(x, y, 1, 1);
    switch (location.pathname) {
      case '/colorpix':
        setColor(colorData.data.join(','));
        break;
      default:
    }
  };

  return (
    <div className="choose-wrapper">
      <input
        type="file"
        onChange={handleChange}
        accept="image/png,image/jpg,image/gif,image/jpeg"
      />
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          ref={canvasRef}
          style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
          onClick={handlePix}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setColor: (payload) => dispatch(setColorInfo(payload))
});

export default connect(null, mapDispatchToProps)(withRouter(ChooseImage));
