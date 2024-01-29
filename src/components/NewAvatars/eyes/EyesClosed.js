const css = `
.cls-1 {
    stroke: #000;
    stroke-miterlimit: 10;
    stroke-width: 1.5px;
  }`;

const EyesClosed = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.29 12.53">
      <defs>
        <style>{css}</style>
      </defs>
      <g id="Layer_1" data-name="Layer 1" />
      <g id="Layer_2" data-name="Layer 2">
        <g id="Eyes">
          <g>
            <path
              class="cls-1"
              d="M.75,1.28c-.18,.31,10.22,11.45,24,10.43,12.03-.89,20.08-10.57,19.83-10.96-.25-.38-8.63,8.54-20.97,9.03C10.49,10.32,.93,.99,.75,1.28Z"
            />
            <path
              class="cls-1"
              d="M136.71,1.28c-.18,.31,10.22,11.45,24,10.43,12.03-.89,20.08-10.57,19.83-10.96-.25-.38-8.63,8.54-20.97,9.03-13.12,.53-22.68-8.8-22.86-8.51Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default EyesClosed;
