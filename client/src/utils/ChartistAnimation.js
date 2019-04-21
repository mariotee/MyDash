const delay = 25;
const duration = 500;

const animation = {
  draw: function(data) {
    if (data.type === 'line' || data.type === 'area') {
      data.element.animate({
        opacity: {
          begin: delay * 10,
          dur: duration,
          from: 0,
          to: 1,
        },
        d: {
          begin: delay * 10,
          dur: duration,
          from: data.path
            .clone()
            .scale(1, 0)
            .translate(0, data.chartRect.height())
            .stringify(),
          to: data.path.clone().stringify(),
        },
      });
    } else if (data.type === 'bar') {
      data.element.animate({
        opacity: {
          begin: 0,
          dur: duration,
          from: 0,
          to: 1,
        },
      });
    } else if (data.type === 'point') {
      data.element.animate({
        opacity: {
          begin: 0,
          dur: duration,
          from: 0,
          to: 1,
        },
      });
    }
  },
};

export default animation;
