const css = `
.cls-1 {
    fill: #00bbf9;
  }
`;

const Circle1 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 546 546"
      style={{ height: 100, width: 100 }}
    >
      <defs>
        <style>{css}</style>
      </defs>
      <g id="Layer_1" data-name="Layer 1" />
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <circle class="cls-1" cx="273" cy="273" r="273" />
        </g>
      </g>
    </svg>
  );
};

export default Circle1;
